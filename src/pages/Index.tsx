import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingEnvelope from "@/components/WeddingEnvelope";
import CeremonySection from "@/components/CeremonySection";
import PhotosSection from "@/components/PhotosSection";
import RSVPSection from "@/components/RSVPSection";
import AdminDashboard from "@/components/AdminDashboard";
import GuestRegistrationForm from "@/components/GuestRegistrationForm";
import { motion, AnimatePresence } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";

type AdminUser = Tables<"admin_users">;

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkIfAdmin(session?.user?.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkIfAdmin(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfAdmin = async (userId: string | undefined) => {
    if (!userId) return;

    const { data } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", userId)
      .single();

    setIsAdmin(!!data);
  };

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-wedding-background flex items-center justify-center">
        <div className="w-full max-w-md">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
          />
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-wedding-background">
        <main className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="font-script text-4xl text-wedding-text text-center mb-8">
            Admin Dashboard
          </h1>
          <div className="space-y-8">
            <GuestRegistrationForm />
            <AdminDashboard />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-background">
      <main className="container max-w-md mx-auto px-4 py-8 pb-24">
        <AnimatePresence mode="wait">
          {activeSection === "home" && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WeddingEnvelope onOpen={handleEnvelopeOpen} />
            </motion.div>
          )}
          {activeSection === "ceremony" && <CeremonySection />}
          {activeSection === "photos" && <PhotosSection />}
          {activeSection === "rsvp" && <RSVPSection />}
        </AnimatePresence>
      </main>
      <WeddingNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default Index;
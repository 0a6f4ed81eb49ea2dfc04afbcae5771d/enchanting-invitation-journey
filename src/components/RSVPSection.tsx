import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import RSVPForm from "./RSVPForm";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attendance: "yes" | "no";
  guests: string;
  dietary: string;
}

const RSVPSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for guest_id in URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("guest_id");
    if (id) {
      setGuestId(id);
      updateFirstAccess(id);
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateFirstAccess = async (id: string) => {
    const now = new Date().toISOString();
    await supabase
      .from("guests")
      .update({ first_access_at: now })
      .eq("id", id);
  };

  const onSubmit = async (data: RSVPFormData) => {
    if (!guestId) {
      toast({
        title: "Error",
        description: "Invalid guest access",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert RSVPFormData to Json type
      const responseData: Json = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        attendance: data.attendance,
        guests: data.guests,
        dietary: data.dietary
      };

      const { error } = await supabase
        .from("guests")
        .update({
          has_responded: true,
          response_data: responseData,
        })
        .eq("id", guestId);

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your response has been recorded.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-wedding-primary/20 px-4 py-2 z-50">
        <div className="flex justify-end items-center max-w-4xl mx-auto">
          {session ? (
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-wedding-text"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleLogin}
              className="text-wedding-text"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-6 mt-16" // Added margin top to account for header
      >
        <div className="text-center mb-8">
          <h2 className="font-script text-3xl text-wedding-text mb-2">
            Confirmação de Presença
          </h2>
          <p className="font-serif text-wedding-text/80 italic">
            Por favor, confirme sua presença até 09/07/2024
          </p>
        </div>

        <RSVPForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
};

export default RSVPSection;
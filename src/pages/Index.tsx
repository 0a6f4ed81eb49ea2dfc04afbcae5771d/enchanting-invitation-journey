import { useState } from "react";
import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingEnvelope from "@/components/WeddingEnvelope";
import CeremonySection from "@/components/CeremonySection";
import PhotosSection from "@/components/PhotosSection";
import RSVPSection from "@/components/RSVPSection";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

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
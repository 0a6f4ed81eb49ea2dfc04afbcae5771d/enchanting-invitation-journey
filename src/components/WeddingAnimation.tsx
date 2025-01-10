import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import WaxSeal from "./WaxSeal";
import EventDateBanner from "./EventDateBanner";
import CoupleNames from "./CoupleNames";

const WeddingAnimation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    const timings = [3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000];
    
    timings.forEach((timing, index) => {
      setTimeout(() => {
        setCurrentStep(index + 2);
      }, timing);
    });
  }, []);

  return (
    <div className="min-h-screen bg-wedding-background relative overflow-hidden">
      {/* Step 1: Initial Layout */}
      <AnimatePresence>
        <motion.div
          className="fixed top-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Logo />
        </motion.div>

        {currentStep === 1 && (
          <>
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <WaxSeal />
            </motion.div>

            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <EventDateBanner />
            </motion.div>
          </>
        )}

        {/* Step 2: Opening Animation */}
        {currentStep === 2 && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <CoupleNames />
            <motion.p
              className="mt-4 text-wedding-text font-serif italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Com gratidão e amor, convidamos você para celebrar conosco
            </motion.p>
          </motion.div>
        )}

        {/* Step 3: Photo Reveal */}
        {currentStep === 3 && (
          <motion.div
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg')" }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Step 4: Fade Out */}
        {currentStep === 4 && (
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Step 5: Message Animation */}
        {currentStep === 5 && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              className="text-wedding-text font-script text-3xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Pela vontade de Deus e o amor que nos une, nos tornaremos um só e
              gostaríamos de compartilhar esse momento especial com você. Nossa
              união será abençoada em uma cerimônia que nos abençoará
            </motion.p>
          </motion.div>
        )}

        {/* Steps 6-9: Additional Animations */}
        {currentStep >= 6 && currentStep <= 9 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {currentStep === 9 && (
                <motion.div
                  className="relative"
                  animate={{
                    rotateX: isEnvelopeOpen ? 180 : 0,
                  }}
                  transition={{ duration: 1 }}
                >
                  <WaxSeal />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingAnimation;
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

  const renderPhoto = (url: string, className: string = "") => (
    <motion.div
      className={`absolute inset-0 bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${url})` }}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
    />
  );

  return (
    <div className="min-h-screen bg-wedding-background relative overflow-hidden">
      {/* Logo - Always visible */}
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Logo />
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Step 1: Initial Layout */}
        {currentStep === 1 && (
          <>
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <WaxSeal onClick={() => setIsEnvelopeOpen(true)} />
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

        {/* Step 2: Envelope Opening Animation */}
        {currentStep === 2 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-wedding-background p-8 rounded-lg shadow-xl max-w-2xl w-full text-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <CoupleNames />
              <motion.p
                className="mt-6 text-wedding-text font-serif italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Com gratidão e amor, convidamos você para celebrar conosco
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: First Photo Reveal */}
        {currentStep === 3 && (
          <div className="fixed inset-0">
            {renderPhoto("/placeholder.svg")}
          </div>
        )}

        {/* Step 4: Elements Fade Out */}
        {currentStep === 4 && (
          <motion.div
            className="fixed inset-0 bg-wedding-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}

        {/* Step 5: Message Animation */}
        {currentStep === 5 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              className="text-wedding-text font-script text-3xl text-center max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Pela vontade de Deus e o amor que nos une, nos tornaremos um só e
              gostaríamos de compartilhar esse momento especial com você. Nossa
              união será abençoada em uma cerimônia que nos abençoará
            </motion.p>
          </motion.div>
        )}

        {/* Step 6: Second Photo */}
        {currentStep === 6 && (
          <div className="fixed inset-0">
            {renderPhoto("/placeholder.svg")}
          </div>
        )}

        {/* Step 7: Third Photo with Message and Banner */}
        {currentStep === 7 && (
          <div className="fixed inset-0">
            {renderPhoto("/placeholder.svg")}
            <motion.div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-white text-2xl font-script mb-8 shadow-text">
                Junte-se a nós neste momento especial
              </p>
              <EventDateBanner />
            </motion.div>
          </div>
        )}

        {/* Step 8: Vortex Animation */}
        {currentStep === 8 && (
          <motion.div
            className="fixed inset-0"
            animate={{
              rotate: 360,
              scale: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            {renderPhoto("/placeholder.svg")}
            <motion.p
              className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white text-2xl font-script shadow-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Celebre conosco este momento único
            </motion.p>
          </motion.div>
        )}

        {/* Step 9: Final Animation */}
        {currentStep === 9 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <motion.div
              className="relative"
              animate={{
                rotateX: isEnvelopeOpen ? 0 : 180,
              }}
              transition={{ duration: 1 }}
            >
              <WaxSeal />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingAnimation;
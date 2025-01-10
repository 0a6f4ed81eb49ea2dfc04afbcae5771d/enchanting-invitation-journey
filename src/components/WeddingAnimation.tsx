import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Logo from "./Logo";
import WaxSeal from "./WaxSeal";
import EventDateBanner from "./EventDateBanner";
import CoupleNames from "./CoupleNames";
import { useToast } from "@/components/ui/use-toast";

const WeddingAnimation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [images, setImages] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    generateImages();
  }, []);

  const generateImages = async () => {
    try {
      const imageTypes = ['couple1', 'couple2', 'couple3', 'envelope', 'invitation', 'pattern'];
      const generatedImages: Record<string, string> = {};

      for (const type of imageTypes) {
        const { data, error } = await supabase.functions.invoke('generate-wedding-images', {
          body: { type }
        });

        if (error) throw error;
        generatedImages[type] = data.image;
      }

      setImages(generatedImages);
      document.body.style.backgroundImage = `url(${generatedImages.pattern})`;
    } catch (error) {
      console.error('Error generating images:', error);
      toast({
        title: "Error",
        description: "Failed to load images. Please refresh the page.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (!isEnvelopeOpen) return;
    
    const timings = [3000, 6000, 9000, 12000, 15000, 18000, 21000];
    timings.forEach((timing, index) => {
      setTimeout(() => {
        setCurrentStep(index + 2);
      }, timing);
    });
  }, [isEnvelopeOpen]);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
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
          <motion.div className="fixed inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {images.envelope && (
                <div 
                  className="relative w-64 h-64 cursor-pointer"
                  onClick={handleEnvelopeClick}
                >
                  <img 
                    src={images.envelope} 
                    alt="Wedding Invitation Envelope"
                    className="w-full h-full object-cover rounded-lg shadow-xl"
                  />
                  <WaxSeal onClick={handleEnvelopeClick} />
                </div>
              )}
            </motion.div>

            <motion.div
              className="absolute bottom-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <EventDateBanner />
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Envelope Opening Animation */}
        {currentStep === 2 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {images.invitation && (
              <motion.div
                className="max-w-2xl w-full p-8 rounded-lg shadow-xl bg-white/90"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <CoupleNames />
                <motion.img
                  src={images.invitation}
                  alt="Wedding Invitation"
                  className="w-full h-auto mt-8 rounded-lg shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 3-8: Photo Sequence with Messages */}
        {currentStep >= 3 && currentStep <= 8 && (
          <motion.div className="fixed inset-0">
            {images[`couple${((currentStep - 3) % 3) + 1}`] && (
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img
                  src={images[`couple${((currentStep - 3) % 3) + 1}`]}
                  alt={`Couple Photo ${((currentStep - 3) % 3) + 1}`}
                  className="w-full h-full object-cover"
                />
                
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {currentStep === 5 && (
                    <p className="text-3xl font-script shadow-text max-w-3xl">
                      Pela vontade de Deus e o amor que nos une, nos tornaremos um só e
                      gostaríamos de compartilhar esse momento especial com você. Nossa
                      união será abençoada em uma cerimônia que nos abençoará
                    </p>
                  )}
                  
                  {currentStep === 7 && (
                    <>
                      <p className="text-3xl font-script shadow-text mb-8">
                        Junte-se a nós neste momento especial
                      </p>
                      <EventDateBanner />
                    </>
                  )}
                  
                  {currentStep === 8 && (
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      <p className="text-3xl font-script shadow-text">
                        Celebre conosco este momento único
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
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
                rotateX: [180, 0],
                scale: [1, 0.8],
              }}
              transition={{ duration: 1 }}
            >
              {images.envelope && (
                <img 
                  src={images.envelope} 
                  alt="Closing Envelope"
                  className="w-64 h-64 object-cover rounded-lg shadow-xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingAnimation;
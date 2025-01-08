import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WeddingEnvelopeProps {
  onOpen: () => void;
}

const WeddingEnvelope = ({ onOpen }: WeddingEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  const handleEnvelopeClick = () => {
    if (!sealBroken) {
      setSealBroken(true);
      setTimeout(() => {
        setIsOpen(true);
        onOpen();
      }, 500);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto min-h-[600px] bg-wedding-background p-6">
      {/* Floral Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* We'll add SVG patterns here later */}
      </div>

      {/* Header Text */}
      <div className="text-center mb-8">
        <h1 className="font-script text-3xl text-wedding-text mb-2">
          Andréa & Fernando
        </h1>
        <p className="font-serif text-wedding-text text-lg italic">
          Contamos com a sua presença
        </p>
        <p className="font-serif text-wedding-text text-sm italic">
          neste momento tão importante em nossa história
        </p>
      </div>

      {/* Envelope */}
      <div 
        className={`relative w-full aspect-[4/3] bg-wedding-primary rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 ${
          !sealBroken && "hover:scale-102"
        }`}
        onClick={handleEnvelopeClick}
      >
        {/* Monogram */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24">
          <div className="w-full h-full rounded-full border-2 border-wedding-gold flex items-center justify-center bg-white">
            <span className="font-script text-3xl text-wedding-gold">AF</span>
          </div>
        </div>

        {/* Wax Seal */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${
            sealBroken ? "animate-seal-break" : ""
          }`}
        >
          <div className="w-full h-full rounded-full bg-wedding-gold flex items-center justify-center">
            <span className="font-script text-2xl text-white">AF</span>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-white rounded-lg"
            >
              <h2 className="font-script text-4xl mb-6 text-wedding-text">
                Save the Date
              </h2>
              <div className="space-y-4 text-center">
                <p className="font-serif text-xl text-wedding-text">
                  9 de Agosto, 2024
                </p>
                <p className="font-serif text-lg text-wedding-text">
                  20:00 horas
                </p>
                <div className="w-16 h-1 bg-wedding-gold mx-auto my-4" />
                <p className="font-serif text-sm text-wedding-text italic">
                  Local e detalhes completos abaixo
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope Flap */}
        <div 
          className={`absolute inset-0 bg-wedding-secondary rounded-t-lg origin-bottom transition-transform duration-1000 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default WeddingEnvelope;
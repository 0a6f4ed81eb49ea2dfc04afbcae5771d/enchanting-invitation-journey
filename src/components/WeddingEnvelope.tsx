import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WeddingEnvelope = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-sm mx-auto min-h-[600px] bg-wedding-background p-6">
      {/* Header Text */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl text-wedding-text italic">
          Contamos com a sua presença
        </h1>
        <p className="text-wedding-text mt-2 italic">
          neste momento tão importante em nossa história
        </p>
      </div>

      {/* Envelope */}
      <div 
        className="relative w-full aspect-[4/3] bg-wedding-primary rounded-lg shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Monogram */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24">
          <div className="w-full h-full rounded-full border-2 border-wedding-accent flex items-center justify-center bg-white">
            <span className="text-2xl font-serif text-wedding-accent">AF</span>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 p-8 flex flex-col items-center justify-center"
            >
              <h2 className="text-3xl font-serif mb-4 text-wedding-text">
                Andréa e Fernando
              </h2>
              <p className="text-lg mb-8 text-wedding-text">
                Vamos nos casar!
              </p>
              <div className="flex items-center gap-4 text-wedding-text">
                <span className="text-xl">Agosto</span>
                <span className="text-4xl font-bold">9</span>
                <span className="text-xl">20 horas</span>
              </div>
              <p className="mt-4 text-wedding-text">2024</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope Flap */}
        <div 
          className={`absolute inset-0 bg-wedding-secondary rounded-t-lg origin-bottom transition-transform duration-1000 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default WeddingEnvelope;
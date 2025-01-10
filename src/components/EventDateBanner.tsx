import React from "react";
import { motion } from "framer-motion";

const EventDateBanner = () => {
  return (
    <motion.div 
      className="relative flex items-center justify-between px-12 py-6 bg-wedding-background/95 rounded-full shadow-lg border border-wedding-gold/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-wedding-text font-script text-3xl">Agosto</div>
      
      <div className="relative mx-8">
        <motion.div 
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-wedding-text/80 text-sm font-serif"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          sexta feira
        </motion.div>
        
        <motion.div 
          className="text-wedding-text font-script text-5xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          9
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-wedding-text/80 text-sm font-serif"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          2025
        </motion.div>
      </div>

      <div className="text-wedding-text font-script text-3xl">20 horas</div>
      
      {/* Invisible circle border */}
      <div className="absolute inset-0 rounded-full border border-wedding-gold/10" />
    </motion.div>
  );
};

export default EventDateBanner;
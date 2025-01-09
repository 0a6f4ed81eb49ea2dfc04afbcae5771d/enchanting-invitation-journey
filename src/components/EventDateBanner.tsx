import React from "react";
import { motion } from "framer-motion";

const EventDateBanner = () => {
  return (
    <motion.div 
      className="flex items-center justify-between px-8 py-4 bg-wedding-background/80 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-wedding-text font-script text-2xl">Agosto</div>
      <div className="relative">
        <div className="text-wedding-text/60 text-sm absolute -top-6 left-1/2 -translate-x-1/2">
          sexta feira
        </div>
        <div className="text-wedding-text font-script text-4xl">9</div>
        <div className="text-wedding-text/60 text-sm absolute -bottom-6 left-1/2 -translate-x-1/2">
          2025
        </div>
      </div>
      <div className="text-wedding-text font-script text-2xl">20 horas</div>
    </motion.div>
  );
};

export default EventDateBanner;
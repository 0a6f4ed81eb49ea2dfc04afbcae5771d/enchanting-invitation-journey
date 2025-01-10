import React from "react";
import { motion } from "framer-motion";

interface WaxSealProps {
  onClick?: () => void;
}

const WaxSeal = ({ onClick }: WaxSealProps) => {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 cursor-pointer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div 
        className="w-full h-full rounded-full bg-wedding-gold flex items-center justify-center shadow-lg border-2 border-wedding-gold/20"
        whileHover={{ boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)" }}
      >
        <span className="font-script text-3xl text-white">AF</span>
      </motion.div>
    </motion.div>
  );
};

export default WaxSeal;
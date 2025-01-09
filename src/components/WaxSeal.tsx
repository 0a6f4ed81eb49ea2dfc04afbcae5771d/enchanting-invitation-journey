import React from "react";
import { motion } from "framer-motion";

const WaxSeal = () => {
  return (
    <motion.div 
      className="w-32 h-32 mx-auto"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="w-full h-full rounded-full bg-wedding-gold flex items-center justify-center shadow-lg">
        <span className="font-script text-4xl text-white">AF</span>
      </div>
    </motion.div>
  );
};

export default WaxSeal;
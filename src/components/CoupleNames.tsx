import React from "react";
import { motion } from "framer-motion";

const CoupleNames = () => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-script text-6xl text-wedding-text mb-4">
        Andréa & Fernando
      </h1>
      <motion.div
        className="w-32 h-0.5 bg-wedding-gold/50 mx-auto"
        initial={{ width: 0 }}
        animate={{ width: 128 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </motion.div>
  );
};

export default CoupleNames;
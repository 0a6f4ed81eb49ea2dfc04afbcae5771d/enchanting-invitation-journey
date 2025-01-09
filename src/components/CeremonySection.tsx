import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";

const CeremonySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 p-6"
    >
      <div className="text-center">
        <h2 className="font-script text-3xl text-wedding-text mb-2">
          Cerimônia & Recepção
        </h2>
        <p className="font-serif text-wedding-text/80 italic">
          Junte-se a nós neste momento especial
        </p>
      </div>

      <div className="space-y-6">
        {/* Ceremony Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-serif text-xl text-wedding-text mb-4">Cerimônia</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-wedding-gold" />
              <span className="text-wedding-text">9 de Agosto, 2024</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-wedding-gold" />
              <span className="text-wedding-text">20:00 horas</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-wedding-gold" />
              <span className="text-wedding-text">
                Igreja Nossa Senhora do Brasil
                <br />
                Praça Nossa Sra. do Brasil, 01
                <br />
                São Paulo - SP
              </span>
            </div>
          </div>
        </div>

        {/* Reception Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-serif text-xl text-wedding-text mb-4">Recepção</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-wedding-gold" />
              <span className="text-wedding-text">21:30 horas</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-wedding-gold" />
              <span className="text-wedding-text">
                Buffet França
                <br />
                Rua França, 538
                <br />
                São Paulo - SP
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CeremonySection;
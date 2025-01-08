import { Home, Star, Camera, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

interface WeddingNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const WeddingNavigation = ({ activeSection, onNavigate }: WeddingNavigationProps) => {
  const navItems = [
    { id: "home", icon: <Home className="w-6 h-6" />, label: "Início" },
    { id: "ceremony", icon: <Star className="w-6 h-6" />, label: "Cerimônia" },
    { id: "photos", icon: <Camera className="w-6 h-6" />, label: "Fotos" },
    { id: "rsvp", icon: <CheckSquare className="w-6 h-6" />, label: "Confirmação" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-wedding-primary/20 px-4 py-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="relative flex flex-col items-center p-2 text-wedding-text hover:text-wedding-accent transition-colors"
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
            {activeSection === item.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute -bottom-2 w-12 h-0.5 bg-wedding-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default WeddingNavigation;
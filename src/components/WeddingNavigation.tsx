import { Home, Star, Camera, CheckSquare } from "lucide-react";

const WeddingNavigation = () => {
  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Início" },
    { icon: <Star className="w-6 h-6" />, label: "Cerimônia" },
    { icon: <Camera className="w-6 h-6" />, label: "Fotos" },
    { icon: <CheckSquare className="w-6 h-6" />, label: "Confirmação" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-2 text-wedding-text hover:text-wedding-accent transition-colors"
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default WeddingNavigation;
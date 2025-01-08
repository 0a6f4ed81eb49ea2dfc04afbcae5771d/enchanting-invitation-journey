import { useState } from "react";

const WeddingEnvelope = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] bg-wedding-envelope rounded-lg shadow-lg">
      <div className="absolute inset-0 p-8">
        <div className="relative h-full">
          {/* Monogram */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24">
            <div className="w-full h-full rounded-full border-2 border-wedding-accent flex items-center justify-center">
              <span className="text-2xl font-serif text-wedding-accent">AF</span>
            </div>
          </div>
          
          {/* Floral Corner */}
          <div className="absolute top-0 right-0">
            <img 
              src="/lovable-uploads/aecf202b-179c-4752-8c64-890ad1ee78e7.png" 
              alt="Floral decoration"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Content */}
          <div className={`mt-32 text-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-3xl font-serif mb-4">Andréa e Fernando</h1>
            <p className="text-lg mb-8">Vamos nos casar!</p>
            <div className="flex justify-center items-center gap-4">
              <span className="text-xl">Agosto</span>
              <span className="text-4xl font-bold">9</span>
              <span className="text-xl">20 horas</span>
            </div>
            <p className="mt-4 text-sm">2024</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute inset-0 w-full h-full cursor-pointer"
        aria-label="Open invitation"
      />
    </div>
  );
};

export default WeddingEnvelope;
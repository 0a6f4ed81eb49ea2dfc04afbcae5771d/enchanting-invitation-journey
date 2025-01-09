import { motion } from "framer-motion";

const PhotosSection = () => {
  const photos = [
    { id: 1, alt: "Foto 1" },
    { id: 2, alt: "Foto 2" },
    { id: 3, alt: "Foto 3" },
    { id: 4, alt: "Foto 4" },
    { id: 5, alt: "Foto 5" },
    { id: 6, alt: "Foto 6" },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <div className="text-center mb-8">
        <h2 className="font-script text-3xl text-wedding-text mb-2">
          Nossa História
        </h2>
        <p className="font-serif text-wedding-text/80 italic">
          Momentos especiais que compartilhamos
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: photo.id * 0.1 }}
            className="aspect-square bg-wedding-primary/20 rounded-lg overflow-hidden"
          >
            <div className="w-full h-full bg-wedding-secondary/20 flex items-center justify-center text-wedding-text/50">
              Foto {photo.id}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PhotosSection;
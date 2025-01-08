import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingEnvelope from "@/components/WeddingEnvelope";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="container max-w-md mx-auto px-4 py-8 pb-24">
        <WeddingEnvelope />
      </main>
      <WeddingNavigation />
    </div>
  );
};

export default Index;
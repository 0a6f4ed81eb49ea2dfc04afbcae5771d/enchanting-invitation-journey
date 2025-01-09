import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import RSVPForm from "./RSVPForm";
import Header from "./Header";

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attendance: "yes" | "no";
  guests: string;
  dietary: string;
}

const RSVPSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for guest_id in URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("guest_id");
    if (id) {
      setGuestId(id);
      updateFirstAccess(id);
    }
  }, []);

  const updateFirstAccess = async (id: string) => {
    const now = new Date().toISOString();
    await supabase
      .from("guests")
      .update({ first_access_at: now })
      .eq("id", id);
  };

  const onSubmit = async (data: RSVPFormData) => {
    if (!guestId) {
      toast({
        title: "Error",
        description: "Invalid guest access",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const responseData: Json = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        attendance: data.attendance,
        guests: data.guests,
        dietary: data.dietary
      };

      const { error } = await supabase
        .from("guests")
        .update({
          has_responded: true,
          response_data: responseData,
        })
        .eq("id", guestId);

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your response has been recorded.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-6 mt-16"
      >
        <div className="text-center mb-8">
          <h2 className="font-script text-3xl text-wedding-text mb-2">
            Confirmação de Presença
          </h2>
          <p className="font-serif text-wedding-text/80 italic">
            Por favor, confirme sua presença até 09/07/2024
          </p>
        </div>

        <RSVPForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
};

export default RSVPSection;
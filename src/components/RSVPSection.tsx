import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const { register, handleSubmit, formState: { errors } } = useForm<RSVPFormData>();

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
      const { error } = await supabase
        .from("guests")
        .update({
          has_responded: true,
          response_data: data,
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

  if (!guestId) {
    return (
      <div className="p-6 text-center">
        <h2 className="font-script text-3xl text-wedding-text mb-4">
          Invalid Access
        </h2>
        <p className="text-wedding-text/80">
          Please use the link provided in your invitation email.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <div className="text-center mb-8">
        <h2 className="font-script text-3xl text-wedding-text mb-2">
          Confirmação de Presença
        </h2>
        <p className="font-serif text-wedding-text/80 italic">
          Por favor, confirme sua presença até 09/07/2024
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className="mt-1"
            />
            {errors.name && (
              <span className="text-sm text-red-500">Campo obrigatório</span>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="mt-1"
            />
            {errors.email && (
              <span className="text-sm text-red-500">Campo obrigatório</span>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              {...register("phone", { required: true })}
              className="mt-1"
            />
            {errors.phone && (
              <span className="text-sm text-red-500">Campo obrigatório</span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Você poderá comparecer?</Label>
            <RadioGroup defaultValue="yes">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Sim, estarei presente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">Infelizmente não poderei comparecer</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="guests">Número de acompanhantes</Label>
            <Input
              id="guests"
              type="number"
              {...register("guests")}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dietary">Restrições alimentares</Label>
            <Input
              id="dietary"
              {...register("dietary")}
              className="mt-1"
              placeholder="Se houver alguma restrição, por favor nos informe"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-wedding-gold hover:bg-wedding-gold/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Confirmar presença"}
        </Button>
      </form>
    </motion.div>
  );
};

export default RSVPSection;
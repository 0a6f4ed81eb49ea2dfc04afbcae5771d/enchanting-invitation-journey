import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import type { Json } from "@/integrations/supabase/types";

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attendance: "yes" | "no";
  guests: string;
  dietary: string;
}

interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => Promise<void>;
  isSubmitting: boolean;
}

const RSVPForm = ({ onSubmit, isSubmitting }: RSVPFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RSVPFormData>();

  return (
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
  );
};

export default RSVPForm;
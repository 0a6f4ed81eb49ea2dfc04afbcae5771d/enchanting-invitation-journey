import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "./ui/use-toast";

interface GuestFormData {
  name: string;
  email: string;
  guest_of: "bride" | "groom";
}

const GuestRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<GuestFormData>();

  const onSubmit = async (data: GuestFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("guests")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Guest registered successfully!",
      });

      reset();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name", { required: true })}
          className="mt-1"
        />
        {errors.name && (
          <span className="text-sm text-red-500">This field is required</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: true })}
          className="mt-1"
        />
        {errors.email && (
          <span className="text-sm text-red-500">This field is required</span>
        )}
      </div>

      <div className="space-y-2">
        <Label>Guest of</Label>
        <RadioGroup defaultValue="bride">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bride" id="bride" {...register("guest_of")} />
            <Label htmlFor="bride">Bride</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="groom" id="groom" {...register("guest_of")} />
            <Label htmlFor="groom">Groom</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register Guest"}
      </Button>
    </form>
  );
};

export default GuestRegistrationForm;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import RSVPForm from "./RSVPForm";
import { Button } from "./ui/button";
import { LogIn, LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

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
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for guest_id in URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("guest_id");
    if (id) {
      setGuestId(id);
      updateFirstAccess(id);
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from("admin_users")
            .select("*")
            .eq("id", session.user.id)
            .single();
          
          if (error && error.code !== "PGRST116") { // Ignore "no rows returned" error
            console.error("Error checking admin status:", error);
            toast({
              title: "Error",
              description: "Failed to check admin status",
              variant: "destructive",
            });
          }
          setIsAdmin(!!data);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

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

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          prompt: 'consent'
        }
      }
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-wedding-primary/20 px-4 py-2 z-50">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {/* Left side - User info */}
          {session && (
            <div className="flex items-center gap-2 text-wedding-text">
              <User className="h-4 w-4" />
              <span className="text-sm">{session.user.email}</span>
            </div>
          )}
          
          {/* Right side - Admin menu or Login/Logout */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/guests">Manage Guests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/reports">Reports</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {session ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-wedding-text"
                size="sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleLogin}
                className="text-wedding-text"
                size="sm"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>

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
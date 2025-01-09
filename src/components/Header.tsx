import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut, User, Settings } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
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
  );
};

export default Header;
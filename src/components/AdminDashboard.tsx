import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useToast } from "./ui/use-toast";

interface Guest {
  id: string;
  name: string;
  email: string;
  guest_of: "bride" | "groom";
  created_at: string;
  first_access_at: string | null;
  invitation_sent_at: string | null;
  has_responded: boolean;
  response_data: any;
}

const AdminDashboard = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGuests(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendInvitation = async (guestId: string) => {
    try {
      const { error } = await supabase.functions.invoke("send-invitation", {
        body: {
          guest_id: guestId,
          app_url: window.location.origin,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Invitation sent successfully!",
      });

      // Refresh guest list
      fetchGuests();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generatePDFReport = async () => {
    // Implementation for PDF generation will go here
    toast({
      title: "Coming soon",
      description: "PDF report generation is coming soon!",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-wedding-text">Guest List</h2>
        <Button onClick={generatePDFReport}>Generate Report</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Guest of</TableHead>
            <TableHead>Invitation Sent</TableHead>
            <TableHead>First Access</TableHead>
            <TableHead>Response</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.email}</TableCell>
              <TableCell className="capitalize">{guest.guest_of}</TableCell>
              <TableCell>
                {guest.invitation_sent_at
                  ? new Date(guest.invitation_sent_at).toLocaleDateString()
                  : "Not sent"}
              </TableCell>
              <TableCell>
                {guest.first_access_at
                  ? new Date(guest.first_access_at).toLocaleDateString()
                  : "Never"}
              </TableCell>
              <TableCell>
                {guest.has_responded ? "Responded" : "Pending"}
              </TableCell>
              <TableCell>
                {!guest.invitation_sent_at && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sendInvitation(guest.id)}
                  >
                    Send Invitation
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
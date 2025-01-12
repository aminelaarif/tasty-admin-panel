import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  name: string;
  phoneNumber: string;
  tableNumber: string;
  date: Date;
}

const dummyReservations: Reservation[] = [
  {
    id: "RES001",
    name: "John Smith",
    phoneNumber: "555-0123",
    tableNumber: "12",
    date: new Date("2024-03-20T19:00:00"),
  },
  {
    id: "RES002",
    name: "Emma Davis",
    phoneNumber: "555-0124",
    tableNumber: "8",
    date: new Date("2024-03-21T18:30:00"),
  },
  {
    id: "RES003",
    name: "Michael Johnson",
    phoneNumber: "555-0125",
    tableNumber: "15",
    date: new Date("2024-03-19T20:00:00"),
  },
];

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>(dummyReservations);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const { toast } = useToast();

  const handleAddReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReservation: Reservation = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      tableNumber: formData.get("tableNumber") as string,
      date: new Date(),
    };

    setReservations((prev) => [...prev, newReservation]);
    toast({
      title: "Success",
      description: "Reservation added successfully",
    });
    (e.target as HTMLFormElement).reset();
  };

  const handleEditReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedReservation) return;

    const formData = new FormData(e.currentTarget);
    const updatedReservation: Reservation = {
      ...selectedReservation,
      name: formData.get("name") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      tableNumber: formData.get("tableNumber") as string,
    };

    setReservations((prev) =>
      prev.map((res) =>
        res.id === selectedReservation.id ? updatedReservation : res
      )
    );

    toast({
      title: "Success",
      description: "Reservation updated successfully",
    });
    setSelectedReservation(null);
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.date.getTime() - a.date.getTime();
    }
    return a.date.getTime() - b.date.getTime();
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif font-bold text-primary">Reservations</h2>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            className="hover:scale-105 transition-transform duration-200"
          >
            Sort by {sortOrder === "newest" ? "Oldest" : "Newest"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">
                <Plus className="mr-2 h-4 w-4" /> Add Reservation
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#fdfcfb] bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">Add New Reservation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddReservation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-serif">Guest Name</Label>
                  <Input id="name" name="name" required className="border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="font-serif">Phone Number</Label>
                  <Input id="phoneNumber" name="phoneNumber" required className="border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tableNumber" className="font-serif">Table Number</Label>
                  <Input id="tableNumber" name="tableNumber" required className="border-primary/20" />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors duration-200">
                  Add Reservation
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-lg border border-primary/20 overflow-hidden transition-all duration-200 hover:shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5">
              <TableHead className="font-serif">Reservation ID</TableHead>
              <TableHead className="font-serif">Guest Name</TableHead>
              <TableHead className="font-serif">Phone Number</TableHead>
              <TableHead className="font-serif">Table Number</TableHead>
              <TableHead className="font-serif">Date</TableHead>
              <TableHead className="font-serif">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReservations.map((reservation) => (
              <TableRow 
                key={reservation.id}
                className="hover:bg-primary/5 transition-colors duration-200"
              >
                <TableCell className="font-mono">{reservation.id}</TableCell>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.phoneNumber}</TableCell>
                <TableCell>{reservation.tableNumber}</TableCell>
                <TableCell>
                  {reservation.date.toLocaleDateString()} {reservation.date.toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedReservation(reservation)}
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#fdfcfb] bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-serif">Edit Reservation</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditReservation} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name" className="font-serif">Guest Name</Label>
                          <Input
                            id="edit-name"
                            name="name"
                            defaultValue={reservation.name}
                            required
                            className="border-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-phoneNumber" className="font-serif">Phone Number</Label>
                          <Input
                            id="edit-phoneNumber"
                            name="phoneNumber"
                            defaultValue={reservation.phoneNumber}
                            required
                            className="border-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-tableNumber" className="font-serif">Table Number</Label>
                          <Input
                            id="edit-tableNumber"
                            name="tableNumber"
                            defaultValue={reservation.tableNumber}
                            required
                            className="border-primary/20"
                          />
                        </div>
                        <Button 
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 transition-colors duration-200"
                        >
                          Update Reservation
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReservationManagement;
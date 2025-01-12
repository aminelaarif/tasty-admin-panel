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

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reservations</h2>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
          >
            Sort by {sortOrder === "newest" ? "Oldest" : "Newest"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Reservation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reservation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddReservation} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" name="phoneNumber" required />
                </div>
                <div>
                  <Label htmlFor="tableNumber">Table Number</Label>
                  <Input id="tableNumber" name="tableNumber" required />
                </div>
                <Button type="submit">Add Reservation</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reservation ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Table Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>{reservation.name}</TableCell>
              <TableCell>{reservation.phoneNumber}</TableCell>
              <TableCell>{reservation.tableNumber}</TableCell>
              <TableCell>
                {reservation.date.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedReservation(reservation)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Reservation</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditReservation} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                          id="edit-name"
                          name="name"
                          defaultValue={reservation.name}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-phoneNumber">Phone Number</Label>
                        <Input
                          id="edit-phoneNumber"
                          name="phoneNumber"
                          defaultValue={reservation.phoneNumber}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-tableNumber">Table Number</Label>
                        <Input
                          id="edit-tableNumber"
                          name="tableNumber"
                          defaultValue={reservation.tableNumber}
                          required
                        />
                      </div>
                      <Button type="submit">Update Reservation</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationManagement;
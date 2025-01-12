import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Menu {
  id: string;
  name: string;
  dishes: Dish[];
}

const initialMenus: Menu[] = [
  {
    id: '1',
    name: 'Breakfast',
    dishes: [
      {
        id: 'b1',
        name: 'Classic Pancakes',
        description: 'Fluffy pancakes served with maple syrup',
        price: 12.99,
        image: '/placeholder.svg'
      },
      {
        id: 'b2',
        name: 'Eggs Benedict',
        description: 'Poached eggs with hollandaise sauce',
        price: 14.99,
        image: '/placeholder.svg'
      }
    ]
  },
  {
    id: '2',
    name: 'Dinner',
    dishes: [
      {
        id: 'd1',
        name: 'Grilled Salmon',
        description: 'Fresh salmon with seasonal vegetables',
        price: 24.99,
        image: '/placeholder.svg'
      },
      {
        id: 'd2',
        name: 'Beef Tenderloin',
        description: 'Premium cut served with wine sauce',
        price: 29.99,
        image: '/placeholder.svg'
      }
    ]
  }
];

const MenuManagement = () => {
  const [menus, setMenus] = useState<Menu[]>(initialMenus);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<string>(menus[0].id);
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [isEditDishOpen, setIsEditDishOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [newDish, setNewDish] = useState<Partial<Dish>>({
    name: '',
    description: '',
    price: 0,
    image: '/placeholder.svg'
  });
  const { toast } = useToast();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMenus = menus.map(menu => ({
    ...menu,
    dishes: menu.dishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const handleAddDish = () => {
    if (!newDish.name || !newDish.description || !newDish.price) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newDishWithId: Dish = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDish.name,
      description: newDish.description,
      price: Number(newDish.price),
      image: newDish.image || '/placeholder.svg'
    };

    setMenus(prevMenus => 
      prevMenus.map(menu => 
        menu.id === selectedMenu
          ? { ...menu, dishes: [...menu.dishes, newDishWithId] }
          : menu
      )
    );

    setNewDish({
      name: '',
      description: '',
      price: 0,
      image: '/placeholder.svg'
    });
    setIsAddDishOpen(false);
    toast({
      title: "Success",
      description: "Dish added successfully"
    });
  };

  const handleEditDish = () => {
    if (!editingDish || !editingDish.name || !editingDish.description || !editingDish.price) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setMenus(prevMenus =>
      prevMenus.map(menu => ({
        ...menu,
        dishes: menu.dishes.map(dish =>
          dish.id === editingDish.id ? editingDish : dish
        )
      }))
    );

    setIsEditDishOpen(false);
    setEditingDish(null);
    toast({
      title: "Success",
      description: "Dish updated successfully"
    });
  };

  const openEditDialog = (dish: Dish) => {
    setEditingDish(dish);
    setIsEditDishOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Menu Management</h1>
        <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Dish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Dish</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newDish.price}
                  onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDishOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDish}>Add Dish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full max-w-sm">
        <Input
          type="search"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      <Tabs defaultValue={menus[0].id} className="w-full" onValueChange={setSelectedMenu}>
        <TabsList className="w-full justify-start">
          {menus.map((menu) => (
            <TabsTrigger key={menu.id} value={menu.id}>
              {menu.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredMenus.map((menu) => (
          <TabsContent key={menu.id} value={menu.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.dishes.map((dish) => (
                <Card key={dish.id}>
                  <CardHeader>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <CardTitle>{dish.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{dish.description}</p>
                    <p className="text-lg font-bold mt-2">${dish.price}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(dish)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isEditDishOpen} onOpenChange={setIsEditDishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Dish</DialogTitle>
          </DialogHeader>
          {editingDish && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingDish.description}
                  onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingDish.price}
                  onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDishOpen(false)}>Cancel</Button>
            <Button onClick={handleEditDish}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManagement;
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2 } from 'lucide-react';

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMenus = menus.map(menu => ({
    ...menu,
    dishes: menu.dishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Menu Management</h1>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Menu
        </Button>
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

      <Tabs defaultValue={menus[0].id} className="w-full">
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
                    <Button variant="outline" size="icon">
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
    </div>
  );
};

export default MenuManagement;
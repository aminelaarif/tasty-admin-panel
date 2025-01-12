import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuManagement from '@/components/MenuManagement';
import OrderManagement from '@/components/OrderManagement';
import ReservationManagement from '@/components/ReservationManagement';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#fdfcfb] bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]">
      <header className="border-b border-primary/20 animate-fade-in">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-serif font-bold text-primary text-center">
            La Maison Restaurant
          </h1>
          <p className="text-center text-primary/60 mt-2 font-serif">
            Administrative Dashboard
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Tabs defaultValue="menu" className="space-y-8">
          <TabsList className="w-full justify-center border-b border-primary/20 p-0 h-auto">
            <TabsTrigger 
              value="menu"
              className="font-serif text-lg px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-all duration-200"
            >
              Menu Management
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="font-serif text-lg px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-all duration-200"
            >
              Order Management
            </TabsTrigger>
            <TabsTrigger 
              value="reservations"
              className="font-serif text-lg px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-all duration-200"
            >
              Reservations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="menu" className="animate-fade-in">
            <MenuManagement />
          </TabsContent>
          <TabsContent value="orders" className="animate-fade-in">
            <OrderManagement />
          </TabsContent>
          <TabsContent value="reservations" className="animate-fade-in">
            <ReservationManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
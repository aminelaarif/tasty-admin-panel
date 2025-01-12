import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuManagement from '@/components/MenuManagement';
import OrderManagement from '@/components/OrderManagement';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Restaurant Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="menu" className="space-y-4">
          <TabsList>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
          </TabsList>
          <TabsContent value="menu">
            <MenuManagement />
          </TabsContent>
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
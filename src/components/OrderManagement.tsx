import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from 'lucide-react';

interface Order {
  id: string;
  items: string[];
  total: number;
  status: 'completed' | 'pending' | 'in-kitchen';
  date: string;
}

const initialOrders: Order[] = [
  {
    id: 'ORD001',
    items: ['Classic Pancakes', 'Coffee'],
    total: 16.99,
    status: 'completed',
    date: '2024-02-20 09:30'
  },
  {
    id: 'ORD002',
    items: ['Beef Tenderloin', 'Wine'],
    total: 45.99,
    status: 'in-kitchen',
    date: '2024-02-20 19:15'
  },
  {
    id: 'ORD003',
    items: ['Grilled Salmon', 'Salad'],
    total: 32.99,
    status: 'pending',
    date: '2024-02-20 18:45'
  }
];

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedOrders = orders
    .filter(order => 
      (statusFilter === 'all' || order.status === statusFilter) &&
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.total - b.total;
      }
      return b.total - a.total;
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Order Management</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="search"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="max-w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-kitchen">In Kitchen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={toggleSort} className="flex items-center">
                  Total
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.items.join(', ')}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'in-kitchen' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderManagement;
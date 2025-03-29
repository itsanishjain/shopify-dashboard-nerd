
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CalendarDays, 
  Filter, 
  Search, 
  TrendingUp, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  ArrowUpDown 
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OrdersTable from "@/components/dashboard/OrdersTable";
import OrdersChart from "@/components/dashboard/OrdersChart";
import { orderData } from "@/data/orderData";
import OrderStatusCard from "@/components/dashboard/OrderStatusCard";
import OrderFilters from "@/components/dashboard/OrderFilters";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(orderData);
  
  // Count orders by status
  const pendingOrders = orderData.filter(order => order.status === "pending").length;
  const processingOrders = orderData.filter(order => order.status === "processing").length;
  const shippedOrders = orderData.filter(order => order.status === "shipped").length;
  const deliveredOrders = orderData.filter(order => order.status === "delivered").length;
  const cancelledOrders = orderData.filter(order => order.status === "cancelled").length;

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredData(orderData);
    } else {
      const filtered = orderData.filter(
        order => 
          order.id.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.product.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <CalendarDays className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Order Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <OrderStatusCard 
            title="Pending" 
            value={pendingOrders} 
            icon={<Clock className="h-5 w-5 text-amber-500" />} 
            color="bg-amber-500/10 border-amber-500/20"
            textColor="text-amber-500"
          />
          <OrderStatusCard 
            title="Processing" 
            value={processingOrders} 
            icon={<Package className="h-5 w-5 text-blue-500" />} 
            color="bg-blue-500/10 border-blue-500/20"
            textColor="text-blue-500"
          />
          <OrderStatusCard 
            title="Shipped" 
            value={shippedOrders} 
            icon={<Truck className="h-5 w-5 text-indigo-500" />} 
            color="bg-indigo-500/10 border-indigo-500/20"
            textColor="text-indigo-500"
          />
          <OrderStatusCard 
            title="Delivered" 
            value={deliveredOrders} 
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} 
            color="bg-green-500/10 border-green-500/20"
            textColor="text-green-500"
          />
          <OrderStatusCard 
            title="Cancelled" 
            value={cancelledOrders} 
            icon={<XCircle className="h-5 w-5 text-red-500" />} 
            color="bg-red-500/10 border-red-500/20"
            textColor="text-red-500"
          />
        </div>

        {/* Chart and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 analytics-card">
            <CardHeader className="analytics-card-header">
              <CardTitle className="chart-title">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Order Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <OrdersChart data={orderData} />
            </CardContent>
          </Card>
          
          <Card className="analytics-card">
            <CardHeader className="analytics-card-header">
              <CardTitle className="chart-title">
                <Filter className="mr-2 h-5 w-5 text-primary" />
                Filter Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <OrderFilters 
                data={orderData} 
                onFilterChange={(data) => setFilteredData(data)} 
              />
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="w-full analytics-card">
          <CardHeader className="analytics-card-header">
            <div className="flex justify-between items-center">
              <CardTitle className="chart-title">Recent Orders</CardTitle>
              <Badge variant="outline" className="ml-2 border-[#334155] text-white">
                {filteredData.length} orders
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <OrdersTable orders={filteredData} />
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Orders;

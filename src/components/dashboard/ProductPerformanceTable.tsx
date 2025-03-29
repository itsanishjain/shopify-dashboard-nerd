
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: string;
  sales: number;
  status: "trending" | "stable" | "declining";
  inventory: number;
  conversion: number;
}

interface ProductPerformanceTableProps {
  products: Product[];
  className?: string;
}

const ProductPerformanceTable: React.FC<ProductPerformanceTableProps> = ({
  products,
  className,
}) => {
  const getStatusIcon = (status: Product["status"]) => {
    switch (status) {
      case "trending":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      case "stable":
        return <Minus className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getInventoryStatus = (inventory: number) => {
    if (inventory <= 5) {
      return (
        <Badge variant="destructive" className="text-xs">
          Low
        </Badge>
      );
    } else if (inventory <= 20) {
      return (
        <Badge variant="outline" className="text-xs text-amber-500">
          Medium
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-xs text-success">
          Good
        </Badge>
      );
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium terminal-text">Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Conversion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-accent/50 transition-colors">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(product.status)}
                      <span
                        className={cn(
                          product.status === "trending" && "text-success",
                          product.status === "declining" && "text-destructive",
                          product.status === "stable" && "text-muted-foreground"
                        )}
                      >
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getInventoryStatus(product.inventory)}</TableCell>
                  <TableCell>{product.conversion}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPerformanceTable;

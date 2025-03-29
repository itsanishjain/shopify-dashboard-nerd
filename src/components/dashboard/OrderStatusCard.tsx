import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrderStatusCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  title,
  value,
  icon,
  color,
  textColor,
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden border matrix-flow relative",
        "bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5",
        "hover:from-[#10b981]/20 hover:to-[#10b981]/10 transition-all duration-200",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-background/80 before:z-0"
      )}
    >
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className={cn("text-sm font-medium text-primary", textColor)}>
              {title}
            </p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-full",
              "bg-[#10b981]/10 text-[#10b981]"
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;

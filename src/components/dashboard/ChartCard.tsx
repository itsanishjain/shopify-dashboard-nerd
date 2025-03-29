
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ChartCardProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  chart,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-2 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-md font-medium">{title}</CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="rounded-full p-1.5 bg-primary/10 text-primary">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">{chart}</CardContent>
      </Card>
    </motion.div>
  );
};

export default ChartCard;

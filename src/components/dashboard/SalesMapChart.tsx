
import React from "react";

interface LocationData {
  name: string;
  value: number;
  coordinates: [number, number];
}

interface SalesMapChartProps {
  data: LocationData[];
}

const SalesMapChart: React.FC<SalesMapChartProps> = ({ data }) => {
  // This is a simplified map visualization
  // For a real application, you would use a library like react-simple-maps

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-[#1b1b1b] rounded-lg relative flex items-center justify-center">
        <div className="text-muted-foreground text-sm">
          US Sales Distribution Map
        </div>
        
        {/* Top 5 locations as text */}
        <div className="absolute bottom-2 left-2 right-2 bg-background/20 backdrop-blur-sm p-2 rounded-md">
          <div className="text-xs font-medium mb-1">Top Locations:</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {data
              .sort((a, b) => b.value - a.value)
              .slice(0, 4)
              .map((location, index) => (
                <div key={location.name} className="flex justify-between">
                  <span>{location.name}</span>
                  <span className="font-medium">${location.value.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesMapChart;

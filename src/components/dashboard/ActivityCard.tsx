import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface ActivityCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: {
    text: string;
    type: "up" | "down" | "neutral";
  };
}

export const ActivityCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: ActivityCardProps) => {
  return (
    <Card>
      <CardContent className="px-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-5xl font-medium text-brand">{value}</p>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {trend.type === "up" && (
                <TrendingUp className="h-3 w-3 text-red-500" />
              )}
              {trend.type === "down" && (
                <TrendingDown className="h-3 w-3 text-green-500" />
              )}
              <span>{trend.text}</span>
            </div>
          </div>
          <div className="p-3 rounded-full bg-blue-100">
            <Icon className="h-5 w-5 text-brand" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

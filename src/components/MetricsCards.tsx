import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock, DollarSign, Target } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "primary";
}

const MetricCard = ({ title, value, change, icon, variant = "default" }: MetricCardProps) => {
  const variantClasses = {
    default: "bg-card",
    success: "bg-success-light border-success/20",
    warning: "bg-accent-light border-accent/20",
    primary: "bg-primary-light border-primary/20",
  };

  return (
    <Card className={`p-6 ${variantClasses[variant]} transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="p-2 rounded-lg bg-background/50">{icon}</div>
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{value}</div>
        
        {change && (
          <div className="flex items-center gap-1 text-sm">
            {change.isPositive ? (
              <>
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-medium">{change.value}</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-destructive font-medium">{change.value}</span>
              </>
            )}
            <span className="text-muted-foreground ml-1">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
};

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Pending Invoices"
        value={24}
        change={{ value: "+3 urgent", isPositive: false }}
        icon={<Clock className="w-5 h-5 text-accent" />}
        variant="warning"
      />
      
      <MetricCard
        title="Pending Amount"
        value="$124,350"
        change={{ value: "-12%", isPositive: false }}
        icon={<DollarSign className="w-5 h-5 text-primary" />}
        variant="primary"
      />
      
      <MetricCard
        title="Approved This Month"
        value="$89,200"
        change={{ value: "+8%", isPositive: true }}
        icon={<Target className="w-5 h-5 text-success" />}
        variant="success"
      />
      
      <MetricCard
        title="Rejected This Month"
        value="$2,450"
        change={{ value: "-3%", isPositive: true }}
        icon={<TrendingDown className="w-5 h-5 text-destructive" />}
        variant="default"
      />
    </div>
  );
};

export default MetricsCards;

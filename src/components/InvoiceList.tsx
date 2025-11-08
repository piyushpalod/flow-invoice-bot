import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Upload,
  ChevronRight,
  FileText
} from "lucide-react";

interface Invoice {
  id: string;
  vendor: string;
  amount: string;
  date: string;
  status: "pending" | "approved" | "review" | "rejected";
  verificationStatus: "verified" | "suspicious" | "new" | "flagged";
}

const invoices: Invoice[] = [
  { id: "1", vendor: "Amazon Web Services", amount: "$3,240", date: "Today", status: "pending", verificationStatus: "verified" },
  { id: "2", vendor: "Slack Technologies", amount: "$890", date: "Today", status: "approved", verificationStatus: "verified" },
  { id: "3", vendor: "Office Depot", amount: "$156", date: "Nov 7", status: "review", verificationStatus: "suspicious" },
  { id: "4", vendor: "Microsoft Azure", amount: "$2,100", date: "Nov 6", status: "approved", verificationStatus: "verified" },
  { id: "5", vendor: "Adobe Creative Cloud", amount: "$599", date: "Nov 5", status: "pending", verificationStatus: "new" },
];

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-accent-light text-accent border-accent/20",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-success-light text-success border-success/20",
  },
  review: {
    label: "Review",
    icon: MessageSquare,
    className: "bg-primary-light text-primary border-primary/20",
  },
  rejected: {
    label: "Rejected",
    icon: FileText,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const verificationConfig = {
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    className: "bg-success-light text-success border-success/20",
  },
  suspicious: {
    label: "Suspicious",
    icon: MessageSquare,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  new: {
    label: "New",
    icon: Clock,
    className: "bg-primary-light text-primary border-primary/20",
  },
  flagged: {
    label: "Flagged",
    icon: MessageSquare,
    className: "bg-accent-light text-accent border-accent/20",
  },
};

const InvoiceList = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Invoices</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="w-4 h-4" />
          Upload
        </Button>
      </div>

      {/* Column Headers */}
      <div className="flex items-center gap-4 px-4 pb-3 border-b border-border">
        <div className="p-3 opacity-0">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground">Vendor</p>
        </div>
        <div className="w-32">
          <p className="text-sm font-medium text-muted-foreground">Invoice Status</p>
        </div>
        <div className="w-32">
          <p className="text-sm font-medium text-muted-foreground">Vendor Status</p>
        </div>
        <div className="w-28 text-right">
          <p className="text-sm font-medium text-muted-foreground">Amount</p>
        </div>
        <div className="w-5"></div>
      </div>

      <div className="space-y-3">
        {invoices.map((invoice) => {
          const StatusIcon = statusConfig[invoice.status].icon;
          const VerificationIcon = verificationConfig[invoice.verificationStatus].icon;
          
          return (
            <div
              key={invoice.id}
              className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary-light/20 transition-all cursor-pointer"
            >
              {/* Vendor Icon */}
              <div className="p-3 rounded-lg bg-primary-light group-hover:bg-primary/10">
                <Building2 className="w-5 h-5 text-primary" />
              </div>

              {/* Vendor & Date */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {invoice.vendor}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{invoice.date}</p>
              </div>

              {/* Status */}
              <div className="w-32">
                <Badge 
                  variant="outline" 
                  className={statusConfig[invoice.status].className}
                >
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig[invoice.status].label}
                </Badge>
              </div>

              {/* Verification Status */}
              <div className="w-32">
                <Badge 
                  variant="outline" 
                  className={verificationConfig[invoice.verificationStatus].className}
                >
                  <VerificationIcon className="w-3 h-3 mr-1" />
                  {verificationConfig[invoice.verificationStatus].label}
                </Badge>
              </div>

              {/* Amount */}
              <div className="w-28 text-right">
                <div className="font-semibold text-foreground">{invoice.amount}</div>
              </div>

              {/* Arrow Icon */}
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          );
        })}
      </div>

      <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary hover:bg-primary-light">
        View All Invoices
      </Button>
    </Card>
  );
};

export default InvoiceList;

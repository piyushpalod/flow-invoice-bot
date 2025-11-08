import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  FileText,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

interface Invoice {
  id: string;
  vendor: string;
  amount: string;
  date: string;
  status: "pending" | "approved" | "review" | "rejected";
}

const invoices: Invoice[] = [
  { id: "1", vendor: "Amazon Web Services", amount: "$3,240", date: "Today", status: "pending" },
  { id: "2", vendor: "Slack Technologies", amount: "$890", date: "Today", status: "approved" },
  { id: "3", vendor: "Office Depot", amount: "$156", date: "Nov 7", status: "review" },
  { id: "4", vendor: "Microsoft Azure", amount: "$2,100", date: "Nov 6", status: "approved" },
  { id: "5", vendor: "Adobe Creative Cloud", amount: "$599", date: "Nov 5", status: "pending" },
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

const Invoices = () => {
  const navigate = useNavigate();
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [invoiceList, setInvoiceList] = useState(invoices);

  const toggleInvoice = (id: string) => {
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedInvoices.length === invoiceList.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(invoiceList.map(inv => inv.id));
    }
  };

  const handleBulkApprove = () => {
    setInvoiceList(prev =>
      prev.map(inv =>
        selectedInvoices.includes(inv.id) ? { ...inv, status: "approved" } : inv
      )
    );
    toast.success(`${selectedInvoices.length} invoice(s) approved`);
    setSelectedInvoices([]);
  };

  const handleBulkReject = () => {
    setInvoiceList(prev =>
      prev.map(inv =>
        selectedInvoices.includes(inv.id) ? { ...inv, status: "rejected" } : inv
      )
    );
    toast.error(`${selectedInvoices.length} invoice(s) rejected`);
    setSelectedInvoices([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Invoice Review</h1>
          <p className="text-muted-foreground">
            Review, approve, or reject invoices individually or in bulk
          </p>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedInvoices.length === invoiceList.length}
                onCheckedChange={toggleAll}
              />
              <span className="text-sm text-muted-foreground">
                {selectedInvoices.length > 0 
                  ? `${selectedInvoices.length} selected` 
                  : "Select all"}
              </span>
            </div>
            
            {selectedInvoices.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleBulkApprove}
                  className="gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve ({selectedInvoices.length})
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleBulkReject}
                  className="gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Reject ({selectedInvoices.length})
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {invoiceList.map((invoice) => {
              const StatusIcon = statusConfig[invoice.status].icon;
              
              return (
                <div
                  key={invoice.id}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary-light/20 transition-all"
                >
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onCheckedChange={() => toggleInvoice(invoice.id)}
                  />

                  <div className="p-3 rounded-lg bg-primary-light group-hover:bg-primary/10">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {invoice.vendor}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{invoice.date}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-foreground">{invoice.amount}</div>
                        <Badge 
                          variant="outline" 
                          className={`mt-2 ${statusConfig[invoice.status].className}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[invoice.status].label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/invoices/${invoice.id}`)}
                    className="shrink-0"
                  >
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Invoices;

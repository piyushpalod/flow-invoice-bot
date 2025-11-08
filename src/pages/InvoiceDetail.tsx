import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Building2, 
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
  XCircle,
  FileImage,
  File
} from "lucide-react";
import { toast } from "sonner";

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const invoice = {
    id: id,
    invoiceNumber: "INV-2024-3847",
    vendor: "Amazon Web Services",
    vendorAddress: "410 Terry Ave N, Seattle, WA 98109",
    vendorTaxId: "91-1646860",
    amount: "$3,240.00",
    date: "November 8, 2024",
    dueDate: "December 8, 2024",
    status: "pending",
    verificationStatus: "verified" as "verified" | "suspicious" | "new" | "flagged",
    fileType: "image" as "pdf" | "image" | "document",
    fileUrl: "/placeholder.svg",
    lineItems: [
      { description: "EC2 Instances", quantity: 1, unitPrice: "$2,100.00", total: "$2,100.00" },
      { description: "S3 Storage", quantity: 1, unitPrice: "$840.00", total: "$840.00" },
      { description: "CloudFront CDN", quantity: 1, unitPrice: "$300.00", total: "$300.00" },
    ],
    department: "Engineering Department",
    costCenter: "Infrastructure (401)",
  };

  const verificationConfig = {
    verified: {
      label: "Verified",
      className: "bg-success-light text-success border-success/20",
    },
    suspicious: {
      label: "Suspicious",
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    new: {
      label: "New",
      className: "bg-primary-light text-primary border-primary/20",
    },
    flagged: {
      label: "Flagged",
      className: "bg-accent-light text-accent border-accent/20",
    },
  };

  const handleApprove = () => {
    toast.success("Invoice approved successfully");
    navigate("/invoices");
  };

  const handleReject = () => {
    toast.error("Invoice rejected");
    navigate("/invoices");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/invoices")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice Preview */}
          <Card className="p-6 lg:col-span-1">
            <div className="aspect-[8.5/11] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {invoice.fileType === "image" && invoice.fileUrl ? (
                <img 
                  src={invoice.fileUrl} 
                  alt="Invoice preview" 
                  className="w-full h-full object-contain"
                />
              ) : invoice.fileType === "pdf" ? (
                <div className="text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">PDF Document</p>
                </div>
              ) : (
                <div className="text-center">
                  <File className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Document Preview</p>
                </div>
              )}
            </div>
          </Card>

          {/* Invoice Details */}
          <Card className="p-6 lg:col-span-2">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    {invoice.invoiceNumber}
                  </h1>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-accent-light text-accent border-accent/20">
                      Pending Review
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={verificationConfig[invoice.verificationStatus].className}
                    >
                      {verificationConfig[invoice.verificationStatus].label}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                  <div className="text-3xl font-bold text-foreground">{invoice.amount}</div>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Vendor Information
                </h3>
                <div className="grid grid-cols-2 gap-4 pl-7">
                  <div>
                    <div className="text-sm text-muted-foreground">Vendor Name</div>
                    <div className="font-medium text-foreground">{invoice.vendor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Tax ID</div>
                    <div className="font-medium text-foreground">{invoice.vendorTaxId}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium text-foreground">{invoice.vendorAddress}</div>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Invoice Details
                </h3>
                <div className="grid grid-cols-2 gap-4 pl-7">
                  <div>
                    <div className="text-sm text-muted-foreground">Invoice Date</div>
                    <div className="font-medium text-foreground">{invoice.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Due Date</div>
                    <div className="font-medium text-foreground">{invoice.dueDate}</div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Line Items
                </h3>
                <div className="pl-7">
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Description</th>
                          <th className="text-right p-3 text-sm font-medium text-muted-foreground">Qty</th>
                          <th className="text-right p-3 text-sm font-medium text-muted-foreground">Unit Price</th>
                          <th className="text-right p-3 text-sm font-medium text-muted-foreground">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.lineItems.map((item, index) => (
                          <tr key={index} className="border-t border-border">
                            <td className="p-3 text-foreground">{item.description}</td>
                            <td className="p-3 text-right text-foreground">{item.quantity}</td>
                            <td className="p-3 text-right text-foreground">{item.unitPrice}</td>
                            <td className="p-3 text-right font-medium text-foreground">{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Assignment */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Assignment</h3>
                <div className="grid grid-cols-2 gap-4 pl-7">
                  <div>
                    <div className="text-sm text-muted-foreground">Department</div>
                    <div className="font-medium text-foreground">{invoice.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Cost Center</div>
                    <div className="font-medium text-foreground">{invoice.costCenter}</div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Add Comment</h3>
                <Textarea 
                  placeholder="Add notes or request clarification..." 
                  className="resize-none"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="default" 
                  className="flex-1 gap-2"
                  onClick={handleApprove}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Invoice
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 gap-2"
                  onClick={handleReject}
                >
                  <XCircle className="w-4 h-4" />
                  Reject Invoice
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default InvoiceDetail;

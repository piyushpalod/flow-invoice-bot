import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Building2, 
  CheckCircle2, 
  FileText,
  ChevronRight
} from "lucide-react";

interface Invoice {
  id: string;
  vendor: string;
  amount: string;
  date: string;
  status: "approved" | "rejected";
}

const approvedInvoices: Invoice[] = [
  { id: "2", vendor: "Slack Technologies", amount: "$890", date: "Nov 8", status: "approved" },
  { id: "4", vendor: "Microsoft Azure", amount: "$2,100", date: "Nov 6", status: "approved" },
  { id: "6", vendor: "Google Workspace", amount: "$450", date: "Nov 4", status: "approved" },
  { id: "8", vendor: "Zoom Video", amount: "$200", date: "Nov 2", status: "approved" },
];

const rejectedInvoices: Invoice[] = [
  { id: "7", vendor: "Unknown Vendor LLC", amount: "$5,000", date: "Nov 3", status: "rejected" },
  { id: "9", vendor: "Suspicious Inc", amount: "$1,200", date: "Nov 1", status: "rejected" },
];

const InvoiceHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Invoice History</h1>
          <p className="text-muted-foreground">
            View all approved and rejected invoices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Approved Invoices */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <h2 className="text-xl font-semibold text-foreground">Approved Invoices</h2>
              <Badge variant="outline" className="ml-auto bg-success-light text-success border-success/20">
                {approvedInvoices.length}
              </Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedInvoices.map((invoice) => (
                  <TableRow 
                    key={invoice.id}
                    className="cursor-pointer hover:bg-primary-light/20"
                    onClick={() => navigate(`/invoices/${invoice.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary-light">
                          <Building2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{invoice.vendor}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell className="text-right font-semibold">{invoice.amount}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Rejected Invoices */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-semibold text-foreground">Rejected Invoices</h2>
              <Badge variant="outline" className="ml-auto bg-destructive/10 text-destructive border-destructive/20">
                {rejectedInvoices.length}
              </Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rejectedInvoices.map((invoice) => (
                  <TableRow 
                    key={invoice.id}
                    className="cursor-pointer hover:bg-primary-light/20"
                    onClick={() => navigate(`/invoices/${invoice.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary-light">
                          <Building2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{invoice.vendor}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell className="text-right font-semibold">{invoice.amount}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default InvoiceHistory;

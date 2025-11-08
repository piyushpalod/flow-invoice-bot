import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Building2, 
  Plus, 
  Trash2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "paypal" | "crypto";
  last4?: string;
  brand?: string;
  accountName?: string;
  email?: string;
  isDefault: boolean;
  status: "verified" | "pending" | "failed";
}

const Profile = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      brand: "Visa",
      last4: "4242",
      isDefault: true,
      status: "verified"
    },
    {
      id: "2",
      type: "bank",
      accountName: "Business Checking",
      last4: "8765",
      isDefault: false,
      status: "verified"
    },
    {
      id: "3",
      type: "paypal",
      email: "business@company.com",
      isDefault: false,
      status: "verified"
    }
  ]);

  const [addMethodOpen, setAddMethodOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("card");

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(pm => ({
        ...pm,
        isDefault: pm.id === id
      }))
    );
    toast.success("Default payment method updated");
  };

  const handleRemove = (id: string) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    toast.success("Payment method removed");
  };

  const handleAddMethod = () => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: selectedType as any,
      last4: "0000",
      brand: selectedType === "card" ? "Visa" : undefined,
      accountName: selectedType === "bank" ? "New Account" : undefined,
      email: selectedType === "paypal" ? "new@example.com" : undefined,
      isDefault: paymentMethods.length === 0,
      status: "pending"
    };
    setPaymentMethods(prev => [...prev, newMethod]);
    toast.success("Payment method added (pending verification)");
    setAddMethodOpen(false);
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="w-5 h-5" />;
      case "bank":
        return <Building2 className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getPaymentLabel = (method: PaymentMethod) => {
    switch (method.type) {
      case "card":
        return `${method.brand} •••• ${method.last4}`;
      case "bank":
        return `${method.accountName} •••• ${method.last4}`;
      case "paypal":
        return method.email;
      case "crypto":
        return `Crypto Wallet •••• ${method.last4}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and payment methods
          </p>
        </div>

        {/* User Info Card */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@company.com" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Inc." className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => toast.success("Profile updated")}>Save Changes</Button>
            </div>
          </div>
        </Card>

        {/* Payment Methods Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Payment Methods</h2>
              <p className="text-sm text-muted-foreground">
                Manage payment methods for automatic invoice payments (requires manual approval)
              </p>
            </div>
            <Dialog open={addMethodOpen} onOpenChange={setAddMethodOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Method
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Choose a payment method to add to your account
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <Label>Payment Type</Label>
                    <RadioGroup value={selectedType} onValueChange={setSelectedType}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex-1 cursor-pointer flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Bank Account
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                          Cryptocurrency
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {selectedType === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedType === "bank" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input id="accountName" placeholder="Business Checking" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="routing">Routing Number</Label>
                        <Input id="routing" placeholder="123456789" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="account">Account Number</Label>
                        <Input id="account" placeholder="0000123456" className="mt-1" />
                      </div>
                    </div>
                  )}

                  {selectedType === "paypal" && (
                    <div>
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input id="paypalEmail" type="email" placeholder="you@example.com" className="mt-1" />
                    </div>
                  )}

                  {selectedType === "crypto" && (
                    <div>
                      <Label htmlFor="walletAddress">Wallet Address</Label>
                      <Input id="walletAddress" placeholder="0x..." className="mt-1" />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddMethodOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMethod}>Add Payment Method</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Payment Methods List */}
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary-light/20 transition-all"
              >
                <div className={`p-3 rounded-lg ${method.isDefault ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {getPaymentIcon(method.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">
                      {getPaymentLabel(method)}
                    </h3>
                    {method.isDefault && (
                      <Badge variant="outline" className="bg-primary-light text-primary border-primary/20">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {method.status === "verified" && (
                      <Badge variant="outline" className="bg-success-light text-success border-success/20 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {method.status === "pending" && (
                      <Badge variant="outline" className="bg-accent-light text-accent border-accent/20 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending Verification
                      </Badge>
                    )}
                    {method.status === "failed" && (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Verification Failed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(method.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Auto-payment Notice */}
          <div className="mt-6 p-4 rounded-lg bg-accent-light border border-accent/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Manual Approval Required</p>
                <p className="text-muted-foreground">
                  Even with payment methods on file, all invoice payments require manual approval before processing. You'll receive notifications for pending approvals.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Profile;

import { Button } from "@/components/ui/button";
import { Bell, User, Menu, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-hero rounded-lg">
            <Zap className="w-5 h-5 text-white" />
            <span className="font-bold text-white hidden sm:inline">InvoiceFlow AI</span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

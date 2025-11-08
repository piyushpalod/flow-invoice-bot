import { Button } from "@/components/ui/button";
import { Bell, User, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import NavLink from "./NavLink";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="InvoiceFlow AI" className="h-14 w-auto" />
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" active={location.pathname === "/"}>Dashboard</NavLink>
            <NavLink to="/invoices" active={location.pathname.startsWith("/invoices")}>Invoices</NavLink>
            <NavLink to="/history" active={location.pathname === "/history"}>History</NavLink>
          </nav>
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

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        active ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;

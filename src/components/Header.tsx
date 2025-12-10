import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MICSVNest</h1>
            <p className="text-xs text-muted-foreground">Metadata Generation Platform</p>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Documentation
          </Button>
          <Button variant="ghost" size="sm">
            API Keys
          </Button>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

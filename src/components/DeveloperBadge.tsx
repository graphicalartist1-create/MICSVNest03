import { Code2 } from "lucide-react";

const DeveloperBadge = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
      <Code2 className="h-4 w-4 text-primary" />
      <span className="text-xs text-muted-foreground">MICSVNest v3.0</span>
    </div>
  );
};

export default DeveloperBadge;
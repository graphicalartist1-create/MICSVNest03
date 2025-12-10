import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowToUseButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={() => alert("Documentation coming soon!")}
    >
      <HelpCircle className="h-4 w-4" />
      Help
    </Button>
  );
};

export default HowToUseButton;

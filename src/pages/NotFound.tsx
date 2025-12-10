import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-destructive/10 rounded-lg">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-4">পৃষ্ঠা পাওয়া যাইনি</p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই।
        </p>
        <Link to="/">
          <Button>হোমে ফিরে যান</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

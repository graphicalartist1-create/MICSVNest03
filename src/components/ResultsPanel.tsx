import { ImageIcon, Copy, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Result {
  id: string;
  filename: string;
  title: string;
  description: string;
  keywords: string[];
}

interface ResultsPanelProps {
  results: Result[];
  onUpdateResult?: (id: string, fields: Partial<Result>) => void;
  onRegenerate?: (id: string) => void;
}

const ResultsPanel = ({ results, onUpdateResult, onRegenerate }: ResultsPanelProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12 text-center">
          <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-primary text-lg mb-2 font-medium">কোন ফলাফল নেই</p>
          <p className="text-muted-foreground">
            ফাইল আপলোড করুন এবং "জেনারেট করুন" ক্লিক করুন।
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>উৎপাদিত ফলাফল ({results.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 rounded-lg border border-border hover:bg-secondary/30 transition-colors"
            >
              {/* File Info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="p-2 bg-secondary rounded">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{result.filename}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRegenerate?.(result.id)}
                    className="h-8 w-8 p-0"
                  >
                    🔄
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Title */}
              <div className="mb-3">
                <div className="flex items-start justify-between mb-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase">শিরোনাম</label>
                  <span className="text-xs text-muted-foreground">{result.title.length} অক্ষর</span>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-sm text-foreground flex-1">{result.title}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.title)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <div className="flex items-start justify-between mb-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase">বর্ণনা</label>
                  <span className="text-xs text-muted-foreground">{result.description.length} অক্ষর</span>
                </div>
                <div className="flex gap-2 items-start">
                  <p className="text-sm text-muted-foreground flex-1 line-clamp-2">{result.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.description)}
                    className="h-8 w-8 p-0 flex-shrink-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">কীওয়ার্ড</label>
                  <span className="text-xs text-muted-foreground">{result.keywords.length} টি</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.keywords.map((keyword, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary/20"
                      onClick={() => copyToClipboard(keyword)}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPanel;

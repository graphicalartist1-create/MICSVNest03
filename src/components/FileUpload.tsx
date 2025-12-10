import { useState, useCallback } from "react";
import { Upload, Trash2, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onGenerate: () => void;
  onExport: () => void;
  isGenerating: boolean;
}

const FileUpload = ({ files, onFilesChange, onGenerate, onExport, isGenerating }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesChange([...files, ...droppedFiles]);
  }, [files, onFilesChange]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesChange([...files, ...selectedFiles]);
    }
  }, [files, onFilesChange]);

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    onFilesChange([]);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden flex flex-col h-full">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-8 text-center transition-all flex flex-col items-center justify-center min-h-[200px] ${
          isDragging
            ? "border-2 border-dashed border-primary bg-primary/5"
            : "border-0"
        }`}
      >
        <Upload className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-foreground font-medium mb-2">Drag & drop files here</p>
        <p className="text-sm text-muted-foreground mb-4">or</p>
        <input
          type="file"
          multiple
          accept="image/*,video/*,.svg,.eps"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" asChild className="cursor-pointer">
            <span>Select Files</span>
          </Button>
        </label>
        <p className="text-xs text-muted-foreground mt-4">
          Supports: Images, Videos, SVG, EPS (Max 500 files)
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="border-t border-border">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">
                {files.length} file{files.length !== 1 ? "s" : ""} selected
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="max-h-[150px] overflow-y-auto space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm"
                >
                  <span className="truncate text-muted-foreground">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="border-t border-border p-4 flex gap-2 mt-auto">
        <Button
          onClick={onGenerate}
          disabled={files.length === 0 || isGenerating}
          className="flex-1 gap-2"
        >
          <Sparkles className="h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate All"}
        </Button>
        <Button
          variant="outline"
          onClick={onExport}
          disabled={files.length === 0}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;

'use client';

import { useState, useCallback } from 'react';
import { Upload, Trash2, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onGenerate: () => void;
  onExport: () => void;
  isGenerating?: boolean;
  imageType?: string;
}

export default function FileUpload({
  files,
  onFilesChange,
  onGenerate,
  onExport,
  isGenerating = false,
}: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesChange([...files, ...droppedFiles]);
  }, [files, onFilesChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesChange([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    onFilesChange([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          ফাইল আপলোড করুন
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-8 text-center transition ${
            isDragActive
              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950'
              : 'border-slate-300 dark:border-slate-700'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">ড্র্যাগ এবং ড্রপ করুন বা ক্লিক করুন</p>
            <p className="text-xs text-muted-foreground">
              ছবি, ভিডিও, SVG, এবং EPS ফরম্যাট সমর্থিত। সর্বোচ্চ ৫০০ ফাইল।
            </p>
          </div>

          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{files.length} ফাইল নির্বাচিত</p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                সব মুছুন
              </Button>
            </div>

            <div className="max-h-48 space-y-1 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className="truncate text-sm text-slate-600 dark:text-slate-400">
                    {file.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            onClick={onGenerate}
            disabled={files.length === 0 || isGenerating}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? 'জেনারেট করছে...' : 'জেনারেট করুন'}
          </Button>
          <Button
            onClick={onExport}
            disabled={files.length === 0}
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            এক্সপোর্ট করুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { Download, FileText, Archive } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { exportToCSV, exportToJSON } from '@/lib/export';

export interface Result {
  id: string;
  filename: string;
  title: string;
  description: string;
  keywords: string[];
}

interface ExportDialogProps {
  results: Result[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ExportDialog({
  results,
  isOpen,
  onOpenChange,
}: ExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'csv' | 'json' | 'zip') => {
    if (results.length === 0) {
      toast.error('রপ্তানির জন্য কোনো ফলাফল নেই');
      return;
    }

    setIsExporting(true);

    try {
      if (format === 'csv') {
        exportToCSV(results);
        toast.success('CSV হিসেবে রপ্তানি সফল হয়েছে');
      } else if (format === 'json') {
        exportToJSON(results);
        toast.success('JSON হিসেবে রপ্তানি সফল হয়েছে');
      } else if (format === 'zip') {
        // ZIP export logic would go here
        toast.success('ZIP হিসেবে রপ্তানি শীঘ্রই আসছে');
      }
    } catch (error) {
      toast.error('রপ্তানিতে ত্রুটি হয়েছে');
      console.error(error);
    } finally {
      setIsExporting(false);
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 hover:bg-cyan-600" disabled={results.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          রপ্তানি করুন
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ফলাফল রপ্তানি করুন</DialogTitle>
          <DialogDescription>
            আপনার জেনারেট করা মেটাডেটা বিভিন্ন ফর্ম্যাটে রপ্তানি করুন
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Button
            onClick={() => handleExport('csv')}
            disabled={isExporting || results.length === 0}
            variant="outline"
            className="w-full justify-start"
          >
            <FileText className="h-4 w-4 mr-2" />
            <div className="text-left">
              <p className="font-medium">CSV ফরম্যাট</p>
              <p className="text-xs text-muted-foreground">স্প্রেডশীটের জন্য আদর্শ</p>
            </div>
          </Button>

          <Button
            onClick={() => handleExport('json')}
            disabled={isExporting || results.length === 0}
            variant="outline"
            className="w-full justify-start"
          >
            <FileText className="h-4 w-4 mr-2" />
            <div className="text-left">
              <p className="font-medium">JSON ফরম্যাট</p>
              <p className="text-xs text-muted-foreground">ডেভেলপারদের জন্য</p>
            </div>
          </Button>

          <Button
            onClick={() => handleExport('zip')}
            disabled={isExporting || results.length === 0}
            variant="outline"
            className="w-full justify-start opacity-50"
          >
            <Archive className="h-4 w-4 mr-2" />
            <div className="text-left">
              <p className="font-medium">ZIP ফরম্যাট</p>
              <p className="text-xs text-muted-foreground">শীঘ্রই আসছে</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

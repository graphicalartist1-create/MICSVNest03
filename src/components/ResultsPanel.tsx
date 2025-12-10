'use client';

import { useState } from 'react';
import { Trash2, Copy, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export interface ResultItem {
  id: string;
  filename: string;
  title: string;
  description: string;
  keywords: string[];
}

interface ResultsPanelProps {
  results: ResultItem[];
  onUpdateResult?: (id: string, fields: Partial<ResultItem>) => void;
  onRegenerate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ResultsPanel({
  results,
  onUpdateResult,
  onRegenerate,
  onDelete,
}: ResultsPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ResultItem>>({});

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} কপি করা হয়েছে`);
  };

  const handleEdit = (result: ResultItem) => {
    setEditingId(result.id);
    setEditValues({ ...result });
  };

  const handleSaveEdit = (id: string) => {
    onUpdateResult?.(id, editValues);
    setEditingId(null);
    toast.success('আপডেট সংরক্ষণ করা হয়েছে');
  };

  const handleDeleteResult = (id: string) => {
    onDelete?.(id);
    toast.success('ফলাফল মুছে ফেলা হয়েছে');
  };

  if (results.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg mb-2">কোনো ফলাফল নেই</p>
            <p className="text-sm">ফাইল আপলোড করুন এবং মেটাডেটা তৈরি করতে শুরু করুন</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground truncate">ফাইল: {result.filename}</p>
              </div>
              <div className="flex gap-2 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRegenerate?.(result.id)}
                  title="পুনর্তৈরি করুন"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteResult(result.id)}
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            {editingId === result.id ? (
              // Edit Mode
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">শিরোনাম</label>
                  <Input
                    value={editValues.title || ''}
                    onChange={(e) =>
                      setEditValues({ ...editValues, title: e.target.value })
                    }
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(editValues.title || '').length} / 70 অক্ষর
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">বর্ণনা</label>
                  <textarea
                    value={editValues.description || ''}
                    onChange={(e) =>
                      setEditValues({ ...editValues, description: e.target.value })
                    }
                    className="w-full h-24 px-3 py-2 text-sm border border-input rounded-md bg-background"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(editValues.description || '').length} / 150 অক্ষর
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSaveEdit(result.id)}
                    className="bg-cyan-500 hover:bg-cyan-600"
                  >
                    সংরক্ষণ করুন
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    বাতিল করুন
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <Tabs defaultValue="metadata" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="metadata">মেটাডেটা</TabsTrigger>
                  <TabsTrigger value="keywords">কীওয়ার্ড</TabsTrigger>
                </TabsList>

                <TabsContent value="metadata" className="space-y-3 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">শিরোনাম</label>
                      <span className="text-xs text-muted-foreground">
                        {result.title.length} / 70
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 p-2 rounded-md bg-muted text-sm break-words">
                        {result.title}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(result.title, 'শিরোনাম')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">বর্ণনা</label>
                      <span className="text-xs text-muted-foreground">
                        {result.description.length} / 150
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 p-2 rounded-md bg-muted text-sm whitespace-pre-wrap break-words max-h-20 overflow-y-auto">
                        {result.description}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(result.description, 'বর্ণনা')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleEdit(result)}
                  >
                    সম্পাদনা করুন
                  </Button>
                </TabsContent>

                <TabsContent value="keywords" className="space-y-3 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      handleCopy(result.keywords.join(', '), 'কীওয়ার্ড')
                    }
                  >
                    সব কীওয়ার্ড কপি করুন
                  </Button>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

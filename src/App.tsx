import { useState } from 'react';
import './App.css';
import FileUpload from '@/components/FileUpload';
import ResultsPanel, { type ResultItem } from '@/components/ResultsPanel';
import ExportDialog from '@/components/ExportDialog';
import { generateMetadata } from '@/lib/generator';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (files.length === 0) return;

    setIsGenerating(true);

    // সিমুলেট করা জেনারেশন (বাস্তব অ্যাপে এটি API কল করবে)
    setTimeout(() => {
      const newResults: ResultItem[] = files.map((file, i) => {
        const metadata = generateMetadata(file.name, {
          titleLength: 70,
          descriptionLength: 150,
          keywordsCount: 30,
          imageType: 'ছবি',
          platform: 'সব প্ল্যাটফর্ম',
          prefix: false,
          suffix: false,
          negativeTitle: false,
          negativeKeywords: false,
        });

        return {
          id: `${Date.now()}-${i}`,
          filename: file.name,
          title: metadata.title,
          description: metadata.description,
          keywords: metadata.keywords,
        };
      });
      setResults(newResults);
      setIsGenerating(false);
    }, 2000);
  };

  const handleUpdateResult = (id: string, fields: Partial<ResultItem>) => {
    setResults(prev =>
      prev.map(r => (r.id === id ? { ...r, ...fields } : r))
    );
  };

  const handleRegenerate = (id: string) => {
    const result = results.find(r => r.id === id);
    if (result) {
      const metadata = generateMetadata(result.filename, {
        titleLength: 70,
        descriptionLength: 150,
        keywordsCount: 30,
        imageType: 'ছবি',
        platform: 'সব প্ল্যাটফর্ম',
        prefix: false,
        suffix: false,
        negativeTitle: false,
        negativeKeywords: false,
      });

      handleUpdateResult(id, {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
      });
    }
  };

  const handleDeleteResult = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500" />
            <h1 className="text-2xl font-bold">MICSVNest</h1>
          </div>
          <p className="text-sm text-muted-foreground">মেটাডেটা জেনারেটর</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              <div className="rounded-lg border bg-card p-4">
                <h2 className="font-semibold mb-4">সেটিংস</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium mb-1">শিরোনাম দৈর্ঘ্য</label>
                    <div className="text-slate-600 dark:text-slate-400">৭০ অক্ষর</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">বর্ণনা দৈর্ঘ্য</label>
                    <div className="text-slate-600 dark:text-slate-400">১৫০ অক্ষর</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">কীওয়ার্ড সংখ্যা</label>
                    <div className="text-slate-600 dark:text-slate-400">৩০ কীওয়ার্ড</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <FileUpload
              files={files}
              onFilesChange={setFiles}
              onGenerate={handleGenerate}
              onExport={() => {/* Export logic */}}
              isGenerating={isGenerating}
            />

            {/* Export Dialog */}
            {results.length > 0 && (
              <div className="flex justify-end">
                <ExportDialog results={results} />
              </div>
            )}

            {/* Results Panel */}
            <ResultsPanel
              results={results}
              onUpdateResult={handleUpdateResult}
              onRegenerate={handleRegenerate}
              onDelete={handleDeleteResult}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

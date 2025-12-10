import { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">MICSVNest</h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">মেটাডেটা জেনারেটর</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4">সেটিংস</h2>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-white mb-1">শিরোনাম দৈর্ঘ্য</label>
                  <div>৭০ অক্ষর</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-white mb-1">বর্ণনা দৈর্ঘ্য</label>
                  <div>১৫০ অক্ষর</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-white mb-1">কীওয়ার্ড সংখ্যা</label>
                  <div>৩০ কীওয়ার্ড</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">ফাইল আপলোড</h2>
              
              {/* Upload Zone */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">ড্র্যাগ এবং ড্রপ করুন বা ক্লিক করুন</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">ছবি, ভিডিও, SVG, এবং EPS ফরম্যাট সমর্থিত।</p>
                </div>
                
                <input 
                  type="file" 
                  multiple 
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles(Array.from(e.target.files));
                    }
                  }}
                />
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{files.length} ফাইল নির্বাচিত</p>
                    <button 
                      onClick={() => setFiles([])}
                      className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    >
                      সব মুছুন
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="truncate">{file.name}</span>
                        <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-600">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button 
                  onClick={() => setIsGenerating(!isGenerating)}
                  disabled={files.length === 0}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'জেনারেট করছে...' : 'জেনারেট করুন'}
                </button>
                <button 
                  disabled={files.length === 0}
                  className="flex-1 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium py-2 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  এক্সপোর্ট করুন
                </button>
              </div>
            </div>

            {/* Results Placeholder */}
            {isGenerating && (
              <div className="mt-6 rounded-lg border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6 text-center">
                <div className="text-slate-600 dark:text-slate-400">
                  <p>ফলাফল শীঘ্রই আসবে...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

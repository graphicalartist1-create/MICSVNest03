import { useState } from "react";
import Header from "@/components/Header";
import GenerationControls from "@/components/GenerationControls";
import FileUpload from "@/components/FileUpload";
import ResultsPanel from "@/components/ResultsPanel";

interface GenerationSettings {
  titleLength: number;
  descriptionLength: number;
  keywordsCount: number;
  imageType: string;
  prefix: boolean;
  suffix: boolean;
  negativeTitle: boolean;
  negativeKeywords: boolean;
  prefixText: string;
  suffixText: string;
  negativeTitleText: string;
  negativeKeywordsText: string;
  platform: string;
  whiteBackground: boolean;
  cameraParameters: boolean;
  promptImageType: string;
  promptCharacterLength: number;
  promptPrefix: boolean;
  promptSuffix: boolean;
  negativePromptWords: boolean;
  promptPrefixText: string;
  promptSuffixText: string;
  negativePromptWordsText: string;
}

interface Result {
  id: string;
  filename: string;
  title: string;
  description: string;
  keywords: string[];
}

const Index = () => {
  const [settings, setSettings] = useState<GenerationSettings>({
    titleLength: 70,
    descriptionLength: 150,
    keywordsCount: 30,
    imageType: "none",
    prefix: false,
    suffix: false,
    negativeTitle: false,
    negativeKeywords: false,
    prefixText: "",
    suffixText: "",
    negativeTitleText: "",
    negativeKeywordsText: "",
    platform: "shutterstock",
    whiteBackground: false,
    cameraParameters: false,
    promptImageType: "none",
    promptCharacterLength: 600,
    promptPrefix: false,
    promptSuffix: false,
    negativePromptWords: false,
    promptPrefixText: "",
    promptSuffixText: "",
    negativePromptWordsText: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (files.length === 0) return;

    setIsGenerating(true);

    // সিমুলেট করা জেনারেশন (বাস্তব অ্যাপে এটি API কল করবে)
    setTimeout(() => {
      const newResults: Result[] = files.map((file, i) => ({
        id: `${Date.now()}-${i}`,
        filename: file.name,
        title: `${file.name.split(".")[0]} - Professional ${settings.imageType || "Image"}`,
        description: `উচ্চ মানের ${settings.imageType || "ইমেজ"} এই ফাইলের জন্য AI দ্বারা উৎপাদিত বর্ণনা। এটি সমস্ত স্টক ফটো প্ল্যাটফর্মের জন্য অপ্টিমাইজ করা হয়েছে এবং সার্চ ইঞ্জিনের জন্য উপযুক্ত।`,
        keywords: [
          "stock",
          "image",
          settings.imageType || "digital",
          "creative",
          "professional",
          "high-quality",
          "metadata",
          "optimized",
        ],
      }));
      setResults(newResults);
      setIsGenerating(false);
    }, 2000);
  };

  const handleExport = () => {
    if (results.length === 0) return;

    const csvContent = [
      ["ফাইলনাম", "শিরোনাম", "বর্ণনা", "কীওয়ার্ড"].join(","),
      ...results.map((r) =>
        [
          r.filename,
          `"${r.title}"`,
          `"${r.description}"`,
          `"${r.keywords.join(", ")}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "metadata-export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
            {/* Left Sidebar - Generation Controls */}
            <div className="lg:col-span-1">
              <GenerationControls settings={settings} onSettingsChange={setSettings} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* File Upload */}
              <FileUpload
                files={files}
                onFilesChange={setFiles}
                onGenerate={handleGenerate}
                onExport={handleExport}
                isGenerating={isGenerating}
              />

              {/* Results */}
              <ResultsPanel
                results={results}
                onUpdateResult={(id, fields) => {
                  setResults((prev) =>
                    prev.map((r) => (r.id === id ? { ...r, ...fields } : r))
                  );
                }}
                onRegenerate={(id) => {
                  console.log("Regenerate:", id);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

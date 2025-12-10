import { useState } from "react";
import { Settings, Type, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GenerationControlsProps {
  settings: {
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
  };
  onSettingsChange: (settings: any) => void;
}

const platforms = [
  { id: "adobe", name: "Adobe Stock" },
  { id: "shutterstock", name: "Shutterstock" },
  { id: "istock", name: "iStock" },
  { id: "freepik", name: "Freepik" },
  { id: "vecteezy", name: "Vecteezy" },
  { id: "pond5", name: "Pond5" },
];

const GenerationControls = ({ settings, onSettingsChange }: GenerationControlsProps) => {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle>Generation Settings</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <Tabs defaultValue="metadata" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metadata" className="flex gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Metadata</span>
            </TabsTrigger>
            <TabsTrigger value="prompt" className="flex gap-2">
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">Prompt</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metadata" className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Export Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => updateSetting("platform", platform.id)}
                    className={`p-2 rounded-lg border text-sm transition-all ${
                      settings.platform === platform.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Title Length</label>
                <span className="text-sm text-primary font-medium">{settings.titleLength} chars</span>
              </div>
              <Slider
                value={[settings.titleLength]}
                onValueChange={([value]) => updateSetting("titleLength", value)}
                max={200}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Description Length</label>
                <span className="text-sm text-primary font-medium">{settings.descriptionLength} chars</span>
              </div>
              <Slider
                value={[settings.descriptionLength]}
                onValueChange={([value]) => updateSetting("descriptionLength", value)}
                max={500}
                min={50}
                step={10}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Keywords Count</label>
                <span className="text-sm text-primary font-medium">{settings.keywordsCount}</span>
              </div>
              <Slider
                value={[settings.keywordsCount]}
                onValueChange={([value]) => updateSetting("keywordsCount", value)}
                max={50}
                min={5}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Image Type</label>
              <Select value={settings.imageType} onValueChange={(value) => updateSetting("imageType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="vector">Vector</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Prefix</label>
                  <Switch
                    checked={settings.prefix}
                    onCheckedChange={(checked) => updateSetting("prefix", checked)}
                  />
                </div>
                {settings.prefix && (
                  <Input
                    placeholder="Enter prefix text..."
                    value={settings.prefixText}
                    onChange={(e) => updateSetting("prefixText", e.target.value)}
                    className="animate-fade-in"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Suffix</label>
                  <Switch
                    checked={settings.suffix}
                    onCheckedChange={(checked) => updateSetting("suffix", checked)}
                  />
                </div>
                {settings.suffix && (
                  <Input
                    placeholder="Enter suffix text..."
                    value={settings.suffixText}
                    onChange={(e) => updateSetting("suffixText", e.target.value)}
                    className="animate-fade-in"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Negative Title Words</label>
                  <Switch
                    checked={settings.negativeTitle}
                    onCheckedChange={(checked) => updateSetting("negativeTitle", checked)}
                  />
                </div>
                {settings.negativeTitle && (
                  <Input
                    placeholder="Words to exclude..."
                    value={settings.negativeTitleText}
                    onChange={(e) => updateSetting("negativeTitleText", e.target.value)}
                    className="animate-fade-in"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Negative Keywords</label>
                  <Switch
                    checked={settings.negativeKeywords}
                    onCheckedChange={(checked) => updateSetting("negativeKeywords", checked)}
                  />
                </div>
                {settings.negativeKeywords && (
                  <Input
                    placeholder="Keywords to exclude..."
                    value={settings.negativeKeywordsText}
                    onChange={(e) => updateSetting("negativeKeywordsText", e.target.value)}
                    className="animate-fade-in"
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prompt" className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">White Background</label>
              <Switch
                checked={settings.whiteBackground}
                onCheckedChange={(checked) => updateSetting("whiteBackground", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Camera Parameters</label>
              <Switch
                checked={settings.cameraParameters}
                onCheckedChange={(checked) => updateSetting("cameraParameters", checked)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Image Type</label>
              <Select value={settings.promptImageType} onValueChange={(value) => updateSetting("promptImageType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="vector">Vector</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Prompt Length</label>
                <span className="text-sm text-primary font-medium">{settings.promptCharacterLength} chars</span>
              </div>
              <Slider
                value={[settings.promptCharacterLength]}
                onValueChange={([value]) => updateSetting("promptCharacterLength", value)}
                max={1000}
                min={100}
                step={50}
                className="w-full"
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Prefix</label>
                  <Switch
                    checked={settings.promptPrefix}
                    onCheckedChange={(checked) => updateSetting("promptPrefix", checked)}
                  />
                </div>
                {settings.promptPrefix && (
                  <Input
                    placeholder="Enter prefix text..."
                    value={settings.promptPrefixText}
                    onChange={(e) => updateSetting("promptPrefixText", e.target.value)}
                    className="animate-fade-in"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Suffix</label>
                  <Switch
                    checked={settings.promptSuffix}
                    onCheckedChange={(checked) => updateSetting("promptSuffix", checked)}
                  />
                </div>
                {settings.promptSuffix && (
                  <Input
                    placeholder="Enter suffix text..."
                    value={settings.promptSuffixText}
                    onChange={(e) => updateSetting("promptSuffixText", e.target.value)}
                    className="animate-fade-in"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Negative Words</label>
                  <Switch
                    checked={settings.negativePromptWords}
                    onCheckedChange={(checked) => updateSetting("negativePromptWords", checked)}
                  />
                </div>
                {settings.negativePromptWords && (
                  <Input
                    placeholder="Words to exclude..."
                    value={settings.negativePromptWordsText}
                    onChange={(e) => updateSetting("negativePromptWordsText", e.target.value)}
                    className="animate-fade-in"
                  />
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GenerationControls;
              {/* Export Platform */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-3 block">
                  Export Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => updateSetting("platform", platform.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        settings.platform === platform.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="text-center text-muted-foreground">
                        <PlatformIcon icon={platform.icon} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-foreground">Title Length</label>
                    <span className="text-sm text-muted-foreground">{settings.titleLength} Characters</span>
                  </div>
                  <Slider
                    value={[settings.titleLength]}
                    onValueChange={([value]) => updateSetting("titleLength", value)}
                    max={200}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-foreground">Description Character Length</label>
                    <span className="text-sm text-muted-foreground">{settings.descriptionLength} Characters (Fixed)</span>
                  </div>
                  <Slider
                    value={[settings.descriptionLength]}
                    onValueChange={([value]) => updateSetting("descriptionLength", value)}
                    max={500}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-foreground">Keywords Count</label>
                    <span className="text-sm text-muted-foreground">{settings.keywordsCount} Keywords</span>
                  </div>
                  <Slider
                    value={[settings.keywordsCount]}
                    onValueChange={([value]) => updateSetting("keywordsCount", value)}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Image Type */}
              <div>
                <label className="text-sm text-foreground mb-2 block">Image Type</label>
                <Select value={settings.imageType} onValueChange={(value) => updateSetting("imageType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="vector">Vector</SelectItem>
                    <SelectItem value="illustration">Illustration</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  If you upload preview file then choose image type vector then it will generate CSV in (EPS, SVG, AI).
                </p>
              </div>

              {/* Toggle Options */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Prefix</label>
                    <Switch
                      checked={settings.prefix}
                      onCheckedChange={(checked) => updateSetting("prefix", checked)}
                    />
                  </div>
                  {settings.prefix && (
                    <Input
                      placeholder="Enter prefix text..."
                      value={settings.prefixText}
                      onChange={(e) => updateSetting("prefixText", e.target.value)}
                      className="animate-fade-in"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Suffix</label>
                    <Switch
                      checked={settings.suffix}
                      onCheckedChange={(checked) => updateSetting("suffix", checked)}
                    />
                  </div>
                  {settings.suffix && (
                    <Input
                      placeholder="Enter suffix text..."
                      value={settings.suffixText}
                      onChange={(e) => updateSetting("suffixText", e.target.value)}
                      className="animate-fade-in"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Negative Words for Title</label>
                    <Switch
                      checked={settings.negativeTitle}
                      onCheckedChange={(checked) => updateSetting("negativeTitle", checked)}
                    />
                  </div>
                  {settings.negativeTitle && (
                    <Input
                      placeholder="Words to exclude from title..."
                      value={settings.negativeTitleText}
                      onChange={(e) => updateSetting("negativeTitleText", e.target.value)}
                      className="animate-fade-in"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Negative Keywords</label>
                    <Switch
                      checked={settings.negativeKeywords}
                      onCheckedChange={(checked) => updateSetting("negativeKeywords", checked)}
                    />
                  </div>
                  {settings.negativeKeywords && (
                    <Input
                      placeholder="Keywords to exclude..."
                      value={settings.negativeKeywordsText}
                      onChange={(e) => updateSetting("negativeKeywordsText", e.target.value)}
                      className="animate-fade-in"
                    />
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Note: You don't have to add "isolated on transparent background" for PNG images; the AI handles this.
              </p>
            </div>
          ) : (
            /* Prompt Tab Content */
            <div className="px-4 pb-4 space-y-6">
              {/* Toggle row */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.whiteBackground}
                    onCheckedChange={(checked) => updateSetting("whiteBackground", checked)}
                  />
                  <label className="text-sm text-foreground">White Background Image</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.cameraParameters}
                    onCheckedChange={(checked) => updateSetting("cameraParameters", checked)}
                  />
                  <label className="text-sm text-foreground">Camera Parameters</label>
                </div>
              </div>

              {/* Image Type */}
              <div>
                <label className="text-sm text-foreground mb-2 block">Image Type</label>
                <Select value={settings.promptImageType} onValueChange={(value) => updateSetting("promptImageType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="vector">Vector</SelectItem>
                    <SelectItem value="illustration">Illustration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Prompt Character Length Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-foreground">Prompt Character Length</label>
                  <span className="text-sm text-primary">{settings.promptCharacterLength} Characters</span>
                </div>
                <Slider
                  value={[settings.promptCharacterLength]}
                  onValueChange={([value]) => updateSetting("promptCharacterLength", value)}
                  max={1000}
                  min={100}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Toggle Options */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Prefix</label>
                    <Switch
                      checked={settings.promptPrefix}
                      onCheckedChange={(checked) => updateSetting("promptPrefix", checked)}
                    />
                  </div>
                  {settings.promptPrefix && (
                    <Input
                      placeholder="Enter prefix text..."
                      value={settings.promptPrefixText}
                      onChange={(e) => updateSetting("promptPrefixText", e.target.value)}
                      className="animate-fade-in"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Suffix</label>
                    <Switch
                      checked={settings.promptSuffix}
                      onCheckedChange={(checked) => updateSetting("promptSuffix", checked)}
                    />
                  </div>
                  {settings.promptSuffix && (
                    <Input
                      placeholder="Enter suffix text..."
                      value={settings.promptSuffixText}
                      onChange={(e) => updateSetting("promptSuffixText", e.target.value)}
                      className="animate-fade-in"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-foreground">Negative Prompt Words</label>
                    <Switch
                      checked={settings.negativePromptWords}
                      onCheckedChange={(checked) => updateSetting("negativePromptWords", checked)}
                    />
                  </div>
                  {settings.negativePromptWords && (
                    <Input
                      placeholder="Words to exclude from prompt..."
                      value={settings.negativePromptWordsText}
                      onChange={(e) => updateSetting("negativePromptWordsText", e.target.value)}
                      className="animate-fade-in"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GenerationControls;

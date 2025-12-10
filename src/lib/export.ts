export interface ExportResult {
  id: string;
  filename: string;
  title: string;
  description: string;
  keywords: string[];
}

/**
 * CSV এ রপ্তানি করুন
 */
export function exportToCSV(results: ExportResult[]) {
  const headers = ['ফাইলনাম', 'শিরোনাম', 'বর্ণনা', 'কীওয়ার্ড'];
  
  const rows = results.map(r => [
    r.filename,
    `"${r.title}"`,
    `"${r.description}"`,
    `"${r.keywords.join(', ')}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `metadata-export-${Date.now()}.csv`;
  link.click();
}

/**
 * JSON এ রপ্তানি করুন
 */
export function exportToJSON(results: ExportResult[]) {
  const jsonContent = JSON.stringify(results, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `metadata-export-${Date.now()}.json`;
  link.click();
}

/**
 * সব ফলাফল কপি করুন ক্লিপবোর্ডে
 */
export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

/**
 * ডাউনলোড করুন (জেনেরিক)
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

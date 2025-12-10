/**
 * মকড জেনারেটর - বাস্তব API এর স্থানে ব্যবহার করুন
 */

export interface GeneratorSettings {
  titleLength: number;
  descriptionLength: number;
  keywordsCount: number;
  imageType: string;
  platform: string;
  prefix: boolean;
  suffix: boolean;
  negativeTitle: boolean;
  negativeKeywords: boolean;
  prefixText?: string;
  suffixText?: string;
  negativeTitleText?: string;
  negativeKeywordsText?: string;
}

export interface GeneratedMetadata {
  title: string;
  description: string;
  keywords: string[];
}

const titleKeywords = [
  'পেশাদার',
  'উচ্চ মানের',
  'স্টক',
  'ডিজিটাল',
  'সৃজনশীল',
  'আধুনিক',
  'অনন্য',
  'আকর্ষণীয়',
];

const descriptionTemplates = [
  'এই {type} হল {platform} এর জন্য অপ্টিমাইজ করা একটি পেশাদার {quality} মানের আইটেম।',
  '{type} যা সমস্ত স্টক ফটো প্ল্যাটফর্মের জন্য উপযুক্ত এবং সার্চ ইঞ্জিনের জন্য সম্পূর্ণভাবে অপ্টিমাইজ করা।',
  'এটি একটি {quality} {type} যা {platform} এ বিক্রয় বৃদ্ধির জন্য ডিজাইন করা হয়েছে।',
];

/**
 * মেটাডেটা জেনারেট করুন
 */
export function generateMetadata(
  filename: string,
  settings: GeneratorSettings
): GeneratedMetadata {
  const baseTitle = filename.split('.')[0];
  const type = settings.imageType || 'ছবি';
  const platform = settings.platform || 'সব প্ল্যাটফর্ম';
  const quality = 'পেশাদার মানের';

  // শিরোনাম তৈরি করুন
  let title = `${baseTitle} - ${type} - ${quality}`;
  if (settings.prefix && settings.prefixText) {
    title = `${settings.prefixText} ${title}`;
  }
  if (settings.suffix && settings.suffixText) {
    title = `${title} ${settings.suffixText}`;
  }
  title = title.slice(0, settings.titleLength);

  // বর্ণনা তৈরি করুন
  const template =
    descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
  let description = template
    .replace('{type}', type)
    .replace('{platform}', platform)
    .replace('{quality}', quality);

  if (settings.negativeTitle && settings.negativeTitleText) {
    description = `${description} ${settings.negativeTitleText}`;
  }

  description = description.slice(0, settings.descriptionLength);

  // কীওয়ার্ড তৈরি করুন
  const keywords: string[] = [];
  const baseKeywords = [
    type.toLowerCase(),
    platform.toLowerCase(),
    'stock',
    'image',
    'creative',
    'professional',
    'high-quality',
  ];

  for (let i = 0; i < settings.keywordsCount && keywords.length < settings.keywordsCount; i++) {
    const randomKeyword =
      titleKeywords[Math.floor(Math.random() * titleKeywords.length)];
    if (!keywords.includes(randomKeyword)) {
      keywords.push(randomKeyword);
    }
  }

  // বেস কীওয়ার্ড যোগ করুন
  for (const kw of baseKeywords) {
    if (keywords.length < settings.keywordsCount && !keywords.includes(kw)) {
      keywords.push(kw);
    }
  }

  if (settings.negativeKeywords && settings.negativeKeywordsText) {
    const negativeWords = settings.negativeKeywordsText.split(',').map(w => w.trim());
    keywords.push(...negativeWords.slice(0, 3));
  }

  return {
    title,
    description,
    keywords: keywords.slice(0, settings.keywordsCount),
  };
}

/**
 * ব্যাচ মেটাডেটা জেনারেট করুন
 */
export function generateBatchMetadata(
  filenames: string[],
  settings: GeneratorSettings
): Record<string, GeneratedMetadata> {
  return Object.fromEntries(
    filenames.map(filename => [
      filename,
      generateMetadata(filename, settings),
    ])
  );
}

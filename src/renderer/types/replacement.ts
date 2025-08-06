export interface ReplacementRule {
  id: string;
  original: string;
  replacement: string;
  isEnabled: boolean;
  isRegex: boolean;
  caseSensitive: boolean;
  description?: string;
}

export interface ReplacementResult {
  originalCode: string;
  replacedCode: string;
  replacements: Array<{
    original: string;
    replacement: string;
    count: number;
  }>;
} 
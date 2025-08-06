import { ReplacementRule, ReplacementResult } from '../types/replacement';

export function applyReplacements(
  code: string,
  rules: ReplacementRule[]
): ReplacementResult {
  let replacedCode = code;
  const replacements: ReplacementResult['replacements'] = [];

  // 활성화된 규칙만 필터링
  const activeRules = rules.filter(rule => rule.isEnabled);

  for (const rule of activeRules) {
    if (!rule.original.trim()) continue;

    let searchPattern: string | RegExp;
    let flags = '';

    if (rule.isRegex) {
      // 정규표현식 모드
      try {
        flags = rule.caseSensitive ? 'g' : 'gi';
        searchPattern = new RegExp(rule.original, flags);
      } catch (error) {
        console.warn('Invalid regex pattern:', rule.original);
        continue;
      }
    } else {
      // 일반 텍스트 모드
      flags = rule.caseSensitive ? 'g' : 'gi';
      searchPattern = new RegExp(escapeRegExp(rule.original), flags);
    }

    // 치환 실행
    const matches = replacedCode.match(searchPattern);
    if (matches) {
      const count = matches.length;
      replacedCode = replacedCode.replace(searchPattern, rule.replacement);
      
      replacements.push({
        original: rule.original,
        replacement: rule.replacement,
        count
      });
    }
  }

  return {
    originalCode: code,
    replacedCode,
    replacements
  };
}

// 정규표현식 특수문자 이스케이프
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 기본 치환 규칙들 생성
export function getDefaultRules(): ReplacementRule[] {
  return [
    {
      id: '1',
      original: 'apiKey',
      replacement: 'dummyApiKey',
      isEnabled: true,
      isRegex: false,
      caseSensitive: false,
      description: 'API 키 치환'
    },
    {
      id: '2',
      original: 'password',
      replacement: 'dummyPassword',
      isEnabled: true,
      isRegex: false,
      caseSensitive: false,
      description: '비밀번호 치환'
    },
    {
      id: '3',
      original: 'secret',
      replacement: 'dummySecret',
      isEnabled: true,
      isRegex: false,
      caseSensitive: false,
      description: '시크릿 키 치환'
    },
    {
      id: '4',
      original: 'token',
      replacement: 'dummyToken',
      isEnabled: true,
      isRegex: false,
      caseSensitive: false,
      description: '토큰 치환'
    },
    {
      id: '5',
      original: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',
      replacement: 'dummy@example.com',
      isEnabled: true,
      isRegex: true,
      caseSensitive: false,
      description: '이메일 주소 치환'
    }
  ];
} 
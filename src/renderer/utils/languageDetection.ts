export function detectLanguageByContent(code: string): string {
  const patterns = [
    // Java (JavaScript보다 먼저 체크)
    { pattern: /^(public class|import java|package |public static|private |protected )/m, language: 'java' },
    { pattern: /^(public static void main|System\.out\.println|ArrayList|HashMap)/m, language: 'java' },
    { pattern: /^(@Override|@Deprecated|@SuppressWarnings|@FunctionalInterface)/m, language: 'java' },
    
    // Python
    { pattern: /^(def |class |import |from |if __name__|print\(|return)/m, language: 'python' },
    { pattern: /^(import numpy|import pandas|import matplotlib|import requests)/m, language: 'python' },
    { pattern: /^(def __init__|self\.|@property|@staticmethod)/m, language: 'python' },
    
    // JavaScript/TypeScript
    { pattern: /^(import|export|const|let|var|function|class|interface|type|enum)/m, language: 'javascript' },
    { pattern: /^(console\.|document\.|window\.|localStorage\.|sessionStorage\.)/m, language: 'javascript' },
    { pattern: /^(async |await |Promise|fetch|axios)/m, language: 'javascript' },
    
    // HTML
    { pattern: /^(<!DOCTYPE|<html|<head|<body|<div|<span|<p|<h[1-6])/m, language: 'html' },
    { pattern: /^(<script|<style|<link|<meta|<title)/m, language: 'html' },
    
    // CSS
    { pattern: /^(\.|#|@media|@import|@keyframes|@font-face)/m, language: 'css' },
    { pattern: /^(body|div|span|p|h[1-6]|\.|#)\s*\{/m, language: 'css' },
    
    // SQL
    { pattern: /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|GRANT|REVOKE)/i, language: 'sql' },
    { pattern: /^(FROM|WHERE|GROUP BY|ORDER BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN)/i, language: 'sql' },
    
    // PHP
    { pattern: /^(<?php|function |class |namespace |use |require|include)/m, language: 'php' },
    { pattern: /^(\$[a-zA-Z_][a-zA-Z0-9_]*|echo |print |var_dump)/m, language: 'php' },
    
    // Go
    { pattern: /^(package |import |func |var |type |struct |interface |map\[)/m, language: 'go' },
    { pattern: /^(fmt\.|os\.|io\.|bufio\.|strings\.|strconv\.)/m, language: 'go' },
    
    // Rust
    { pattern: /^(fn |let |struct |impl |use |mod |pub |extern |unsafe)/m, language: 'rust' },
    { pattern: /^(println!|vec!|Option|Result|Box|Rc|Arc)/m, language: 'rust' },
    
    // C/C++
    { pattern: /^(#include|#define|#ifdef|#endif|int main|printf|scanf)/m, language: 'cpp' },
    { pattern: /^(std::|cout|cin|endl|vector|string|map|set)/m, language: 'cpp' },
    
    // Ruby
    { pattern: /^(def |class |module |require |include |attr_accessor)/m, language: 'ruby' },
    { pattern: /^(puts |print |gets |chomp|to_s|to_i|to_f)/m, language: 'ruby' },
    
    // Swift
    { pattern: /^(import |func |class |struct |enum |protocol |var |let)/m, language: 'swift' },
    { pattern: /^(print\(|String|Int|Double|Bool|Array|Dictionary)/m, language: 'swift' },
    
    // Kotlin
    { pattern: /^(fun |class |object |interface |data class|companion object)/m, language: 'kotlin' },
    { pattern: /^(println|var |val |String|Int|Double|Boolean|List|Map)/m, language: 'kotlin' },
    
    // Shell/Bash
    { pattern: /^(#!\/bin\/bash|#!\/bin\/sh|echo |export |source |\.\/)/m, language: 'bash' },
    { pattern: /^(if \[|then|else|fi|for |while |do|done)/m, language: 'bash' },
    
    // JSON
    { pattern: /^(\s*\{|\s*\[|\s*"[^"]*"\s*:)/m, language: 'json' },
    
    // XML
    { pattern: /^(<\?xml|<[a-zA-Z][a-zA-Z0-9]*>|<\/[a-zA-Z][a-zA-Z0-9]*>)/m, language: 'xml' },
    
    // Markdown
    { pattern: /^(# |## |### |#### |##### |###### |\*\*|\*|`|```)/m, language: 'markdown' },
    { pattern: /^(\[.*\]\(.*\)|!\[.*\]\(.*\)|> |\|.*\|)/m, language: 'markdown' },
    
    // YAML
    { pattern: /^(---|apiVersion:|kind:|metadata:|spec:|- |: )/m, language: 'yaml' },
    
    // Dockerfile
    { pattern: /^(FROM |RUN |CMD |ENTRYPOINT |EXPOSE |ENV |COPY |ADD |WORKDIR)/m, language: 'dockerfile' },
    
    // Git
    { pattern: /^(commit |Author:|Date:|diff --git|index |---|\+\+\+)/m, language: 'git' }
  ];
  
  // 빈 코드는 text로 반환
  if (!code.trim()) {
    return 'text';
  }
  
  // 각 패턴을 순서대로 확인
  for (const { pattern, language } of patterns) {
    if (pattern.test(code)) {
      return language;
    }
  }
  
  // 기본값
  return 'text';
}

// 언어별 색상 매핑
export const languageColors: Record<string, string> = {
  javascript: '#f1c40f',
  python: '#3776ab',
  java: '#b07219',
  html: '#e34c26',
  css: '#1572b6',
  sql: '#336791',
  php: '#777bb4',
  go: '#00add8',
  rust: '#dea584',
  cpp: '#f34b7d',
  ruby: '#cc342d',
  swift: '#ffac45',
  kotlin: '#f18e33',
  bash: '#4eaa25',
  json: '#000000',
  xml: '#f0f0f0',
  markdown: '#083fa1',
  yaml: '#cb171e',
  dockerfile: '#2496ed',
  git: '#f05032',
  text: '#6c757d'
}; 
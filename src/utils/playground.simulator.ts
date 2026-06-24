import type { IPlaygroundConfig, IPlaygroundPattern } from '../types';

export interface ISimulatorResult {
  lines: IOutputLine[];
  success: boolean;
}

export interface IOutputLine {
  text: string;
  delay: number;
  type: 'output' | 'success' | 'error' | 'info';
}

function matchesPattern(code: string, pattern: IPlaygroundPattern): boolean {
  try {
    const flags = pattern.regex.startsWith('/') ? 'gi' : 'i';
    const regexStr = pattern.regex.startsWith('/') ? pattern.regex.slice(1, pattern.regex.lastIndexOf('/')) : pattern.regex;
    const regex = new RegExp(regexStr, flags);
    return regex.test(code);
  } catch {
    return false;
  }
}

function extractConsoleStatements(code: string): string[] {
  const lines: string[] = [];
  const consoleLogRegex = /console\.log\(([^)]+)\)/g;
  let match;
  while ((match = consoleLogRegex.exec(code)) !== null) {
    const arg = match[1].trim();
    // Simple extraction for template literals and strings
    if (arg.startsWith('`') && arg.endsWith('`')) {
      const simplified = arg
        .slice(1, -1)
        .replace(/\$\{[^}]+\}/g, '<value>')
        .trim();
      if (simplified) lines.push(simplified);
    } else if ((arg.startsWith("'") && arg.endsWith("'")) || (arg.startsWith('"') && arg.endsWith('"'))) {
      lines.push(arg.slice(1, -1));
    } else if (arg.includes('+')) {
      // Basic string concatenation hint
      lines.push(arg.replace(/['"]/g, '').replace(/\s*\+\s*/g, ' ').trim());
    }
  }
  return lines.slice(0, 6);
}

export function simulatePlayground(code: string, config: IPlaygroundConfig): ISimulatorResult {
  const outputLines: IOutputLine[] = [];
  let cumulativeDelay = 100;
  const matchedPatterns = new Set<number>();

  // Match patterns from config
  config.patterns.forEach((pattern, index) => {
    if (matchesPattern(code, pattern)) {
      matchedPatterns.add(index);
      pattern.outputLines.forEach((line, lineIndex) => {
        outputLines.push({
          text: line,
          delay: cumulativeDelay + lineIndex * 150 + (pattern.delay ?? 0),
          type: line.startsWith('✓') || line.startsWith('✅') ? 'success' : 'output',
        });
      });
      cumulativeDelay += pattern.outputLines.length * 150 + 200;
    }
  });

  // Extract simple console.log statements for simulation
  const consoleLines = extractConsoleStatements(code);
  consoleLines.forEach((line, index) => {
    outputLines.push({
      text: '> ' + line,
      delay: cumulativeDelay + index * 120,
      type: 'output',
    });
  });
  cumulativeDelay += consoleLines.length * 120 + 100;

  // Determine success: at least one pattern matched, or code is non-trivial
  const hasCode = code.trim().length > 30;
  const patternsMatched = matchedPatterns.size > 0;
  const success = hasCode && (patternsMatched || consoleLines.length > 0);

  if (success && patternsMatched) {
    outputLines.push({
      text: config.successMessage,
      delay: cumulativeDelay + 200,
      type: 'success',
    });
  } else if (hasCode && !patternsMatched && code.trim().length > 30) {
    outputLines.push({
      text: '> Code running... try adding some of the patterns from the hints!',
      delay: cumulativeDelay,
      type: 'info',
    });
  }

  // Sort by delay
  outputLines.sort((a, b) => a.delay - b.delay);

  return { lines: outputLines, success };
}

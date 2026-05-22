export class StringUtil {
  /** Prepositions → lowercase */
  private static readonly PREPOSITIONS = new Set([
    'to',
    'and',
    'of',
    'for',
    'in',
    'on',
    'at',
    'with',
    'by',
    'from',
    'as',
    'per',
    'via',
    'under',
    'over',
    'into',
    'onto',
  ]);

  /** Roman numerals → UPPERCASE */
  private static readonly ROMAN_REGEX =
    /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV)$/i;

  /** Acronyms that must be FULL UPPERCASE (≤5 letters) */
  private static readonly ACRONYMS = new Set([
    // === IT & Tech ===
    'it',
    'hr',
    'cmd',
    'ceo',
    'cfo',
    'coo',
    'crm',
    'cto',
    'sde',
    'qa',
    'ui',
    'ux',
    'api',
    'db',
    'l1',
    'l2',
    'l3',

    // === NBFC & Finance ===
    'nbfc',
    'kyc',
    'aml',
    'cibil',
    'rbi',
    'sebi',
    'irdai',
    'gst',
    'gstin',
    'pf',
    'esop',
    'nps',
    'ppf',
    'fd',
    'rd',
    'nri',
    'fema',
    'fatca',
    'crisil',
    'icra',
    'care',
    'ipo',
    'casa',
    'dsa',
    'npa',
    'lar',
    'bca',
    'bdo',
    'forex',

    // === Vehicle Finance ===
    'tw',
    'cv',
    'hl',
    'pl',
    'bl',
    'mfcl',
    'mcl',
  ]);

  static formatRole(
    rawName: string,
    prefix: string,
    fallbackRaw?: string,
    fallbackMsg = 'No Job Permissions',
  ): string {
    if (!rawName) return '';

    //  Fallback handling
    if (fallbackRaw && rawName === fallbackRaw) {
      return fallbackMsg;
    }

    //  Strip prefix
    const withoutPrefix = rawName.startsWith(prefix)
      ? rawName.slice(prefix.length)
      : rawName;

    //  Capitalize the whole string (handles parentheses, prepositions, etc.)
    return StringUtil.capitalize(withoutPrefix);
  }

  /**
   * Core capitalization logic – works on any string.
   * Keeps parentheses, prepositions, roman numerals, acronyms, etc. correct.
   */
  private static capitalize(text: string): string {
    if (!text) return '';
    text = text.replace(/_/g, ' ');

    // Split while preserving parentheses as single tokens
    const parts = text.split(/(\([^)]+\))/);

    return parts
      .map((part) => {
        //  Parenthetical part
        if (part.startsWith('(') && part.endsWith(')')) {
          const inner = part.slice(1, -1).trim();
          if (!inner) return part; // empty ( )
          return `(${StringUtil.capitalizeInner(inner)})`;
        }

        // Normal part (space-separated)
        return part
          .split(/\s+/)
          .map((word) => StringUtil.capitalizeWord(word))
          .join(' ');
      })
      .join('');
  }

  /** Capitalize a single word */
  private static capitalizeWord(word: string): string {
    if (!word) return word;

    const lower = word.toLowerCase();

    // 1. Alphanumeric: SDE3, TW2, MCL1
    const alphaNum = word.match(/^([a-z]+)(\d+)$/i);
    if (alphaNum) {
      const [, letters, digits] = alphaNum;
      const l = letters.toLowerCase();
      if (StringUtil.ACRONYMS.has(l)) {
        return `${letters.toUpperCase()}${digits}`;
      }
      return `${letters.charAt(0).toUpperCase()}${letters.slice(1).toLowerCase()}${digits}`;
    }

    // 2. Known acronym → FULL UPPERCASE
    if (word.length <= 5 && StringUtil.ACRONYMS.has(lower)) {
      return word.toUpperCase();
    }

    // 3. Roman numerals
    if (StringUtil.ROMAN_REGEX.test(word)) {
      return word.toUpperCase();
    }

    // 4. Prepositions
    if (StringUtil.PREPOSITIONS.has(lower)) {
      return word.toLowerCase();
    }

    // 5. Normal word → Title Case
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  /** Helper used for text inside parentheses */
  private static capitalizeInner(inner: string): string {
    return inner
      .split(/\s+/)
      .map((w) => StringUtil.capitalizeWord(w))
      .join(' ');
  }

  // Optional tiny helpers (kept for backward compatibility)
  static hasPrefix(value: string, prefix: string): boolean {
    return value.startsWith(prefix);
  }

  static removePrefix(value: string, prefix: string): string {
    return value.startsWith(prefix) ? value.slice(prefix.length) : value;
  }
}

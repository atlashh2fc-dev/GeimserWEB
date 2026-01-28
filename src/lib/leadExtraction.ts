export type LeadInfo = {
  nombre?: string;
  correo?: string;
  telefono?: string;
  empresa?: string;
};

const DEFAULT_IGNORED_EMAILS = new Set([
  'contacto@geimser.cl',
  'geimserbot@geimser.cl',
]);

function uniq<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function extractEmails(text: string, ignored = DEFAULT_IGNORED_EMAILS): string[] {
  const matches =
    text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) ?? [];
  const normalized = matches
    .map((e) => e.trim())
    .filter(Boolean)
    .filter((e) => !ignored.has(normalizeEmail(e)));
  return uniq(normalized);
}

export function extractPhones(text: string): string[] {
  const candidates =
    text.match(/(?:\+?\d[\d\s().-]{6,}\d)/g)?.map((x) => x.trim()) ?? [];

  const normalized = candidates
    .map((raw) => {
      const hasPlus = raw.trim().startsWith('+');
      const digitsOnly = raw.replace(/[^\d]/g, '');
      if (digitsOnly.length < 8 || digitsOnly.length > 15) return null;
      return hasPlus ? `+${digitsOnly}` : digitsOnly;
    })
    .filter((x): x is string => Boolean(x));

  return uniq(normalized);
}

export function extractLeadFromMessages(
  messages: Array<{ role: string; content: string }>,
): LeadInfo {
  const userText = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join('\n');

  const correo = extractEmails(userText)[0];
  const telefono = extractPhones(userText)[0];

  return {
    correo,
    telefono,
  };
}


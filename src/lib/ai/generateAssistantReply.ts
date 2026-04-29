import 'server-only';

import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type AiProvider = 'openai' | 'gemini';

type GenerateAssistantReplyInput = {
  systemPrompt: string;
  messages: ChatMessage[];
};

type GenerateAssistantReplyOutput = {
  provider: AiProvider;
  model: string;
  content: string;
  fallbackFrom?: AiProvider;
};

function normalizeProvider(value: string | undefined | null): AiProvider | 'auto' | null {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  if (v === 'auto') return 'auto';
  if (v === 'openai') return 'openai';
  if (v === 'gemini') return 'gemini';
  return null;
}

function pickFallbackProvider(): AiProvider | null {
  const raw = (process.env.AI_FALLBACK_PROVIDER ?? '').trim().toLowerCase();
  if (!raw || raw === 'none' || raw === 'false' || raw === '0') return null;
  if (raw === 'openai') return 'openai';
  if (raw === 'gemini') return 'gemini';
  return null;
}

function pickProvider(): AiProvider {
  return 'openai'; // Enforced to use InceptionLabs mercury-2
}

export function getAiProviderInfo(): {
  configuredProvider: AiProvider | 'auto';
  resolvedProvider: AiProvider;
  hasGeminiKey: boolean;
  hasOpenAIKey: boolean;
  geminiModel: string;
  openaiModel: string;
} {
  const configured =
    normalizeProvider(process.env.AI_PROVIDER) ?? 'auto';
  const resolvedProvider = pickProvider();
  return {
    configuredProvider: configured === 'auto' ? 'auto' : configured,
    resolvedProvider,
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
    geminiModel: process.env.GEMINI_MODEL ?? 'gemini-2.0-flash',
    openaiModel: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  };
}

function requireEnv(name: string, provider: AiProvider): string {
  const value = process.env[name];
  if (!value) {
    throw Object.assign(new Error(`${name} no configurado para provider=${provider}`), {
      code: 'MISSING_API_KEY',
      provider,
    });
  }
  return value;
}

function toGeminiRole(role: ChatMessage['role']): 'user' | 'model' {
  return role === 'assistant' ? 'model' : 'user';
}

function isQuotaOrRateLimitError(err: any): boolean {
  const status = err?.status;
  const code = err?.code;
  const message = String(err?.message ?? '');
  return (
    status === 429 ||
    code === 'insufficient_quota' ||
    /quota/i.test(message) ||
    /rate limit/i.test(message) ||
    /resource_exhausted/i.test(message)
  );
}

async function generateWithOpenAI(input: GenerateAssistantReplyInput): Promise<string> {
  // Use InceptionLabs API via OpenAI SDK
  const apiKey = process.env.INCEPTION_API_KEY || process.env.OPENAI_API_KEY || '';
  const openai = new OpenAI({ 
    apiKey, 
    baseURL: "https://api.inceptionlabs.ai/v1" 
  });

  const model = "mercury-2";

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: input.systemPrompt },
      ...input.messages.map((m) => ({ role: m.role, content: m.content })) as any,
    ],
    temperature: 0.8,
    max_tokens: 600,
  });

  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) {
    throw Object.assign(new Error('Respuesta vacía de OpenAI'), { code: 'EMPTY_RESPONSE', provider: 'openai' });
  }
  return content;
}

async function generateWithGemini(input: GenerateAssistantReplyInput): Promise<string> {
  const apiKey = requireEnv('GEMINI_API_KEY', 'gemini');
  const ai = new GoogleGenAI({ apiKey });

  const model = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
  const contents = input.messages.map((m) => ({
    role: toGeminiRole(m.role),
    parts: [{ text: m.content }],
  }));

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: input.systemPrompt,
      temperature: 0.8,
      maxOutputTokens: 600,
      presencePenalty: 0.2,
      frequencyPenalty: 0.1,
    },
  });

  const text = response.text?.trim();
  if (!text) {
    throw Object.assign(new Error('Respuesta vacía de Gemini'), { code: 'EMPTY_RESPONSE', provider: 'gemini' });
  }
  return text;
}

export async function generateAssistantReply(
  input: GenerateAssistantReplyInput,
): Promise<GenerateAssistantReplyOutput> {
  try {
    const model = "mercury-2";
    const content = await generateWithOpenAI(input);
    return { provider: 'openai', model, content };
  } catch (err: any) {
    if (err && typeof err === 'object') {
      if (!('provider' in err)) err.provider = 'openai';
      if (!('model' in err)) err.model = 'mercury-2';
    }
    throw err;
  }
}

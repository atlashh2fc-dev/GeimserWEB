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

function normalizeProvider(value: string | undefined | null): AiProvider | 'auto' | null {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  if (v === 'auto') return 'auto';
  if (v === 'openai') return 'openai';
  if (v === 'gemini') return 'gemini';
  return null;
}

function pickProvider(): AiProvider {
  const forced = normalizeProvider(process.env.AI_PROVIDER);
  if (forced && forced !== 'auto') return forced;
  if (process.env.GEMINI_API_KEY) return 'gemini';
  return 'openai';
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

async function generateWithOpenAI(input: GenerateAssistantReplyInput): Promise<string> {
  const apiKey = requireEnv('OPENAI_API_KEY', 'openai');
  const openai = new OpenAI({ apiKey });

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: input.systemPrompt },
      ...input.messages.map((m) => ({ role: m.role, content: m.content })) as any,
    ],
    temperature: 0.8,
    max_tokens: 600,
    presence_penalty: 0.2,
    frequency_penalty: 0.1,
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

export async function generateAssistantReply(input: GenerateAssistantReplyInput): Promise<{
  provider: AiProvider;
  model: string;
  content: string;
}> {
  const provider = pickProvider();

  try {
    if (provider === 'gemini') {
      const model = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
      const content = await generateWithGemini(input);
      return { provider, model, content };
    }

    const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
    const content = await generateWithOpenAI(input);
    return { provider, model, content };
  } catch (err: any) {
    const model =
      provider === 'gemini'
        ? process.env.GEMINI_MODEL ?? 'gemini-2.0-flash'
        : process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

    if (err && typeof err === 'object') {
      if (!('provider' in err)) err.provider = provider;
      if (!('model' in err)) err.model = model;
    }
    throw err;
  }
}

import { create } from 'zustand';

type Role = 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

interface ChatStore {
  messages: Message[];
  collectedData: Record<string, string>;
  addMessage: (msg: Message) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [
    {
      role: 'assistant',
      content: 'Hola 👋 Soy parte del equipo Geimser. Cuéntame qué necesitas y me encargaré de derivarlo al equipo comercial correcto.',
    },
  ],
  collectedData: {},
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, msg],
  })),
  resetChat: () =>
    set({
      messages: [
        {
          role: 'assistant',
          content: 'Hola 👋 Soy parte del equipo Geimser. Cuéntame qué necesitas y me encargaré de derivarlo al equipo comercial correcto.',
        },
      ],
      collectedData: {},
    }),
}));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'user' | 'assistant';

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

interface LeadData {
  nombre?: string;
  correo?: string;
  telefono?: string;
  empresa?: string;
  requerimiento?: string;
}

interface ChatStore {
  messages: Message[];
  collectedData: LeadData;
  isTyping: boolean;
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  updateCollectedData: (data: Partial<LeadData>) => void;
  setTyping: (typing: boolean) => void;
  resetChat: () => void;
  clearHistory: () => void;
}

const initialMessage: Omit<Message, 'id' | 'timestamp'> = {
  role: 'assistant',
  content: 'Hola 👋 Soy parte del equipo Geimser. Cuéntame qué necesitas y me encargaré de derivarlo al equipo comercial correcto.',
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: crypto.randomUUID(),
          ...initialMessage,
          timestamp: new Date(),
        },
      ],
      collectedData: {},
      isTyping: false,

      addMessage: (msg) => {
        const newMessage: Message = {
          id: crypto.randomUUID(),
          ...msg,
          timestamp: new Date(),
        };
        
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      updateCollectedData: (data) => {
        set((state) => ({
          collectedData: { ...state.collectedData, ...data },
        }));
      },

      setTyping: (typing) => {
        set({ isTyping: typing });
      },

      resetChat: () => {
        set({
          messages: [
            {
              id: crypto.randomUUID(),
              ...initialMessage,
              timestamp: new Date(),
            },
          ],
          collectedData: {},
          isTyping: false,
        });
      },

      clearHistory: () => {
        set({
          messages: [],
          collectedData: {},
          isTyping: false,
        });
      },
    }),
    {
      name: 'geimser-chat-storage',
      partialize: (state) => ({
        messages: state.messages,
        collectedData: state.collectedData,
      }),
    }
  )
);

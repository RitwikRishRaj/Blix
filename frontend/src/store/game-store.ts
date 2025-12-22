import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { assignEmojiToElement } from '@/lib/emoji-utils'

export interface Element {
  id: string
  name: string
  emoji: string
  isBasic: boolean
  x?: number
  y?: number
}

interface GameState {
  discoveredElements: Element[]
  workspaceElements: Element[]
  isLoading: boolean
  craftingSlot1: Element | null
  craftingSlot2: Element | null
  isDarkMode: boolean
}

interface GameActions {
  addDiscoveredElement: (element: Element) => void
  addWorkspaceElement: (element: Element) => void
  removeWorkspaceElement: (elementId: string) => void
  updateElementPosition: (elementId: string, x: number, y: number) => void
  setCraftingSlot1: (element: Element | null) => void
  setCraftingSlot2: (element: Element | null) => void
  clearCraftingSlots: () => void
  clearWorkspace: () => void
  resetGame: () => void
  setLoading: (loading: boolean) => void
  toggleDarkMode: () => void
}

type GameStore = GameState & GameActions
// defining basic elements of the Life! hehe
const basicElements: Element[] = [
  { id: 'water', name: 'Water', emoji: '💧', isBasic: true },
  { id: 'fire', name: 'Fire', emoji: '🔥', isBasic: true },
  { id: 'wind', name: 'Wind', emoji: '💨', isBasic: true },
  { id: 'earth', name: 'Earth', emoji: '🌍', isBasic: true },
]

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      // Initial state
      discoveredElements: basicElements,
      workspaceElements: [],
      isLoading: false,
      craftingSlot1: null,
      craftingSlot2: null,
      isDarkMode: false,

      // Actions
      addDiscoveredElement: (element) =>
        set((state) => {
          const exists = state.discoveredElements.some(e => e.name.toLowerCase() === element.name.toLowerCase())
          if (exists) return state
          
          const elementWithEmoji = element.emoji 
            ? element 
            : { ...element, ...assignEmojiToElement(element.name) }
          
          return {
            discoveredElements: [...state.discoveredElements, elementWithEmoji],
          }
        }),

      addWorkspaceElement: (element) =>
        set((state) => {
          const elementWithEmoji = element.emoji 
            ? element 
            : { ...element, ...assignEmojiToElement(element.name) }
          
          return {
            workspaceElements: [...state.workspaceElements, { ...elementWithEmoji, id: `${element.id}-${Date.now()}` }],
          }
        }),

      removeWorkspaceElement: (elementId) =>
        set((state) => ({
          workspaceElements: state.workspaceElements.filter(
            (element) => element.id !== elementId
          ),
        })),

      updateElementPosition: (elementId, x, y) =>
        set((state) => ({
          workspaceElements: state.workspaceElements.map((element) =>
            element.id === elementId ? { ...element, x, y } : element
          ),
        })),

      setCraftingSlot1: (element) =>
        set(() => ({
          craftingSlot1: element,
        })),

      setCraftingSlot2: (element) =>
        set(() => ({
          craftingSlot2: element,
        })),

      clearCraftingSlots: () =>
        set(() => ({
          craftingSlot1: null,
          craftingSlot2: null,
        })),

      clearWorkspace: () =>
        set(() => ({
          workspaceElements: [],
        })),

      resetGame: () =>
        set(() => ({
          discoveredElements: basicElements,
          workspaceElements: [],
          isLoading: false,
          craftingSlot1: null,
          craftingSlot2: null,
        })),

      setLoading: (loading) =>
        set(() => ({
          isLoading: loading,
        })),

      toggleDarkMode: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: 'blix-game-storage',
      partialize: (state) => ({
        // Only persist these fields
        discoveredElements: state.discoveredElements,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
)

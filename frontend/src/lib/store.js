import { create } from 'zustand'
export const useAppStore = create((set)=> ({
  psr: [], setPSR: (rows)=>set({psr: rows}),
  chat: [], addChat: (m)=>set(s=>({chat:[...s.chat, m]}))
}))

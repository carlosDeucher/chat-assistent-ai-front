import { create } from "zustand";

type ICompany = {
  name: string
  id: string
}

interface ChatState {
  companyIsLoading: boolean
  setCompanyIsLoading: (isLoading: boolean) => void
  company: ICompany | null
  setCompany: (company: any) => void
  companyError: any
  setCompanyError: (error: any) => void
}

export const chatStore = create<ChatState>((set) => ({
  companyIsLoading: true,
  setCompanyIsLoading: (isLoading: boolean) =>
    set(() => ({
      companyIsLoading: isLoading,
    })),
  company: null,
  setCompany: (company: ICompany) => set(() => ({ company })),
  companyError: null,
  setCompanyError: (error: any) => set(() => ({ companyError: error })),
}));
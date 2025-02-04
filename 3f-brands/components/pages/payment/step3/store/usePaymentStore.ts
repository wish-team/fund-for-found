import { create } from 'zustand'

interface PaymentState {
  currencyType: 'fiat' | 'crypto'
  selectedCurrency: string
  paymentType: 'onetime' | 'monthly' | 'yearly'
  amount: string
  setCurrencyType: (type: 'fiat' | 'crypto') => void
  setSelectedCurrency: (currency: string) => void
  setPaymentType: (type: 'onetime' | 'monthly' | 'yearly') => void
  setAmount: (amount: string) => void
}

export const usePaymentStore = create<PaymentState>((set) => ({
  currencyType: 'fiat',
  selectedCurrency: '',
  paymentType: 'onetime',
  amount: '',
  setCurrencyType: (type) => set({ currencyType: type }),
  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
  setPaymentType: (type) => set({ paymentType: type }),
  setAmount: (amount) => set({ amount }),
}))
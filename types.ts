import type { Slot } from "vue"

export type InvestmentType = 'Crypto' | 'Stocks'

export interface InvestmentCollection {
    type: InvestmentType
    name: string
}

export interface StockRow {
    id: number
    name: string
    amount: number
    total: number
    
}
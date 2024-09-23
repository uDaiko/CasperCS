import type { Slot } from "vue"

export type InvestmentType = 'Crypto' | 'Stocks'

export interface InvestmentCollection {
    type: InvestmentType
    name: string
}
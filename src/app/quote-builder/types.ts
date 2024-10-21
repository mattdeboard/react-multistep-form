import type { QuoteFormData } from '../FormContext';

export type QuoteForm = {
  [K in keyof QuoteFormData]: NonNullable<QuoteFormData[K]>;
};

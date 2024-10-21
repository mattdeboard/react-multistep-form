import { createContext } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { QuoteForm } from './quote-builder/types';

const RegisterContext = createContext<null | UseFormRegister<QuoteForm>>(null);
export default RegisterContext;

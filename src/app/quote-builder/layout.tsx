'use client';

import { useContext, useState } from 'react';
import FormContext from '../FormContext';
import useFormStateMachine from '../useFormStateMachine';
import { useForm, SubmitHandler } from 'react-hook-form';
import { QuoteForm } from './types';
import { useRouter } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const formCtx = useContext(FormContext);
  const [formState, setFormState] = useState(formCtx);
  const { handleSubmit } = useForm<QuoteForm>();
  const firstStep = 'primaryDriverName';
  const onSubmit: SubmitHandler<QuoteForm> = (data) => {
    setFormState!((formState) => ({ ...formState, ...data }));
    stepForward();
    router.push(`/quote-builder/${nextStep}`);
  };

  const { nextStep, stepForward } = useFormStateMachine({
    [firstStep]: {
      next: 'dob',
    },
    dob: {
      prev: 'primaryDriverName',
      next: 'mailingAddress',
    },
    mailingAddress: {
      prev: 'dob',
      next: 'homeowner',
    },
    homeowner: {
      prev: 'mailingAddress',
      next: 'recentlyMoved',
    },
    recentlyMoved: {
      prev: 'homeowner',
      next: 'maritalStatus',
    },
    maritalStatus: {
      prev: 'recentlyMoved',
      next: 'vehicles',
    },
    vehicles: {
      prev: 'maritalStatus',
      next: 'financing',
    },
    financing: {
      prev: 'vehicles',
      next: 'drivers',
    },
    drivers: {
      prev: 'financing',
      next: 'review',
    },
    review: {
      prev: 'drivers',
    },
  });

  return (
    <FormContext.Provider value={{ ...formState, setFormState }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-rows-2 space-y-2">{children}</div>
        <button
          type="submit"
          className="btn bg-blue-500 text-white w-full mt-4"
        >
          Continue
        </button>
      </form>
    </FormContext.Provider>
  );
}

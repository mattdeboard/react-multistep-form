'use client';

import { useContext, useEffect, useState } from 'react';
import FormContext from '../FormContext';
import useFormStateMachine from '../useFormStateMachine';
import { useForm, SubmitHandler } from 'react-hook-form';
import { QuoteForm } from './types';
import { usePathname, useRouter } from 'next/navigation';
import RegisterContext from '../RegisterContext';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const formCtx = useContext(FormContext);
  const [formState, setFormState] = useState(formCtx);
  const pathname = usePathname();
  const { handleSubmit, register } = useForm<QuoteForm>();
  const firstStep = 'primaryDriverName';
  const { currentStep, nextDisabled, nextStep, stepForward } =
    useFormStateMachine({
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

  useEffect(() => {
    const currentStepFromPath = pathname.slice(1).split('/')[1] ?? firstStep;

    // If someone manually navigates to a specific page, put them at the
    // beginning.
    if (currentStep !== currentStepFromPath) {
      router.replace(
        `/quote-builder/${currentStep === firstStep ? '' : currentStep}`,
      );
    }
  }, []);

  const onSubmit: SubmitHandler<QuoteForm> = (data) => {
    setFormState!({ ...formState, ...data });
    stepForward();
    router.push(`/quote-builder/${nextStep}`);
  };

  return (
    <FormContext.Provider value={{ ...formState, setFormState }}>
      <RegisterContext.Provider value={register}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-rows-2 space-y-2">{children}</div>
          <button
            disabled={nextDisabled}
            type="submit"
            className="btn bg-blue-500 text-white w-full mt-4"
          >
            Continue
          </button>
        </form>
      </RegisterContext.Provider>
    </FormContext.Provider>
  );
}

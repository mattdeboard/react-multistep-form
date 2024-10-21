import { useState } from 'react';

/** Hook to aid in decoupling React components from navigation logic.
 *
 * The interface to using this state machine is primarily composed of
 * two functions:
 * 1. `stepForward`
 * 2. `stepBackward`
 *
 * These functions encapsulate all the logic needed to turn over the
 * machine state. That means they can be passed as the `onClick` handler
 * to navigation buttons. (See example below.) This keeps your React
 * components decoupled from navigation logic.
 *
 * In addition to the `step{Forward,Backward}` functions, this hook
 * also emits a handful of useful attributes that can be used to help
 * determine button state:
 * 1. `{next,prev}Step` - The {next,previous} phase of the machine.
 * 2. `currentStep` - Self-explanatory. It's important to note that
 *    invoking `stepForward` on the first phase, or `stepBackward`
 *    on the last phase, will not change the state.
 * 3. `{next,prev}Disabled` - This is a boolean that tells the invoking
 *    component whether moving to the {next, previous} phase is allowed.
 *
 * @example
 * // See `OrderForm.tsx` for an example of passing in effects to the state machine.
 * // See `NavigationButtons.tsx` for working example of this usage.
 * import { Button } from "battery-pack";
 * import { useFormStateMachine } from "./hooks";
 * import { initialState } from ".";
 *
 * const MyButtons = () => {
 *   const {
 *     currentStep,
 *     stepForward,
 *     stepBackward,
 *     nextDisabled,
 *     nextStep,
 *     prevDisabled,
 *     prevStep,
 *   } = useFormStateMachine({
 *     vin: {
 *       prev: "vin",
 *       next: "origin",
 *     },
 *     origin: {
 *       prev: "vin",
 *       next: "destination",
 *     },
 *     destination: {
 *       prev: "origin",
 *       next: "finalize",
 *     },
 *     finalize: {
 *       prev: "destination",
 *       next: "finalize",
 *     },
 *   });
 *   return (
 *     <>
 *       <Button
 *         data-test="backButton"
 *         data-test-item={`${prevStep}Button`}
 *         disabled={prevDisabled}
 *         color="secondary"
 *         onClick={stepBackward}
 *       >
 *         Back
 *       </Button>
 *       <Button
 *         data-test="forwardButton"
 *         data-test-item={`${nextStep}Button`}
 *         disabled={nextDisabled}
 *         color="primary"
 *         onClick={stepForward}
 *       >
 *         Next
 *       </Button>
 *     </>
 *   );
 * };
 */
const useFormStateMachine = <T extends string | number | symbol = string>(
  /** `config` is the heart of `useFormStateMachine`.
   *
   * `config` contains all information needed to generate the output.
   *  Each top-level key is an instance of `T`. Each of those top-level
   *  keys has the following attributes:
   *  1. `prev` - The phase before `currentStep`
   *  2. `next` - The phase after `currentStep`
   *  3. `nextGuard` - A function that runs before transitioning to the
   *     next phase. If this function returns true, the machine may not
   *     advance.
   *  4. `prevGuard` - A function that runs before transitioning to the
   *     previous phase. If this function returns true, the machine may
   *     not advance.
   *  5. `nextEffect` - A function that runs after the machine has
   *     transitioned to the next state.
   *  6. `prevEffect` - A function that runs after the machine has
   *     transitioned to the previous state.
   */
  config: ConfigByStep<T>,
  startingStep?: keyof ConfigByStep<T>,
): StateMachineInterface<T> => {
  const initialStep = startingStep ?? (Object.keys(config)[0] as T);
  const [currentStep, setCurrentStep] =
    useState<keyof ConfigByStep<T>>(initialStep);
  const [skippedFrom, setSkippedFrom] = useState<T | null>(null);

  const [nextDisabled, nextEffect, nextStep] = [
    config[currentStep].nextGuard?.() ?? !config[currentStep].next,
    config[currentStep].nextEffect,
    config[currentStep].next as T,
  ];
  const [prevDisabled, prevEffect, prevStep] = [
    config[currentStep].prevGuard?.() ??
      config[currentStep].prev === undefined,
    config[currentStep].prevEffect,
    config[currentStep].prev as T,
  ];

  return {
    currentStep,
    nextDisabled,
    prevDisabled,
    nextStep,
    prevStep,
    restart() {
      setCurrentStep(initialStep);
    },
    stepForward() {
      if (nextStep !== currentStep) {
        setCurrentStep(skippedFrom ?? nextStep ?? currentStep);
      }
      setSkippedFrom(null);
      nextEffect?.();
    },
    stepBackward() {
      if (prevStep !== currentStep) {
        setCurrentStep(prevStep ?? currentStep);
      }
      setSkippedFrom(null);
      prevEffect?.();
    },
    skipTo(targetStep) {
      setSkippedFrom(currentStep);
      setCurrentStep(targetStep);
    },
    skippedFrom,
  };
};

export default useFormStateMachine;

type StepSiblings<T extends string | number | symbol = string> = {
  next?: T;
  prev?: T;
};

type StateMachineGuardsAndEffects = {
  // `{next,prev}Effect` is called to invoke side effects of
  // transitioning to the next step.
  nextEffect?: () => void;
  prevEffect?: () => void;
  // `{next,prev}Guard` each returns 'true' if the state machine cannot
  // proceed.
  nextGuard?: () => boolean;
  prevGuard?: () => boolean;
};

type StepConfig<T extends string | number | symbol = string> =
  StepSiblings<T> & StateMachineGuardsAndEffects;

export type ConfigByStep<T extends string | number | symbol = string> = {
  [K in T]: StepConfig<T>;
};

export type StateMachineInterface<T extends string | number | symbol> = {
  currentStep: T;
  prevStep: T | undefined;
  nextStep: T | undefined;
  nextDisabled: boolean;
  prevDisabled: boolean;
  skippedFrom: T | null;
  skipTo: (targetStep: T) => void;
  stepForward: () => void;
  stepBackward: () => void;
  restart: () => void;
};

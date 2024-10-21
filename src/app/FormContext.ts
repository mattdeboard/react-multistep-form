import { createContext, Dispatch, SetStateAction } from 'react';

type Driver = {
  firstName: string;
  lastName: string;
  dob: `${number}-${number}-${number}`;
  licenseState: string;
  licenseId: string;
  primary: boolean;
};

export type QuoteFormData = {
  primaryDriverFirstName: null | string;
  primaryDriverLastName: null | string;
  primaryDriverDob: null | `${number}-${number}-${number}`;
  primaryDriverLicenseState: null | string;
  primaryDriverLicenseId: null | string;
  mailingAddress1: null | string;
  mailingAddress2: null | string;
  homeowner: null | 'rent' | 'own';
  recentlyMoved: null | 'yes' | 'no';
  maritalStatus: null | 'single' | 'married' | 'widowed';
  // I reckon for now this is just an array of VINs
  vehicles: string[];
  financeStatus: null | boolean;
  additionalDrivers: Driver[];
};

type QuoteFormContext = QuoteFormData & {
  setFormState?: Dispatch<SetStateAction<QuoteFormData>>;
};

const FormContext = createContext<QuoteFormContext>({
  primaryDriverFirstName: null,
  primaryDriverLastName: null,
  primaryDriverDob: null,
  primaryDriverLicenseState: null,
  primaryDriverLicenseId: null,
  mailingAddress1: null,
  mailingAddress2: null,
  homeowner: null,
  recentlyMoved: null,
  maritalStatus: null,
  vehicles: [],
  financeStatus: null,
  additionalDrivers: [],
});

export default FormContext;

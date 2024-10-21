'use client';

import { useForm } from 'react-hook-form';
import { QuoteForm } from '../types';

export default function Page() {
  const { register } = useForm<QuoteForm>();

  return (
    <>
      <div>
        <label className="mr-2">Street Address, City, State, Zip</label>
        <input {...register('mailingAddress1', { required: true })} required />
      </div>

      <div>
        <div>
          <label className="mr-2">Apartment/Suite/Unit</label>
          <input {...register('mailingAddress2', { required: false })} />
        </div>
      </div>
    </>
  );
}

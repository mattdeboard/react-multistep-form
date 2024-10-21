'use client';

import { useForm } from 'react-hook-form';
import { QuoteForm } from '../quote-builder/types';

export default function PrimaryDriverName() {
  const { register } = useForm<QuoteForm>();

  return (
    <>
      <div>
        <label className="mr-2">First Name</label>
        <input
          {...register('primaryDriverFirstName', { required: true })}
          required
        />
      </div>
      <div>
        <label className="mr-2">Last Name</label>
        <input
          {...register('primaryDriverLastName', { required: true })}
          required
        />
      </div>
    </>
  );
}

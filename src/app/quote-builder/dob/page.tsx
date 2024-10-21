'use client';

import { useForm } from 'react-hook-form';
import { QuoteForm } from '../types';

export default function Page() {
  const { register } = useForm<QuoteForm>();

  return (
    <div>
      <label className="mr-2">Date of Birth</label>
      <input
        {...register('primaryDriverDob', { required: true })}
        type="date"
        required
      />
    </div>
  );
}

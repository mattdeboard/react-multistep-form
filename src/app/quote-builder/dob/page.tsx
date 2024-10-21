'use client';

import RegisterContext from '@/app/RegisterContext';
import { useContext } from 'react';

export default function Page() {
  const register = useContext(RegisterContext);
  return (
    <div>
      <label className="mr-2">Date of Birth</label>
      <input
        {...register?.('primaryDriverDob', { required: true })}
        type="date"
        required
      />
    </div>
  );
}

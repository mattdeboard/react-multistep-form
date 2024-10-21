'use client';

import RegisterContext from '@/app/RegisterContext';
import { useContext } from 'react';

export default function Page() {
  const register = useContext(RegisterContext);
  return (
    <>
      <div>
        <label className="mr-2">Street Address, City, State, Zip</label>
        <input
          {...register?.('mailingAddress1', { required: true })}
          required
        />
      </div>

      <div>
        <div>
          <label className="mr-2">Apartment/Suite/Unit</label>
          <input {...register?.('mailingAddress2', { required: false })} />
        </div>
      </div>
    </>
  );
}

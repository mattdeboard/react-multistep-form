'use client';

import RegisterContext from '@/app/RegisterContext';
import { useContext } from 'react';

export default function Page() {
  const register = useContext(RegisterContext);
  return (
    <>
      <p>Do you rent or own your current residence?</p>
      <div>
        <label htmlFor="homeowner-rent" className="mr-2">
          Rent
        </label>
        <input
          {...register?.('homeowner', { required: true })}
          type="radio"
          value="rent"
          required
          id="homeowner-rent"
        />
      </div>

      <div>
        <label htmlFor="homeowner-own" className="mr-2">
          Own
        </label>
        <input
          {...register?.('homeowner', { required: true })}
          type="radio"
          value="own"
          required
          id="homeowner-own"
        />
      </div>
    </>
  );
}

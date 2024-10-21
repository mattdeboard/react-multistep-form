'use client';

import RegisterContext from '@/app/RegisterContext';
import { useContext } from 'react';

export default function Page() {
  const register = useContext(RegisterContext);
  return (
    <>
      <p>What is your marital status?</p>
      <div>
        <label htmlFor="maritalStatus-single" className="mr-2">
          Single
        </label>
        <input
          {...register?.('maritalStatus')}
          type="radio"
          value="single"
          required
          id="maritalStatus-single"
        />
      </div>

      <div>
        <label htmlFor="maritalStatus-married" className="mr-2">
          Married
        </label>
        <input
          {...register?.('maritalStatus')}
          type="radio"
          value="married"
          required
          id="maritalStatus-married"
        />
      </div>

      <div>
        <label htmlFor="maritalStatus-widowed" className="mr-2">
          Widowed
        </label>
        <input
          {...register?.('maritalStatus')}
          type="radio"
          value="widowed"
          required
          id="maritalStatus-widowed"
        />
      </div>
    </>
  );
}

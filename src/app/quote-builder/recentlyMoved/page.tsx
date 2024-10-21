'use client';

import RegisterContext from '@/app/RegisterContext';
import { useContext } from 'react';

export default function Page() {
  const register = useContext(RegisterContext);
  return (
    <>
      <p>Have you moved within the last 6 months?</p>
      <div>
        <label htmlFor="recentlyMoved-yes" className="mr-2">
          Yes
        </label>
        <input
          {...register?.('recentlyMoved')}
          type="radio"
          value="yes"
          required
          id="recentlyMoved-yes"
        />
      </div>

      <div>
        <label htmlFor="recentlyMoved-no" className="mr-2">
          No
        </label>
        <input
          {...register?.('recentlyMoved')}
          type="radio"
          value="no"
          required
          id="recentlyMoved-no"
        />
      </div>
    </>
  );
}

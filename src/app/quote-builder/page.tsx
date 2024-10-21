'use client';

import { useContext } from 'react';
import RegisterContext from '../RegisterContext';

export default function PrimaryDriverName() {
  const register = useContext(RegisterContext);
  return (
    <>
      <div>
        <label className="mr-2">First Name</label>
        <input
          {...register?.('primaryDriverFirstName', { required: true })}
          required
        />
      </div>
      <div>
        <label className="mr-2">Last Name</label>
        <input
          {...register?.('primaryDriverLastName', { required: true })}
          required
        />
      </div>
    </>
  );
}

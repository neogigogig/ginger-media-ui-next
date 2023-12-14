import React from 'react';
import Image from 'next/image';

import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className='px-4 py-4'> <Image alt="Logo" src={'/gmglogo.png'} width={200} height={500} /> </div>

      <ul style={{ gap: '4rem', margin: '24px',display:"flex" }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/AboutUs">About Us</Link>
        </li>
        <li>
          <Link href="/Login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

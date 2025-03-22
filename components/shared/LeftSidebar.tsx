'use client';

import Link from 'next/link';
import { sidebarLinks } from '@/constants/index';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface LeftSidebarProps {
  isOpen?: boolean;
}

const LeftSidebar = ({ isOpen = true }: LeftSidebarProps) => {
  return (
    <aside
      className={`leftsidebar
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <ul>
        {sidebarLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.route} className='sidebar-link'>
              <div className='flex items-center gap-3 p-2 mt-4 hover:bg-gray-800 rounded-xl'>
                <link.icon className='w-6 h-6' aria-label={link.label} />
                <span className='hidden md:inline'>{link.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className=' hidden md:block'>
        <SignedIn>
          <SignOutButton redirectUrl='/sign-in'>
            <div className='flex cursor-pointer ml-2 '>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
                className='mr-3 hidden md:block'
              />
              SignOut
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </aside>
  );
};

export default LeftSidebar;

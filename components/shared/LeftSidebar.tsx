'use client';

import Link from 'next/link';
import { sidebarLinks } from '@/constants/index';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

interface LeftSidebarProps {
  isOpen?: boolean;
}

const LeftSidebar = ({ isOpen = true }: LeftSidebarProps) => {
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <aside
      className={`leftsidebar
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <ul>
        {sidebarLinks.map((link, index) => {
          const href =
            link.route === '/profile' && user?.id
              ? `${link.route}/${user.id}`
              : link.route;
          const isActive = pathname === href;
          return (
            <li key={index}>
              <Link href={href} className='sidebar-link'>
                <div
                  className={`flex items-center gap-3 p-2 mt-4 rounded-xl hover:bg-gray-800 ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`}
                >
                  {' '}
                  <link.icon className='w-6 h-6' aria-label={link.label} />
                  <span className='hidden md:inline'>{link.label}</span>
                </div>
              </Link>
            </li>
          );
        })}
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

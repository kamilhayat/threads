'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { sidebarLinks } from '@/constants/index';
import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import { dark } from '@clerk/themes';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className='navbar'>
        <Link href='/' className='flex items-center gap-4'>
          <Image
            src='/assets/Black_and_Blue_Initials_Creative_Logo__1_-removebg-preview.png'
            alt='logo'
            width={40}
            height={45}
          />
        </Link>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: 'py-2 px-4',
            },
          }}
        />

        <button className='md:hidden' onClick={toggleSidebar}>
          {isOpen ? (
            <X size={28} className='text-white' />
          ) : (
            <Menu size={28} className='text-white' />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className='absolute top-14 left-0 w-full bg-gray-900 p-4 shadow-lg md:hidden'>
          <ul>
            {sidebarLinks.map((link, index) => (
              <li key={index} className='py-2 border-b border-gray-700'>
                <Link
                  href={link.route}
                  className='flex items-center gap-3 p-2 hover:bg-gray-800 rounded-xl text-white'
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className='w-6 h-6' />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
            <SignedIn>
              <SignOutButton>
                <div className='flex cursor-pointer ml-2 py-2 text-white '>
                  <Image
                    src='/assets/logout.svg'
                    alt='logout'
                    width={24}
                    height={24}
                    className='mr-3'
                  />
                  SignOut
                </div>
              </SignOutButton>
            </SignedIn>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;

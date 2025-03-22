'use client';
import Link from 'next/link';
import { sidebarLinks } from '@/constants/index';
import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import { dark } from '@clerk/themes';

function Navbar() {
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
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className='fixed bottom-0 left-0 w-full bg-gray-900 p-3 flex justify-around items-center border-t border-gray-700 z-50 md:hidden'>
        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            href={link.route}
            className='flex flex-col items-center text-white'
          >
            <link.icon className='w-6 h-6' aria-label={link.label} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;

'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { sidebarLinks } from '@/constants/index';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className='navbar'>
        <Link href='/' className='flex items-center gap-4'>
          <img
            src='https://kamilportfolio.netlify.app/static/media/logo5.17d7834b95fa69b4e1d4.png'
            alt='logo'
            width={32}
            height={32}
          />
          <p className='text-heading3-bold text-light-1 max-md:hidden'>
            Threads
          </p>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button className='md:hidden' onClick={toggleSidebar}>
          {isOpen ? (
            <X size={28} className='text-white' />
          ) : (
            <Menu size={28} className='text-white' />
          )}
        </button>
      </nav>

      {/* Mobile Sidebar - Shows only when isOpen is true */}
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
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;

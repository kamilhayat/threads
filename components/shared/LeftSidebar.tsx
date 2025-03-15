'use client';

import Link from 'next/link';
import { sidebarLinks } from '@/constants/index';

interface LeftSidebarProps {
  isOpen?: boolean;  
}

const LeftSidebar = ({ isOpen = true }: LeftSidebarProps) => {  // Default to true for larger screens
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
                <link.icon className='w-6 h-6' />
                <span className='hidden md:inline'>{link.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LeftSidebar;

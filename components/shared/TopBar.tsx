'use client'
import { useState,useEffect } from 'react';
import { siteConfig } from '@/utils/site-config';

const TopBar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 
  return (
    <div className='topbar hidden sm:block'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Left Section - Contact Info */}
        <div className='flex items-center space-x-5'>
          {siteConfig.contact.map((contact) => (
            <div
              key={contact.name}
              className='flex items-center space-x-3 hover:text-red-100 '
            >
              <div className=' hover:bg-red-300 rounded-full p-2 transition duration-300'>
                <contact.icon />
              </div>
              <span>{contact.value}</span>
            </div>
          ))}
        </div>

        {/* Right Section - Social Icons */}
        <div className='flex space-x-4'>
          {siteConfig.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className=' hover:bg-red-300 rounded-full p-2 transition duration-300'
            >
              <social.icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

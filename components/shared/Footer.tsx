import { footerlinksApp, sidebarLinks } from '@/constants';
import { siteConfig } from '@/utils/site-config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-dark-2 text-white border-t p-8 flex flex-col md:flex-row justify-between'>
      <div>
        <Link href='/' className='flex items-center gap-4'>
          <Image
            src='/assets/Black_and_Blue_Initials_Creative_Logo-removebg-preview.png'
            width={100}
            height={122}
            alt='logo'
          />
        </Link>

        <div className='space-y-4'>
          {siteConfig.contact.map((item, index) => (
            <div key={index} className='flex items-center gap-2 text-gray-600 '>
              <span className='text-black text-3xl bg-gray-700 p-2 rounded-full hover:bg-red-300 hover:text-white'>
                {<item.icon />}
              </span>
              <span>{item.value}</span>
            </div>
          ))}
          <div className='flex gap-4'>
            {siteConfig.socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                className='bg-gray-700 p-2 rounded-full flex items-center justify-center '
              >
                <social.icon className='text-black text-3xl hover:bg-red-300 hover:text-white' />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div>
        <ul className='space-y-2 mt-4'>
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className='text-gray-600 hover:text-pink-500'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Links */}
      <div>
        <ul className='space-y-2 '>
          {footerlinksApp.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className='text-gray-600 hover:text-pink-500'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full absolute -bottom-[19rem] left-0  justify-center sm:block hidden'>
        <p className='text-center text-gray-600'>
          @{new Date().getFullYear()} www.hayatthreads.com All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

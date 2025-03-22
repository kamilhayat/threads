import { footerlinksApp, sidebarLinks } from '@/constants';
import { siteConfig } from '@/utils/site-config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-dark-2 text-white border-t p-8 flex flex-col md:flex-row md:justify-between gap-8 relative pb-24 sm:pb-8'>
      {/* Logo & Social Section */}
      <div className='md:max-w-[300px] lg:mb-8 sm:mb-0'>
        <Link href='/' className='flex items-center gap-4'>
          <Image
            src='/assets/Black_and_Blue_Initials_Creative_Logo-removebg-preview.png'
            width={100}
            height={122}
            alt='logo'
          />
        </Link>
        <div className='space-y-4 mt-4'>
          {siteConfig.contact.map((item, index) => (
            <div key={index} className='flex items-center gap-2 text-gray-600'>
              <span className='text-black text-3xl bg-gray-700 p-2 rounded-full hover:bg-red-300 hover:text-white'>
                {<item.icon />}
              </span>
              <span>{item.value}</span>
            </div>
          ))}
          <div className='flex gap-4 '>
            {siteConfig.socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                className='bg-gray-700 p-2 rounded-full flex items-center justify-center'
              >
                <social.icon className='text-black text-3xl hover:bg-red-300 hover:text-white' />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Links */}
      <div className='md:text-center'>
        <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
        <ul className='space-y-2'>
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className='text-gray-600 hover:text-pink-500 text-sm'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Links */}
      <div className='md:text-center'>
        <h3 className='text-lg font-semibold mb-4'>Resources</h3>
        <ul className='space-y-2'>
          {footerlinksApp.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className='text-gray-600 hover:text-pink-500 text-sm'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright */}
      <div className='w-full text-center mt-8 md:absolute md:bottom-4 md:left-0'>
      <div className='border-t border-gray-500 w-full -mt-8'></div>
        <p className='text-gray-600 text-sm mt-2'>
          @{new Date().getFullYear()} www.hayatthreads.com All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

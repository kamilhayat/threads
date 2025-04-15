'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
interface SearchBarProps {
  routeType: string;
}
const SearchBar = ({ routeType }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (searchText) {
        router.push(`/${routeType}?q=$` + searchText);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);
    return () => clearTimeout(debounceFn);
  }, [searchText, routeType]);

  return (
    <div className='searchbar'>
      <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
      <Input
        id='text'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={`${
          routeType !== "/search" ? "Search Communities" : "Search creators"
        }`}
        className='no-focus searchbar_input'
      />
    </div>
  );
};
    
export default SearchBar;

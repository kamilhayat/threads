import AccountProfile from '@/components/forms/AccountProfile';
import React from 'react';
import { currentUser } from '@clerk/nextjs/server';

const page = async () => {
  const user = await currentUser();

  // Simulated `userInfo` - Replace with your actual DB fetch logic
  const userInfo = null; // Fetch user from your database

  const userData = {
    id: user.id,
    objectId: userInfo?._id ?? '',
    username: userInfo?.username || user.username || user.email?.split('@')[0] || '',
    name: userInfo?.name || user.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user.imageUrl || '/assets/profile.svg',
  };

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <span className='text-base-regular text-light-2 mt-2'>
        Complete your profile
      </span>
      <section className='mt-7 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
};

export default page;

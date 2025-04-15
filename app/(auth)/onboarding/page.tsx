import AccountProfile from '@/components/forms/AccountProfile';
import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { fetchUser } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';

const page = async () => {
  const user = await currentUser();
  if (!user) {
    return (
      <p className='text-center text-white'>User not found. Please log in.</p>
    );
  }
  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect('/');

  console.log('Fetched User Info:', userInfo);

  const userData = {
    id: user.id,
    objectId: userInfo?._id?.toString() ?? '',
    username:userInfo?.username || user.username || '',
    name: userInfo?.name || user.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user.imageUrl || '/assets/profile.svg',
    onboarded: userInfo?.onboarding || false,
  };
  // console.log('from onboaring page',userData)

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

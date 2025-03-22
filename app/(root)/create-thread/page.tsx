import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.action';
import PostThread from '@/components/forms/PostThread';

const CreateThread = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');
 
  return (
    <>
      <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
        <h1 className='head-text'>Post Thread form</h1>
        <span className='text-base-regular text-light-2 mt-2'>
          Complete your thread
        </span>
      </main>
      <PostThread userId={userInfo._id.toString()} />
    </>
  );
};

export default CreateThread;

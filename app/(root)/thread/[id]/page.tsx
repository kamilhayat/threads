import ThreadCard from '@/components/cards/ThreadCard';
import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { fetchUser } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import { fetchThreadById } from '@/lib/actions/thread.action';
import CommentForm from '@/components/forms/CommentForm';

interface PageProps {
  params: {
    id: string;
  };
}

// Default export is now sync, no async arrow function here
export default function ThreadPageWrapper({ params }: PageProps) {
  return <ThreadPage params={params} />;
}

// Async logic lives here
async function ThreadPage({ params }: PageProps) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(params.id);
  if (!thread) return <div>Thread not found</div>;

  return (
    <section className='relative flex flex-col gap-4'>
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user.id}
        content={thread.text}
        author={thread.author}
        createdAt={thread.createdAt}
        parentId={thread.parentId}
        comments={thread.children}
      />

      <CommentForm
        threadId={thread.id}
        currentUserImg={userInfo.image}
        currentUserId={JSON.stringify(userInfo._id)}
      />

      <div className='mt-10'>
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

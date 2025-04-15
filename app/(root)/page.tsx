import React from 'react';
import { fetchAllThread } from '@/lib/actions/thread.action';
import { currentUser } from '@clerk/nextjs/server';
import ThreadCard from '@/components/cards/ThreadCard';
const page = async () => {
  const { posts, isNext } = await fetchAllThread(1, 20);
  const user = await currentUser();
  console.log(posts);
  return (
    <>
      <section className='flex flex-col gap-4'>
        {posts.length === 0 ? (
          <p>No threads found</p>
        ) : (
          <>
            {posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ''}
                content={post.text}
                author={post.author}
                createdAt={post.createdAt}
                // community={post.community}
                // parentId={post.parentId}
                comments={post.children}
              />
            ))}
          </>
        )}

      </section>
    </>
  );
};

export default page;

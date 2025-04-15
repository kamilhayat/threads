import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { fetchAllUser, fetchUser } from '@/lib/actions/user.action';
import SearchBar from '@/components/shared/SearchBar';
import UserCard from '@/components/cards/UserCard';
const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  // const userInfo = await fetchUser(user.id);
  const allUsers = await fetchAllUser({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 10,
  });
  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <SearchBar routeType='search' />

      <div className='mt-14 flex flex-col gap-9'>
        {allUsers.users.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {allUsers.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      {/* <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </section>
  );
};

export default page;

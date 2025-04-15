import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.action';
import { fetchCommunities } from '@/lib/actions/community.actions';
import CommunityCard from '@/components/cards/CommunityCard';
import SearchBar from '@/components/shared/SearchBar';
import Pagination from '@/components/shared/Pagination';

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const search = typeof searchParams.q === 'string' ? searchParams.q : '';
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;

  const result = await fetchCommunities({
    searchString: search,
    pageNumber: page,
    pageSize: 25,
  });

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-5'>
        <SearchBar routeType='communities' />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        {result.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='communities'
        pageNumber={page}
        isNext={result.isNext}
      />
    </>
  );
}

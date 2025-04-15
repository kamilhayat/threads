'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import { ThreadValidation } from '@/lib/validations/threads';
import { fetchUser, updateUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs/server';
import { useOrganization } from '@clerk/nextjs';
import { createThread } from '@/lib/actions/thread.action';
import { ThreadValidation } from '@/lib/validations/thread';
// import { createThread } from '@/lib/actions/thread.action';
// import createthread from
interface PostThreadsProps {
  userId: string;
}
const PostThread = ({ userId }: PostThreadsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (!organization) {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathname,
      });
    }else{
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization.id,
        path: pathname,
      });
    }

    router.push('/');
  };
  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Thread
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type='submit' className='bg-primary-500'>
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;

'use server'

import { connectToDB } from '../mongoose'
import User from '../models/user.model'
import { revalidatePath } from 'next/cache'
import Thread from '../models/thread.model'
import { SortOrder } from 'mongoose'
import { FilterQuery } from 'mongoose'

interface params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}: params

): Promise<void> {
    await connectToDB()
    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            {
                upsert: true,
                // new: true,
                // runValidators: true,
            }
        )
        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    }
    catch (error) {
        console.error('Error updating user:', error)
    }
}

export async function fetchUser(userId: string) {
    try {
        await connectToDB();

        return await User.findOne({ id: userId })
        //   .populate({
        //     path: "communities",
        //     model: Community,
        //   });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserPosts(userId: string) {
    try {
        await connectToDB();
        console.log("Connected to DB");

        const userWithThreads = await User.findOne({ id: userId }).populate({
            path: "threads",
            model: "Thread",
            populate: {
                path: "children",
                model: "Thread",
                populate: {
                    path: "author",
                    model: "User",
                    select: "name image id",
                },
            },
        });

        if (!userWithThreads) {
            console.log("User not found with ID:", userId);
            throw new Error("User not found");
        }

        return {
            id: userWithThreads._id.toString(),
            name: userWithThreads.name,
            image: userWithThreads.image,
            threads: userWithThreads.threads,
        };
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Error fetching user posts");
    }
}

export async function fetchAllUser({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {
    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        // Create a case-insensitive regular expression for the provided search string.
        const regex = new RegExp(searchString, "i");

        // Create an initial query object to filter users.
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }, // Exclude the current user from the results.
        };

        // If the search string is not empty, add the $or operator to match either username or name fields.
        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ];
        }

        // Define the sort options for the fetched users based on createdAt field and provided sort order.
        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        // Count the total number of users that match the search criteria (without pagination).
        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        // Check if there are more users beyond the current page.
        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };

    } catch (error) {
        console.error("Error fetching all user:", error);
        throw new Error("Error fetching all user");

    }

}

export async function getActivity(userId: string) {
    try {
      await connectToDB();
      console.log("Connected to DB");
  
      // Step 1: Find all threads created by the user
      const userThreads = await Thread.find({ author: userId });
      console.log("User Threads:", userThreads);
  
      // Step 2: Collect all child thread IDs from 'children' fields
      const childThreadIds = userThreads.reduce((acc, userThread) => {
        if (Array.isArray(userThread.children)) {
          return acc.concat(userThread.children);
        }
        return acc;
      }, []);
      console.log("Collected Child Thread IDs:", childThreadIds);
  
      if (childThreadIds.length === 0) {
        console.log("No child threads found (no replies to user's threads)");
        return [];
      }
  
      // Step 3: Find the child threads (replies), excluding those by the same user
      const replies = await Thread.find({
        _id: { $in: childThreadIds },
        author: { $ne: userId }, // Exclude self-replies
      })
        .sort({ createdAt: -1 })
        .populate({
          path: "author",
          model: User,
          select: "name image _id",
        });
  
      console.log("Replies Found:", replies);
  
      return replies;
    } catch (error) {
      console.error("Error fetching replies: ", error);
      return []; // Return an empty array instead of throwing, to prevent crashing the UI
    }
  }
  
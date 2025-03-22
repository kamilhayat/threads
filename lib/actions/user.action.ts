'use server'

import { connectToDB } from '../mongoose'
import User from '../models/user.model'
import { revalidatePath } from 'next/cache'

interface params{
    userId:string;
    username:string;
    name:string;
    bio:string;
    image:string;
    path: string;
}
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path 
}:params

): Promise<void> {
 await   connectToDB()
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

export async function fetchUser(userId:string) {
    try {
      connectToDB();
  
      return await User.findOne({ id: userId.toString() })
    //   .populate({
    //     path: "communities",
    //     model: Community,
    //   });
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }
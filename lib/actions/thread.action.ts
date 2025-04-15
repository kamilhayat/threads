"use server";

import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import mongoose from 'mongoose';
import Community from '../models/community.model';

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
      connectToDB();
  
      const communityIdObject = await Community.findOne(
        { id: communityId },
        { _id: 1 }
      );
  
      const createdThread = await Thread.create({
        text,
        author,
        community: communityIdObject,
      });
  
      await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id },
      });
  
      if (communityIdObject) {
        await Community.findByIdAndUpdate(communityIdObject, {
          $push: { threads: createdThread._id },
        });
      }
  
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to create thread: ${error.message}`);
    }
  }

export async function fetchAllThread(pageNumber = 1, pageSize = 20) {
    await connectToDB();
    const skipPage = (pageNumber - 1) * pageSize;
  
    try {
      const threads = await Thread.find({
        $or: [{ parentId: null }, { parentId: { $exists: false } }],
      })
        .sort({ createdAt: 'desc' })
        .skip(skipPage)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
          path: 'children',
          populate: {
            path: 'author',
            model: User,
            select: '_id name image',
          },
        });
  
      const totalPostsCount = await Thread.countDocuments({
        $or: [{ parentId: null }, { parentId: { $exists: false } }],
      });
  
      const isNext = totalPostsCount > skipPage + threads.length;
  
      return { posts: threads, isNext };
    } catch (error: any) {
      throw new Error(`Failed to fetch threads: ${error.message}`);
    }
  }
  

export async function fetchThreadById(threadId: string) {
     connectToDB()
    try {
        const thread = await Thread.findById(threadId.toString())
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            }) // Populate the author field with _id and username
            // .populate({
            //     path: "community",
            //     model: Community,
            //     select: "_id id name image",
            // }) // Populate the community field with _id and name
            .populate({
                path: "children", // Populate the children field
                populate: [
                    {
                        path: "author", // Populate the author field within children
                        model: User,
                        select: "_id id name parentId image", // Select only _id and username fields of the author
                    },
                    {
                        path: "children", // Populate the children field within children
                        model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
                        populate: {
                            path: "author", // Populate the author field within nested children
                            model: User,
                            select: "_id id name parentId image", // Select only _id and username fields of the author
                        },
                    },
                ],
            })
            .exec();

        return thread;

    } catch (error: any) {
        throw new Error(`Failed to fetch thread: ${error.message}`);

    }
}

export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string) {
    await connectToDB()
    try {
        const originalThread = await Thread.findById(threadId)
        if (!originalThread) {
            throw new Error("Thread not found");
        }
        // Create the new comment thread
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        })
        const savedCommentThread = await commentThread.save();

        // Add the comment thread's ID to the original thread's children array
        // Add the comment thread's ID to the original thread's children array
        if (!originalThread.children) {
            originalThread.children = [];
        }
        originalThread.children.push(savedCommentThread._id);


        // Save the updated original thread to the database
        await originalThread.save();

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to add comment: ${error.message}`);

    }
}
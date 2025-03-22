import * as z from 'zod';

export const userValidation = z.object({
  profile_photo: z.string().nonempty({ message: "Profile photo is required" }),
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be at most 30 characters" }),
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be at most 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  bio: z.string()
    .min(3, { message: "Bio must be at least 3 characters" })
    .max(160, { message: "Bio must be at most 160 characters" }), // Increased limit
});

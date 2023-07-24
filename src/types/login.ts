import { z } from "zod";

export const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const formRegisterSchema = z.object({
  email: z.string().email(),
  image: z.string().url(),
  name: z.string(),
  noHP: z.string(),
  isActive : z.boolean().optional()
});

// email: string;
// image: string;
// name: string;
// noHP : string;
// isActive?: boolean;

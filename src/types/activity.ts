import { z } from 'zod';

// Zod schema for Activity validation
export const ActivitySchema = z.object({
  id: z.number(),
  title: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  capacity: z.number(),
  signedUp: z.array(z.string()),
  participated: z.array(z.string()),
});

// Infer the Activity type from the Zod schema
export type Activity = z.infer<typeof ActivitySchema>;

import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  age: z.coerce.number().min(18, { message: "You must be at least 18." }).max(100),
  gender: z.enum(["Male", "Female"], {
    message: "Please select a gender.",
  }),
})

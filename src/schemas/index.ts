import {z} from "zod";

export const PasscodeSchema = z.object({
  passcode: z.coerce
      .number()
      .int()
      .gte(100000, {message: 'passcode must be a 6 digit number'})
      .lte(999999, {message: 'passcode must be a 6 digit number'})
})
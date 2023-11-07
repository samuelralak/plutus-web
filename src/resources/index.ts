import {z} from "zod";
import {ProfileSchema} from "@/schemas";
import {NDKUserProfile} from "@nostr-dev-kit/ndk";

export type UserProfile = { npub: string, pubkey: string } & NDKUserProfile & z.infer<typeof ProfileSchema>
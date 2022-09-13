import { Document  } from "mongoose";

export interface Profile extends Document {
    email: string;
    profileName: string;
    profilePhoto: string;
    profileBio: string;
    profileTitle: String;
    coverPhoto: String;
}
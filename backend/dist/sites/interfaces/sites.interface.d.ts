import { Document } from "mongoose";
export interface Site extends Document {
    creatorId: string;
    creatorEmail: string;
    siteUrl: string;
    allowed: boolean;
    siteType: String;
    siteName: String;
    siteDescription: String;
    siteThumbnail: String;
    published: boolean;
}

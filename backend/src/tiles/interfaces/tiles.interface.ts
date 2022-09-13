import { Document  } from "mongoose";

export interface Tile extends Document {
    siteId: string;
    tileType: string;
    tileValue: object;
}
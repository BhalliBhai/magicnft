import * as mongoose from 'mongoose';

export const TileSchema = new mongoose.Schema({
    siteId: {
        type: String,
        required: [true, 'SITEID_IS_BLANK'],
    },

    tileType: {
        type: String,
        required: [true, 'TILETYPE_IS_BLANK'],
    },

    tileValue: {
        type: Object,
    }
})
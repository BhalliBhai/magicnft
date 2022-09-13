"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileSchema = void 0;
const mongoose = require("mongoose");
exports.TileSchema = new mongoose.Schema({
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
});
//# sourceMappingURL=tiles.schema.js.map
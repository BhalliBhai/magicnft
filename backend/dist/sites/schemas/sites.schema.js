"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSchema = void 0;
const mongoose = require("mongoose");
const validator = require("validator");
exports.SiteSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: [true, 'CREATORID_IS_BLANK'],
    },
    creatorEmail: {
        type: String,
        required: [true, 'CREATOREMAIL_IS_BLANK'],
        validate: validator.isEmail,
    },
    siteUrl: {
        type: String,
        required: [true, 'CREATORSITEURL_IS_BLANK'],
    },
    allowed: {
        type: Boolean,
        required: [true, 'ALLOWED_IS_BLANK']
    },
    siteType: {
        type: String,
    },
    siteName: {
        type: String,
    },
    siteDescription: {
        type: String,
    },
    siteThumbnail: {
        type: String,
    },
    published: {
        type: Boolean,
    },
    tokenGate: {
        type: Boolean,
    },
    chainIds: {
        type: Array,
    }
});
//# sourceMappingURL=sites.schema.js.map
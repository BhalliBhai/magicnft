"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSchema = void 0;
const mongoose = require("mongoose");
const validator = require("validator");
exports.ProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'CREATOREMAIL_IS_BLANK'],
        validate: validator.isEmail,
    },
    profileName: {
        type: String,
    },
    profilePhoto: {
        type: String,
    },
    profileBio: {
        type: String,
    },
    profileTitle: {
        type: String,
    },
    coverPhoto: {
        type: String,
    }
});
//# sourceMappingURL=profile.schema.js.map
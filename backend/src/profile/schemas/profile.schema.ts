import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const ProfileSchema = new mongoose.Schema({

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
})
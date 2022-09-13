import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Profile } from './interfaces/profile.interface';
import { SaveProfileDto } from './dto/save-profile-data.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel('Profile') private readonly profileModel: Model<Profile>,
    ) { }

    async create_save(saveProfileDto: SaveProfileDto) {
        const tempProfile = await this.profileModel.findOne({ email: saveProfileDto.email });
        if(tempProfile){
            tempProfile.profileName = saveProfileDto.profileName;
            tempProfile.profilePhoto = saveProfileDto.profilePhoto;
            tempProfile.profileBio = saveProfileDto.profileBio;
            tempProfile.profileTitle = saveProfileDto.profileTitle;
            tempProfile.coverPhoto = saveProfileDto.coverPhoto;

            return await tempProfile.save();
        }
        else{
            const createPro = new this.profileModel(saveProfileDto);
            return await createPro.save();
        }

    }

    async get_profile( email: any ) {
        return await this.profileModel.findOne({ email: email });
    }

}
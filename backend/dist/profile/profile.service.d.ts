import { Model } from 'mongoose';
import { Profile } from './interfaces/profile.interface';
import { SaveProfileDto } from './dto/save-profile-data.dto';
export declare class ProfileService {
    private readonly profileModel;
    constructor(profileModel: Model<Profile>);
    create_save(saveProfileDto: SaveProfileDto): Promise<Profile>;
    get_profile(email: any): Promise<Profile>;
}

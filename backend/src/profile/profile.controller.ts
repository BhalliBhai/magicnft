import { Controller, Post, Req, Get } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Request } from 'express';

@Controller('profile')

export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    @Post('saveprofile')
    async saveProfile(@Req() req: Request) {
        const profileDataDto = {
            email: req.body.email,
            profileName: req.body.name,
            profilePhoto: req.body.photo,
            profileBio: req.body.bio,
            profileTitle: req.body.title,
            coverPhoto: req.body.coverPhoto,
        };
        return await this.profileService.create_save(profileDataDto);
    }

    @Post('getprofile')
    async getProfile(@Req() req: Request) {
        return await this.profileService.get_profile(req.body.email);
    }
}
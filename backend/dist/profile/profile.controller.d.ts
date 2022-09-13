import { ProfileService } from "./profile.service";
import { Request } from 'express';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    saveProfile(req: Request): Promise<import("./interfaces/profile.interface").Profile>;
    getProfile(req: Request): Promise<import("./interfaces/profile.interface").Profile>;
}

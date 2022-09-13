import { MongooseModule } from "@nestjs/mongoose";
import { ProfileSchema } from './schemas/profile.schema';
import { Module } from '@nestjs/common';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }])
    ],
    controllers: [ProfileController],
    providers: [ProfileService ],
})

export class ProfileModule {}
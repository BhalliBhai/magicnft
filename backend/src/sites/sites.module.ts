import { MongooseModule } from "@nestjs/mongoose";
import { SiteSchema } from './schemas/sites.schema';
import { Module } from '@nestjs/common';

import { SiteController } from './sites.controller';
import { SiteService } from './sites.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'CreatorSite', schema: SiteSchema }])
    ],
    controllers: [SiteController],
    providers: [SiteService ],
})

export class SiteModule {}
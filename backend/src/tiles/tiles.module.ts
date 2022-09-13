import { MongooseModule } from "@nestjs/mongoose";
import { TileSchema } from './schemas/tiles.schema';
import { Module } from '@nestjs/common';

import { TileController } from './tiles.controller';
import { TileService } from './tiles.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Tiles', schema: TileSchema }])
    ],
    controllers: [TileController],
    providers: [TileService ],
})

export class TileModule {}
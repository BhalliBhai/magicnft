import { Controller, Post, Req, Get } from '@nestjs/common';
import { TileService } from "./tiles.service";
import { Request } from 'express';

@Controller('tiles')

export class TileController {
    constructor(
        private readonly tileService: TileService
    ) { }

    @Post('createtile')
    async createTile(@Req() req: Request) {

        const tileDataDto = {
            siteId: req.body.siteId,
            tileType: req.body.tileType,
            tileValue: req.body.tileValue
        };

        return await this.tileService.create(tileDataDto);
    }

    @Post('tilesinfo')
    async getTilesInfo(@Req() req: Request) {
        return await this.tileService.getInfo(req.body.siteId);
    }

    @Post('duplicatetiles')
    async duplicateTiles(@Req() req: Request) {

        const temp = await this.tileService.getInfo(req.body.originId);

        const tileDataDto = {
            siteId: req.body.siteId,
            tiles: temp
        }

        // console.log(tileDataDto);
        return await this.tileService.duplicate(tileDataDto);
    }

    @Post('deletetiles')
    async deleteTiles(@Req() req: Request) {
        return await this.tileService.deleteSeveral( req.body.id );
    }
}
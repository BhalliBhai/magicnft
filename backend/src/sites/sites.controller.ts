import { Controller, Post, Req, Get } from "@nestjs/common";
import { SiteService } from "./sites.service";
import { Request } from 'express';

@Controller('creatorsite')

export class SiteController {
    constructor(
        private readonly siteService: SiteService
    ) { }

    @Post('createsite')
    async createStie(@Req() req: Request) {
        const siteDataDto = {
            creatorId: req.body.id,
            creatorEmail: req.body.email,
            siteUrl: req.body.url,
            allowed: req.body.allowed,
            published: req.body.published
        };

        return await this.siteService.create(siteDataDto);
    }

    @Post('resetsite')
    async resetSite(@Req() req: Request) {
        const resetDataDto = {
            siteUrl: req.body.siteUrl,
            published: req.body.published,
            siteName: req.body.siteName,
            siteType: req.body.siteType,
            siteDescription: req.body.siteDescription,
            siteThumbnail: req.body.siteThumbnail,
            tokenGate: req.body.tokenGate ? req.body.tokenGate : false,
            chainIds: req.body.chainIds ? req.body.chainIds : []
        };

        return await this.siteService.reset(resetDataDto);
    }

    @Post('duplicate')
    async duplicateSite(@Req() req: Request) {
        const duplicateDataDto = {
            creatorId: req.body.id,
            creatorEmail: req.body.email,
            siteUrl: req.body.url,
            allowed: req.body.allowed,
            published: req.body.published,
            siteName: req.body.name,
            siteType: req.body.type,
            siteDescription: req.body.description,
            siteThumbnail: req.body.thumbnail
        }

        return await this.siteService.duplicate(duplicateDataDto);
    }

    @Post('changetype')
    async changType(@Req() req: Request) {
        const changeDataDto = {
            siteUrl: req.body.url,
            type: req.body.type
        }

        return await this.siteService.change(changeDataDto);
    }

    @Post('deletesite')
    async deleteSite(@Req() req: Request) {
        return await this.siteService.delete({siteUrl: req.body.url});
    }

    @Get('siteinfo')
    async getSiteInfo() {
        return await this.siteService.getInfo();
    }
}
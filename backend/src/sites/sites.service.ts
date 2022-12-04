import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Site } from './interfaces/sites.interface';
import { CreateSiteDto } from './dto/create-site-data.dto';
import { PublishSiteDto } from './dto/publish-site-data.dto';

@Injectable()
export class SiteService {
    constructor(
        @InjectModel('CreatorSite') private readonly siteModel: Model<Site>,
    ) { }

    async create(createSiteDto: CreateSiteDto) {
        const creatorSite = new this.siteModel(createSiteDto);
        await creatorSite.save();
        return this.siteModel.find({});
    }

    async reset(resetDataDto: PublishSiteDto) {
        const tempSite = await this.siteModel.findOne({ siteUrl: resetDataDto.siteUrl });

        tempSite.siteType = resetDataDto.siteType;
        tempSite.siteName = resetDataDto.siteName;
        tempSite.siteDescription = resetDataDto.siteDescription;
        tempSite.siteThumbnail = resetDataDto.siteThumbnail;
        tempSite.published = resetDataDto.published;
        tempSite.tokenGate = resetDataDto.tokenGate;
        tempSite.chainIds = resetDataDto.chainIds;

        console.log('tempsite', tempSite);

        return await tempSite.save();
    }

    async change(changeDataDto: any) {
        const tempSite = await this.siteModel.findOne({ siteUrl: changeDataDto.siteUrl });
        tempSite.siteType = changeDataDto.type;

        await tempSite.save();
        return this.siteModel.find({});
    }

    async delete(deleteDataDto: any) {
        await this.siteModel.deleteOne({ siteUrl: deleteDataDto.siteUrl });

        return this.siteModel.find({});
    }

    async duplicate(duplicateDataDto: any) {
        const creatorSite = new this.siteModel(duplicateDataDto);
        await creatorSite.save();
        return this.siteModel.find({});
    }

    async getInfo() {
        const jsonData = await this.siteModel.find({});

        console.log('my site data', jsonData);

        return jsonData;
    }
}
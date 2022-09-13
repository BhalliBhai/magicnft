import { Model } from 'mongoose';
import { Site } from './interfaces/sites.interface';
import { CreateSiteDto } from './dto/create-site-data.dto';
import { PublishSiteDto } from './dto/publish-site-data.dto';
export declare class SiteService {
    private readonly siteModel;
    constructor(siteModel: Model<Site>);
    create(createSiteDto: CreateSiteDto): Promise<Site[]>;
    reset(resetDataDto: PublishSiteDto): Promise<Site>;
    change(changeDataDto: any): Promise<Site[]>;
    delete(deleteDataDto: any): Promise<Site[]>;
    duplicate(duplicateDataDto: any): Promise<Site[]>;
    getInfo(): Promise<Site[]>;
}

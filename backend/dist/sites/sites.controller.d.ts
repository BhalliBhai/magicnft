import { SiteService } from "./sites.service";
import { Request } from 'express';
export declare class SiteController {
    private readonly siteService;
    constructor(siteService: SiteService);
    createStie(req: Request): Promise<import("./interfaces/sites.interface").Site[]>;
    resetSite(req: Request): Promise<import("./interfaces/sites.interface").Site>;
    duplicateSite(req: Request): Promise<import("./interfaces/sites.interface").Site[]>;
    changType(req: Request): Promise<import("./interfaces/sites.interface").Site[]>;
    deleteSite(req: Request): Promise<import("./interfaces/sites.interface").Site[]>;
    getSiteInfo(): Promise<import("./interfaces/sites.interface").Site[]>;
}

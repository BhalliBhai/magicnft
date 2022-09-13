import { TileService } from "./tiles.service";
import { Request } from 'express';
export declare class TileController {
    private readonly tileService;
    constructor(tileService: TileService);
    createTile(req: Request): Promise<import("./interfaces/tiles.interface").Tile>;
    getTilesInfo(req: Request): Promise<import("./interfaces/tiles.interface").Tile[]>;
    duplicateTiles(req: Request): Promise<void>;
    deleteTiles(req: Request): Promise<void>;
}

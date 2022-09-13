import { Model } from 'mongoose';
import { Tile } from './interfaces/tiles.interface';
import { CreateTileDto } from './dto/create-tile-data.dto';
export declare class TileService {
    private readonly tileModel;
    constructor(tileModel: Model<Tile>);
    create(createTileDto: CreateTileDto): Promise<Tile>;
    duplicate(tileDataDto: any): Promise<void>;
    getInfo(siteId: any): Promise<Tile[]>;
    deleteSeveral(id: any): Promise<void>;
}

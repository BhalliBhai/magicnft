import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Tile } from './interfaces/tiles.interface';
import { CreateTileDto } from './dto/create-tile-data.dto';

@Injectable()
export class TileService {
    constructor(
        @InjectModel('Tiles') private readonly tileModel: Model<Tile>,
    ) { }

    async create(createTileDto: CreateTileDto) {

        const newTile = new this.tileModel(createTileDto);
        await newTile.save();
        return newTile;
    }

    async duplicate(tileDataDto: any) {
        tileDataDto.tiles.map(async (item: any) => {
            const newTile = new this.tileModel({
                siteId: tileDataDto.siteId,
                tileType: item.tileType,
                tileValue: item.tileValue
            });
            // console.log(newTile);            
            await newTile.save();
        })
    }

    async getInfo(siteId: any) {
        const jsonData = await this.tileModel.find({ siteId: siteId });
        return jsonData;
    }

    async deleteSeveral(id: any) {
        // console.log(await this.tileModel.find({ siteId: id}));

        await this.tileModel.deleteMany({ siteId: id});
    }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const tiles_schema_1 = require("./schemas/tiles.schema");
const common_1 = require("@nestjs/common");
const tiles_controller_1 = require("./tiles.controller");
const tiles_service_1 = require("./tiles.service");
let TileModule = class TileModule {
};
TileModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Tiles', schema: tiles_schema_1.TileSchema }])
        ],
        controllers: [tiles_controller_1.TileController],
        providers: [tiles_service_1.TileService],
    })
], TileModule);
exports.TileModule = TileModule;
//# sourceMappingURL=tiles.module.js.map
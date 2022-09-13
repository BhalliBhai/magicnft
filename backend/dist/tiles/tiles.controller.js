"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileController = void 0;
const common_1 = require("@nestjs/common");
const tiles_service_1 = require("./tiles.service");
let TileController = class TileController {
    constructor(tileService) {
        this.tileService = tileService;
    }
    createTile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const tileDataDto = {
                siteId: req.body.siteId,
                tileType: req.body.tileType,
                tileValue: req.body.tileValue
            };
            return yield this.tileService.create(tileDataDto);
        });
    }
    getTilesInfo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tileService.getInfo(req.body.siteId);
        });
    }
    duplicateTiles(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = yield this.tileService.getInfo(req.body.originId);
            const tileDataDto = {
                siteId: req.body.siteId,
                tiles: temp
            };
            return yield this.tileService.duplicate(tileDataDto);
        });
    }
    deleteTiles(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tileService.deleteSeveral(req.body.id);
        });
    }
};
__decorate([
    common_1.Post('createtile'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TileController.prototype, "createTile", null);
__decorate([
    common_1.Post('tilesinfo'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TileController.prototype, "getTilesInfo", null);
__decorate([
    common_1.Post('duplicatetiles'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TileController.prototype, "duplicateTiles", null);
__decorate([
    common_1.Post('deletetiles'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TileController.prototype, "deleteTiles", null);
TileController = __decorate([
    common_1.Controller('tiles'),
    __metadata("design:paramtypes", [tiles_service_1.TileService])
], TileController);
exports.TileController = TileController;
//# sourceMappingURL=tiles.controller.js.map
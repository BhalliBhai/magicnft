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
exports.SiteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SiteService = class SiteService {
    constructor(siteModel) {
        this.siteModel = siteModel;
    }
    create(createSiteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const creatorSite = new this.siteModel(createSiteDto);
            yield creatorSite.save();
            return this.siteModel.find({});
        });
    }
    reset(resetDataDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempSite = yield this.siteModel.findOne({ siteUrl: resetDataDto.siteUrl });
            tempSite.siteType = resetDataDto.siteType;
            tempSite.siteName = resetDataDto.siteName;
            tempSite.siteDescription = resetDataDto.siteDescription;
            tempSite.siteThumbnail = resetDataDto.siteThumbnail;
            tempSite.published = resetDataDto.published;
            return yield tempSite.save();
        });
    }
    change(changeDataDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempSite = yield this.siteModel.findOne({ siteUrl: changeDataDto.siteUrl });
            tempSite.siteType = changeDataDto.type;
            yield tempSite.save();
            return this.siteModel.find({});
        });
    }
    delete(deleteDataDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.siteModel.deleteOne({ siteUrl: deleteDataDto.siteUrl });
            return this.siteModel.find({});
        });
    }
    duplicate(duplicateDataDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const creatorSite = new this.siteModel(duplicateDataDto);
            yield creatorSite.save();
            return this.siteModel.find({});
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonData = yield this.siteModel.find({});
            return jsonData;
        });
    }
};
SiteService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('CreatorSite')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SiteService);
exports.SiteService = SiteService;
//# sourceMappingURL=sites.service.js.map
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
exports.SiteController = void 0;
const common_1 = require("@nestjs/common");
const sites_service_1 = require("./sites.service");
let SiteController = class SiteController {
    constructor(siteService) {
        this.siteService = siteService;
    }
    createStie(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const siteDataDto = {
                creatorId: req.body.id,
                creatorEmail: req.body.email,
                siteUrl: req.body.url,
                allowed: req.body.allowed,
                published: req.body.published
            };
            return yield this.siteService.create(siteDataDto);
        });
    }
    resetSite(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetDataDto = {
                siteUrl: req.body.siteUrl,
                published: req.body.published,
                siteName: req.body.siteName,
                siteType: req.body.siteType,
                siteDescription: req.body.siteDescription,
                siteThumbnail: req.body.siteThumbnail
            };
            return yield this.siteService.reset(resetDataDto);
        });
    }
    duplicateSite(req) {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
            return yield this.siteService.duplicate(duplicateDataDto);
        });
    }
    changType(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeDataDto = {
                siteUrl: req.body.url,
                type: req.body.type
            };
            return yield this.siteService.change(changeDataDto);
        });
    }
    deleteSite(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.siteService.delete({ siteUrl: req.body.url });
        });
    }
    getSiteInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.siteService.getInfo();
        });
    }
};
__decorate([
    common_1.Post('createsite'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "createStie", null);
__decorate([
    common_1.Post('resetsite'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "resetSite", null);
__decorate([
    common_1.Post('duplicate'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "duplicateSite", null);
__decorate([
    common_1.Post('changetype'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "changType", null);
__decorate([
    common_1.Post('deletesite'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "deleteSite", null);
__decorate([
    common_1.Get('siteinfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "getSiteInfo", null);
SiteController = __decorate([
    common_1.Controller('creatorsite'),
    __metadata("design:paramtypes", [sites_service_1.SiteService])
], SiteController);
exports.SiteController = SiteController;
//# sourceMappingURL=sites.controller.js.map
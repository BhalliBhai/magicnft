"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const sites_schema_1 = require("./schemas/sites.schema");
const common_1 = require("@nestjs/common");
const sites_controller_1 = require("./sites.controller");
const sites_service_1 = require("./sites.service");
let SiteModule = class SiteModule {
};
SiteModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'CreatorSite', schema: sites_schema_1.SiteSchema }])
        ],
        controllers: [sites_controller_1.SiteController],
        providers: [sites_service_1.SiteService],
    })
], SiteModule);
exports.SiteModule = SiteModule;
//# sourceMappingURL=sites.module.js.map
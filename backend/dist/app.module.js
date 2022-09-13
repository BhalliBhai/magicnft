"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const article_module_1 = require("./article/article.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const sites_module_1 = require("./sites/sites.module");
const tiles_module_1 = require("./tiles/tiles.module");
const profile_module_1 = require("./profile/profile.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'build'),
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            article_module_1.ArticleModule,
            sites_module_1.SiteModule,
            tiles_module_1.TileModule,
            profile_module_1.ProfileModule
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
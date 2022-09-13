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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishSiteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PublishSiteDto {
}
__decorate([
    swagger_1.ApiModelProperty({
        example: 'A3Bdac3DK3sD3392223',
        description: 'The urls of the creator',
        format: 'string',
        uniqueItems: true,
        minLength: 5,
        maxLength: 255,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PublishSiteDto.prototype, "siteUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'True',
        description: 'creator pages published or unpublished',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], PublishSiteDto.prototype, "published", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'False',
        description: 'creator pages name',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PublishSiteDto.prototype, "siteName", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'This is about ***',
        description: 'creator pages description',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PublishSiteDto.prototype, "siteDescription", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'the thumbnail url',
        description: 'creator pages thumbnail url',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PublishSiteDto.prototype, "siteThumbnail", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'private',
        description: 'creator pages type',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PublishSiteDto.prototype, "siteType", void 0);
exports.PublishSiteDto = PublishSiteDto;
//# sourceMappingURL=publish-site-data.dto.js.map
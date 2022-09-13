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
exports.CreateSiteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSiteDto {
}
__decorate([
    swagger_1.ApiModelProperty({
        example: '5932939',
        description: 'The id of the creator',
        format: 'string',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSiteDto.prototype, "creatorId", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'pejman@gmail.com',
        description: 'The email of the creator',
        format: 'email',
        uniqueItems: true,
        minLength: 5,
        maxLength: 255,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSiteDto.prototype, "creatorEmail", void 0);
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
], CreateSiteDto.prototype, "siteUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'True',
        description: 'creator pages allow or unallowed',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateSiteDto.prototype, "allowed", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'False',
        description: 'creator pages published or unpublished',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateSiteDto.prototype, "published", void 0);
exports.CreateSiteDto = CreateSiteDto;
//# sourceMappingURL=create-site-data.dto.js.map
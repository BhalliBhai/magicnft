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
exports.SaveProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SaveProfileDto {
}
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
], SaveProfileDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'Benjamin Franklin',
        description: 'The profile name',
        format: 'string',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SaveProfileDto.prototype, "profileName", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'https://***.***/123.jpg',
        description: 'the url of the photo',
        format: 'string'
    }),
    __metadata("design:type", String)
], SaveProfileDto.prototype, "profilePhoto", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'Share our story with your community',
        description: 'short description about you',
        format: 'string'
    }),
    __metadata("design:type", String)
], SaveProfileDto.prototype, "profileBio", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'Travel Vlogger',
        description: 'The title of the profile',
        format: 'string'
    }),
    __metadata("design:type", String)
], SaveProfileDto.prototype, "profileTitle", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'https://***.***/123.jpg',
        description: 'the url of the cover photo',
        format: 'string'
    }),
    __metadata("design:type", String)
], SaveProfileDto.prototype, "coverPhoto", void 0);
exports.SaveProfileDto = SaveProfileDto;
//# sourceMappingURL=save-profile-data.dto.js.map
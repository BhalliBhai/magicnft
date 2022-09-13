import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class SaveProfileDto {


    @ApiModelProperty({
        example: 'pejman@gmail.com',
        description: 'The email of the creator',
        format: 'email',
        uniqueItems: true,
        minLength: 5,
        maxLength: 255,
    })
    @IsNotEmpty()
    readonly email: string;

    @ApiModelProperty({
        example: 'Benjamin Franklin',
        description: 'The profile name',
        format: 'string',
    })
    @IsNotEmpty()
    readonly profileName: string;

    @ApiModelProperty({
        example: 'https://***.***/123.jpg',
        description: 'the url of the photo',
        format: 'string'
    })
    readonly profilePhoto: string;    

    @ApiModelProperty({
        example: 'Share our story with your community',
        description: 'short description about you',
        format: 'string'
    })
    readonly profileBio: string;    

    @ApiModelProperty({
        example: 'Travel Vlogger',
        description: 'The title of the profile',
        format: 'string'
    })
    readonly profileTitle: string;    

    @ApiModelProperty({
        example: 'https://***.***/123.jpg',
        description: 'the url of the cover photo',
        format: 'string'
    })
    readonly coverPhoto: string;    

}
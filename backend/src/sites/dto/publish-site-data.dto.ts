import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class PublishSiteDto {

    @ApiModelProperty({
        example: 'A3Bdac3DK3sD3392223',
        description: 'The urls of the creator',
        format: 'string',
        uniqueItems: true,
        minLength: 5,
        maxLength: 255,
    })
    @IsNotEmpty()
    readonly siteUrl: string;

    @ApiModelProperty({
        example: 'True',
        description: 'creator pages published or unpublished',
    })
    @IsNotEmpty()
    readonly published: boolean;    

    @ApiModelProperty({
        example: 'False',
        description: 'creator pages name',
    })
    @IsNotEmpty()
    readonly siteName: string;    

    @ApiModelProperty({
        example: 'This is about ***',
        description: 'creator pages description',
    })
    @IsNotEmpty()
    readonly siteDescription: string;    

    @ApiModelProperty({
        example: 'the thumbnail url',
        description: 'creator pages thumbnail url',
    })
    @IsNotEmpty()
    readonly siteThumbnail: string;   
    
    @ApiModelProperty({
        example: 'private',
        description: 'creator pages type',
    })
    @IsNotEmpty()
    readonly siteType: string;
}
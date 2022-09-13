import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateSiteDto {

    @ApiModelProperty({
        example: '5932939',
        description: 'The id of the creator',
        format: 'string',
    })
    @IsNotEmpty()
    readonly creatorId: string;

    @ApiModelProperty({
        example: 'pejman@gmail.com',
        description: 'The email of the creator',
        format: 'email',
        uniqueItems: true,
        minLength: 5,
        maxLength: 255,
    })
    @IsNotEmpty()
    readonly creatorEmail: string;

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
        description: 'creator pages allow or unallowed',
    })
    @IsNotEmpty()
    readonly allowed: boolean;    

    @ApiModelProperty({
        example: 'False',
        description: 'creator pages published or unpublished',
    })
    @IsNotEmpty()
    readonly published: boolean;
}
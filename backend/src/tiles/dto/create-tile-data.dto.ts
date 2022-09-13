import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateTileDto {

    @ApiModelProperty({
        example: '234234234',
        description: 'The id of the site',
        format: 'string',
    })
    @IsNotEmpty()
    readonly siteId: string;

    @ApiModelProperty({
        example: 'gallery',
        description: 'the tile type of the site',
        format: 'string',
        uniqueItems: true,
        maxLength: 255,
    })
    @IsNotEmpty()
    readonly tileType: string;

    @ApiModelProperty({
        example: 'False',
        description: 'creator pages published or unpublished',
    })
    readonly tileValue: object;
}
import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResetCreatorDataDto {
    @ApiModelProperty({
      example: 'Benzamin@gmail.com',
      description: 'The email of the creator user',
      format: 'string',
      uniqueItems: true,
      minLength: 5,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    // invitecode
    @ApiModelProperty({
        example: '',
        description: 'The invite code of th creator user',
        format: 'string',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly inviteCode: string;

}

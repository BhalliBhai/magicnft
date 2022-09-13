import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResetDataDto {
    @ApiModelProperty({
      example: 'pejman@gmail.com',
      description: 'The email of the User',
      format: 'email',
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

    // fullName
    @ApiModelProperty({
        example: 'pejman hadavi',
        description: 'The name of the User',
        format: 'string',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly fullName: string;

    @ApiModelProperty({
        example: '0x33dCEc9b25f0480c1ed85D3EAf6Fe5EcEcc5c455',
        description: 'The account address of the user',
        format: 'string',
        minLength: 5,
        maxLength: 1024,
    })
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly accountAddress: string;

    @ApiModelProperty({
      example: 'super star of rock band in Tronto',
      description: 'social media handles',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly socialMedia: string;
  }

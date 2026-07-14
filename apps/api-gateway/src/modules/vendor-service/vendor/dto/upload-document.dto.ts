import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { DocumentType } from '../constant/document-enum';

export class UploadVendorDocumentDto {
  @ApiProperty({
    enum: DocumentType,
    example: DocumentType.GST_CERTIFICATE,
  })
  @IsEnum(DocumentType)
  documentType: DocumentType;
}
import { IsEnum } from "class-validator";
import { DocumentType } from '../../constant/document-enum';

export class UploadVendorDocumentDto {
  @IsEnum(DocumentType)
  documentType: DocumentType;
}
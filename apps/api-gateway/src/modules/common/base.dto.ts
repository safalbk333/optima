export class BaseDto {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: number;
}

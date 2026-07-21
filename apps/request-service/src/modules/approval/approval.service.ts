import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "libs/database/prisma-service";
import { CreateApprovalLevelDto, UpdateApprovalLevelDto } from "./dto/approval.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { ApprovalLevelProperties } from '../../common/properties/approval-level.properties';

@Injectable()
export class ApprovalLevelService {
  private readonly logger = new AppLogger(ApprovalLevelService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) { }

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient =
        await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  async create(objData: CreateApprovalLevelDto) {
    try {
      this.logger.log(ApprovalLevelProperties.service.create);
      const prisma =
        await this.getSchemaClient();

      const approvalLevel = await prisma.tbl_approval_level.create({
        data: {
          approval_level: objData.approval_level,
          min_amount: objData.min_amount,
          max_amount: objData.max_amount,
          description: objData.description,
          approver_roles: objData.approver_roles,
          is_active: objData.is_active,
        },
      });

      this.logger.log(`${ApprovalLevelProperties.service.create}: ${approvalLevel.approval_level}`);
      return ResponseHelper.success(
        approvalLevel,
        "Approval level created successfully",
      );
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      return ResponseHelper.error("Failed to create approval level", error.message);
    }
  }
  async findAll() {
    try {
      this.logger.log(ApprovalLevelProperties.service.findAll);
      const prisma =
        await this.getSchemaClient();

      const approvalLevels = await prisma.tbl_approval_level.findMany({
        where: {
          is_active: true,
        }
      });

      this.logger.log(ApprovalLevelProperties.service.findAll);
      return ResponseHelper.success(
        approvalLevels,
        "Approval levels fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      return ResponseHelper.error("Failed to fetch purchase requests", error.message);
    }
  }
  
  async findOne(level: string) {
    try {
      this.logger.log(`${ApprovalLevelProperties.service.findOne}: ${level}`);
      const prisma =
        await this.getSchemaClient();

      const approvalLevel = await prisma.tbl_approval_level.findUnique({
        where: { approval_level: level },
      });

      if (!approvalLevel) {
        throw new NotFoundException("Approval level not found");
      }

      this.logger.log(`${ApprovalLevelProperties.service.findOne}: ${level}`);
      return ResponseHelper.success(
        approvalLevel,
        "Approval level fetched successfully",
      );
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, objData: UpdateApprovalLevelDto) {
    try {
      this.logger.log(`${ApprovalLevelProperties.service.update}: ${id}`);
      const prisma =
        await this.getSchemaClient();

      const approvalLevel = await prisma.tbl_approval_level.findUnique({
        where: { pk_approval_level_id: id },
      });

      if (!approvalLevel) {
        throw new BadRequestException("Approval level not found");
      }

      const updatedApprovalLevel = await prisma.tbl_approval_level.update({
        where: { pk_approval_level_id: id },
        data: {
          approval_level: objData.approval_level,
          min_amount: objData.min_amount,
          max_amount: objData.max_amount,
          description: objData.description,
          approver_roles: objData.approver_roles,
          is_active: objData.is_active,
        },
      });

      this.logger.log(`${ApprovalLevelProperties.service.update}: ${id}`);
      return ResponseHelper.success(
        updatedApprovalLevel,
        "Approval level updated successfully",
      );
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.log(`${ApprovalLevelProperties.service.delete}: ${id}`);
      const prisma =
        await this.getSchemaClient();

      const approvalLevel = await prisma.tbl_approval_level.findUnique({
        where: { approval_level: id },
      });

      if (!approvalLevel) {
        throw new NotFoundException("Approval level not found");
      }

      const deletedApprovalLevel = await prisma.tbl_approval_level.delete({
        where: { pk_approval_level_id: id },
      });

      this.logger.log(`${ApprovalLevelProperties.service.delete}: ${id}`);
      return ResponseHelper.success(
        deletedApprovalLevel,
        "Approval level deleted successfully",
      );
    } catch (error) {
      this.logger.error(
        error.stack,
      );
      throw error;
    }
  }
}

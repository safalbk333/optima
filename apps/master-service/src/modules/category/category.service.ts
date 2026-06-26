import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from ".././../../../../libs/database/prisma-service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { MoveCategoryDto } from "./dto/move-category.dto";
import { ResponseHelper } from "libs/common/utils/helper/response.helper";
import { AppLogger } from '../../common/logger/app.logger';
import { CategoryProperties } from '../../common/properties/category.properties';

@Injectable()
export class CategoryService {
  private readonly logger = new AppLogger(CategoryService.name);
  private schemaClient: any;

  constructor(private readonly prisma: PrismaService) { }

  // ─── Client ───────────────────────────────────────────────────────────────

  private async getSchemaClient() {
    if (!this.schemaClient) {
      this.schemaClient = await this.prisma.getClient('public');
    }
    return this.schemaClient;
  }

  // ─── Internal helpers ─────────────────────────────────────────────────────

  /**
   * Shared "not deleted" filter used in every lookup.
   * Schema uses is_delete (boolean) — NOT deleted_at alone.
   */
  private get activeFilter() {
    return { is_delete: false };
  }

  /**
   * Throws NotFoundException when the record is missing or soft-deleted.
   */
  private assertExists(objCategory: any, strId: string): void {
    if (!objCategory || objCategory.is_delete) {
      throw new NotFoundException(`Category not found: ${strId}`);
    }
  }

  /**
   * Recursively builds a nested tree from a flat list.
   * O(n) — single pass with a Map.
   */
  private buildTree(arrCategories: any[]): any[] {
    const mapById = new Map<string, any>();

    for (const cat of arrCategories) {
      mapById.set(cat.pk_category_id, { ...cat, children: [] });
    }

    const arrRoots: any[] = [];

    for (const node of mapById.values()) {
      if (node.parent_category_id) {
        const parent = mapById.get(node.parent_category_id);
        if (parent) {
          parent.children.push(node);
        } else {
          // Parent was filtered out (e.g. inactive); promote to root
          arrRoots.push(node);
        }
      } else {
        arrRoots.push(node);
      }
    }

    return arrRoots;
  }

  /**
   * Collects all descendant IDs of a node (inclusive) via BFS.
   * Used to prevent circular moves.
   */
  private async getDescendantIds(
    prisma: any,
    strRootId: string,
  ): Promise<Set<string>> {
    const setIds = new Set<string>([strRootId]);
    const arrQueue = [strRootId];

    while (arrQueue.length > 0) {
      const strCurrentId = arrQueue.shift()!;
      const arrChildren = await prisma.tbl_category.findMany({
        where: {
          parent_category_id: strCurrentId,
          ...this.activeFilter,
        },
        select: { pk_category_id: true },
      });

      for (const child of arrChildren) {
        if (!setIds.has(child.pk_category_id)) {
          setIds.add(child.pk_category_id);
          arrQueue.push(child.pk_category_id);
        }
      }
    }

    return setIds;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * GET /categories
   * Returns all active categories as a nested tree.
   */
  async findAll() {
    try {
      this.logger.log(CategoryProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const arrCategories = await prisma.tbl_category.findMany({
        where: { is_active: true, ...this.activeFilter },
        orderBy: [{ hierarchy_level: 'asc' }, { category_name: 'asc' }],
      });

      const arrTree = this.buildTree(arrCategories);

      this.logger.log(CategoryProperties.service.findAll.success);
      return ResponseHelper.success(arrTree, "Categories fetched successfully");
    } catch (error) {
      this.logger.error(CategoryProperties.service.findAll.error, error.stack);
      return ResponseHelper.error("Failed to fetch categories", error.message);
    }
  }

  /**
   * GET /categories/roots
   * Returns only top-level (root) categories — hierarchy_level = 1.
   */
  async findRoots() {
    try {
      this.logger.log(CategoryProperties.service.findAll.start);
      const prisma = await this.getSchemaClient();

      const arrRoots = await prisma.tbl_category.findMany({
        where: {
          is_active: true,
          ...this.activeFilter,
          hierarchy_level: 1,
          parent_category_id: null,
        },
        orderBy: { category_name: 'asc' },
      });

      this.logger.log(CategoryProperties.service.findAll.success);
      return ResponseHelper.success(arrRoots, "Root categories fetched successfully");
    } catch (error) {
      this.logger.error(CategoryProperties.service.findAll.error, error.stack);
      return ResponseHelper.error("Failed to fetch root categories", error.message);
    }
  }

  /**
   * GET /categories/:id
   * Returns a single category node (no children).
   */
  async findOne(strId: string) {
    try {
      this.logger.log(`${CategoryProperties.service.findOne.start}: ${strId}`);
      const prisma = await this.getSchemaClient();

      const objCategory = await prisma.tbl_category.findUnique({
        where: { pk_category_id: strId },
      });

      this.assertExists(objCategory, strId);

      this.logger.log(`${CategoryProperties.service.findOne.success}: ${strId}`);
      return ResponseHelper.success(objCategory, "Category fetched successfully");
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.findOne.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * GET /categories/:id/subtree
   * Returns the node and all its descendants as a nested tree.
   */
  async findSubtree(strId: string) {
    try {
      this.logger.log(`${CategoryProperties.service.findOne.start} subtree: ${strId}`);
      const prisma = await this.getSchemaClient();

      const objRoot = await prisma.tbl_category.findUnique({
        where: { pk_category_id: strId },
      });
      this.assertExists(objRoot, strId);

      // Collect all descendant IDs then fetch them in one query
      const setDescendantIds = await this.getDescendantIds(prisma, strId);
      const arrNodes = await prisma.tbl_category.findMany({
        where: {
          pk_category_id: { in: [...setDescendantIds] },
          is_active: true,
          ...this.activeFilter,
        },
        orderBy: [{ hierarchy_level: 'asc' }, { category_name: 'asc' }],
      });

      // Build tree rooted at strId
      const mapById = new Map<string, any>();
      for (const node of arrNodes) {
        mapById.set(node.pk_category_id, { ...node, children: [] });
      }

      let objTreeRoot: any = null;
      for (const node of mapById.values()) {
        if (node.pk_category_id === strId) {
          objTreeRoot = node;
          continue;
        }
        const parent = mapById.get(node.parent_category_id);
        if (parent) {
          parent.children.push(node);
        }
      }

      this.logger.log(`${CategoryProperties.service.findOne.success} subtree: ${strId}`);
      return ResponseHelper.success(objTreeRoot, "Subtree fetched successfully");
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.findOne.error} subtree: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * GET /categories/:id/ancestors
   * Returns the chain of ancestors from root → parent (excluding the node itself).
   */
  async findAncestors(strId: string) {
    try {
      this.logger.log(`${CategoryProperties.service.findOne.start} ancestors: ${strId}`);
      const prisma = await this.getSchemaClient();

      const objStart = await prisma.tbl_category.findUnique({
        where: { pk_category_id: strId },
      });
      this.assertExists(objStart, strId);

      const arrAncestors: any[] = [];
      let strCurrentParentId: string | null = objStart.parent_category_id;

      while (strCurrentParentId) {
        const objAncestor = await prisma.tbl_category.findUnique({
          where: { pk_category_id: strCurrentParentId },
        });

        if (!objAncestor || objAncestor.is_delete) break;

        arrAncestors.unshift(objAncestor); // prepend → root-first order
        strCurrentParentId = objAncestor.parent_category_id;
      }

      this.logger.log(`${CategoryProperties.service.findOne.success} ancestors: ${strId}`);
      return ResponseHelper.success(arrAncestors, "Ancestors fetched successfully");
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.findOne.error} ancestors: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * POST /categories
   * Creates a new category node.
   * - If parent_category_id is provided, hierarchy_level = parent.hierarchy_level + 1
   * - Otherwise hierarchy_level = 1 (root)
   */
  async create(objData: CreateCategoryDto, strCreatedById?: string) {
    try {
      this.logger.log(CategoryProperties.service.create.start);
      const prisma = await this.getSchemaClient();

      let intHierarchyLevel = 1;

      if (objData.strParentCategoryId) {
        const objParent = await prisma.tbl_category.findUnique({
          where: { pk_category_id: objData.strParentCategoryId },
        });
        this.assertExists(objParent, objData.strParentCategoryId);
        intHierarchyLevel = objParent.hierarchy_level + 1;
      }

      const objCategory = await prisma.tbl_category.create({
        data: {
          category_name: objData.strCategoryName,
          hierarchy_level: intHierarchyLevel,
          parent_category_id: objData.strParentCategoryId ?? null,
          fk_created_id: strCreatedById ?? null,
        },
      });

      this.logger.log(`${CategoryProperties.service.create.success}: ${objCategory.pk_category_id}`);
      return ResponseHelper.success(objCategory, "Category created successfully");
    } catch (error) {
      this.logger.error(CategoryProperties.service.create.error, error.stack);
      throw error;
    }
  }

  /**
   * PATCH /categories/:id
   * Updates name and/or is_active. Does NOT change tree position (use move for that).
   */
  async update(strId: string, objData: UpdateCategoryDto, strModifiedById?: string) {
    try {
      this.logger.log(`${CategoryProperties.service.update.start}: ${strId}`);
      const prisma = await this.getSchemaClient();

      const objCategory = await prisma.tbl_category.findUnique({
        where: { pk_category_id: strId },
      });
      this.assertExists(objCategory, strId);

      const objUpdateData: any = {
        modified: new Date(),
        fk_modified_id: strModifiedById ?? null,
      };

      if (objData.strCategoryName !== undefined) {
        objUpdateData.category_name = objData.strCategoryName;
      }
      if (objData.blnIsActive !== undefined) {
        objUpdateData.is_active = objData.blnIsActive;
      }

      const objUpdatedCategory = await prisma.tbl_category.update({
        where: { pk_category_id: strId },
        data: objUpdateData,
      });

      this.logger.log(`${CategoryProperties.service.update.success}: ${strId}`);
      return ResponseHelper.success(objUpdatedCategory, "Category updated successfully");
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.update.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * PATCH /categories/:id/move
   * Moves a node (and its entire subtree) to a new parent (or to root if
   * strNewParentId is null). Recalculates hierarchy_level for every affected node.
   *
   * Guards against:
   *  - Moving a node under one of its own descendants (circular reference)
   *  - Moving a node to its current parent (no-op → 400)
   */
  async move(strId: string, objData: MoveCategoryDto, strModifiedById?: string) {
    try {
      this.logger.log(`${CategoryProperties.service.update.start} move: ${strId}`);
      const prisma = await this.getSchemaClient();

      const objCategory = await prisma.tbl_category.findUnique({
        where: { pk_category_id: strId },
      });
      this.assertExists(objCategory, strId);

      const strNewParentId = objData.strNewParentCategoryId ?? null;

      // Guard: no-op move
      if (objCategory.parent_category_id === strNewParentId) {
        throw new BadRequestException(
          "Category is already under the specified parent.",
        );
      }

      // Guard: circular reference — new parent must not be in the subtree of strId
      const setSubtreeIds = await this.getDescendantIds(prisma, strId);
      if (strNewParentId && setSubtreeIds.has(strNewParentId)) {
        throw new BadRequestException(
          "Cannot move a category under one of its own descendants.",
        );
      }

      // Determine the new base level
      let intNewBaseLevel = 1;
      if (strNewParentId) {
        const objNewParent = await prisma.tbl_category.findUnique({
          where: { pk_category_id: strNewParentId },
        });
        this.assertExists(objNewParent, strNewParentId);
        intNewBaseLevel = objNewParent.hierarchy_level + 1;
      }

      const intLevelDelta = intNewBaseLevel - objCategory.hierarchy_level;

      // Fetch all descendants (excluding the node itself) to update their levels
      const arrDescendantIds = [...setSubtreeIds].filter(id => id !== strId);

      // Run everything in a transaction
      await prisma.$transaction(async (tx: any) => {
        // Update the moved node
        await tx.tbl_category.update({
          where: { pk_category_id: strId },
          data: {
            parent_category_id: strNewParentId,
            hierarchy_level: intNewBaseLevel,
            modified: new Date(),
            fk_modified_id: strModifiedById ?? null,
          },
        });

        // Shift hierarchy_level of every descendant by the same delta
        if (arrDescendantIds.length > 0 && intLevelDelta !== 0) {
          await tx.tbl_category.updateMany({
            where: { pk_category_id: { in: arrDescendantIds } },
            data: {
              hierarchy_level: { increment: intLevelDelta },
              modified: new Date(),
            },
          });
        }
      });

      // Return the updated node
      const objUpdated = await prisma.tbl_category.findUnique({
        where: { pk_category_id: strId },
      });

      this.logger.log(`${CategoryProperties.service.update.success} move: ${strId}`);
      return ResponseHelper.success(objUpdated, "Category moved successfully");
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.update.error} move: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * DELETE /categories/:id
   * Soft-deletes a node. Optionally cascades to the entire subtree.
   */
  async delete(strId: string, blnCascade = false) {
    try {
      this.logger.log(`${CategoryProperties.service.delete.start}: ${strId}`);
      const prisma = await this.getSchemaClient();

      const objCategory = await prisma.tbl_category.findUnique({
        where: { pk_category_id: strId },
      });
      this.assertExists(objCategory, strId);

      const setIdsToDelete = blnCascade
        ? await this.getDescendantIds(prisma, strId)
        : new Set([strId]);

      await prisma.tbl_category.updateMany({
        where: { pk_category_id: { in: [...setIdsToDelete] } },
        data: {
          deleted_at: new Date(),
          is_delete: true,
          is_active: false,
        },
      });

      this.logger.log(`${CategoryProperties.service.delete.success}: ${strId}`);
      return ResponseHelper.success(
        { deleted_count: setIdsToDelete.size },
        `Category${blnCascade ? " and subtree" : ""} deleted successfully`,
      );
    } catch (error) {
      this.logger.error(
        `${CategoryProperties.service.delete.error}: ${strId}`,
        error.stack,
      );
      throw error;
    }
  }
}
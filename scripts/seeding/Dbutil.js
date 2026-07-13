const { Pool } = require("pg");
const crypto = require("crypto");

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   database: "optima_app",
//   user: "postgres",
//   password: "postgres",
// });

const pool = new Pool({
  host: "aws-1-ap-southeast-1.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  user: "postgres.zigydrirusbryrcfjbtf",
  password: "8whT9db9NY69ZMaG",
});

async function executeQuery(query, params = []) {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (e) {
    console.error("Error:", e.message);
    return null;
  } finally {
    client.release();
  }
}

// ============================================================================
// GENERIC HELPERS
// Every insert*/read* function below is a thin wrapper around these two, so
// every table behaves consistently:
//   - pk is optional; if omitted, a uuid is generated in Node (crypto.randomUUID())
//     rather than relying on a DB-level default existing for the pk column
//   - created/modified (or created_at/updated_at) are stamped with NOW()
//   - every column name is double-quoted so reserved words (e.g. `order` on
//     tbl_request_phase / tbl_approval_level) never break the generated SQL
//   - JS objects passed as values (e.g. for jsonb columns) are serialized to
//     JSON automatically by node-postgres
// ============================================================================

async function _insert(table, pkCol, pkVal, fields, timestampCols = ["created", "modified"]) {
  const finalPkVal = pkVal == null ? crypto.randomUUID() : pkVal;

  const columns = [`"${pkCol}"`];
  const placeholders = ["$1"];
  const values = [finalPkVal];

  let i = 2;
  for (const [col, val] of Object.entries(fields)) {
    columns.push(`"${col}"`);
    placeholders.push(`$${i}`);
    values.push(val === undefined ? null : val);
    i += 1;
  }

  for (const tcol of timestampCols) {
    columns.push(`"${tcol}"`);
    placeholders.push("NOW()");
  }

  const sql = `
    INSERT INTO ${table} (${columns.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING "${pkCol}";
  `;

  const rows = await executeQuery(sql, values);
  return rows && rows.length ? rows[0] : null;
}

async function _readByPk(table, pkCol, pkVal) {
  const sql = `SELECT * FROM ${table} WHERE "${pkCol}" = $1;`;
  const rows = await executeQuery(sql, [pkVal]);
  return rows && rows.length ? rows[0] : null;
}

async function _readByField(table, field, value) {
  const sql = `SELECT * FROM ${table} WHERE "${field}" = $1;`;
  const rows = await executeQuery(sql, [value]);
  return rows && rows.length ? rows[0] : null;
}

async function listTable(table, isDeleteCol = "is_delete", includeDeleted = false) {
  const sql =
    includeDeleted || isDeleteCol == null
      ? `SELECT * FROM ${table};`
      : `SELECT * FROM ${table} WHERE "${isDeleteCol}" = FALSE;`;
  return executeQuery(sql);
}

// ============================================================================
// USERS & ROLES
// ============================================================================

async function insertUser({
  userName,
  userEmail,
  userPhone,
  fkCompanyId,
  fkRoleId,
  keycloakId,
  pkUserId = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isActive = true,
  isDelete = false,
}) {
  const fields = {
    keycloak_id: keycloakId,
    fk_role_id: fkRoleId,
    user_name: userName,
    user_email: userEmail,
    user_phone: userPhone,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    fk_company_id: fkCompanyId,
    is_delete: isDelete,
  };
  return _insert("tbl_user", "pk_user_id", pkUserId, fields);
}

function readUser(pkUserId) {
  return _readByPk("tbl_user", "pk_user_id", pkUserId);
}

function readUserByEmail(userEmail) {
  return _readByField("tbl_user", "user_email", userEmail);
}

async function insertUserRole({
  roleName,
  roleCode,
  pkRoleId = null,
  description = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    role_name: roleName,
    role_code: roleCode,
    description,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_user_role", "pk_role_id", pkRoleId, fields);
}

function readUserRole(pkRoleId) {
  return _readByPk("tbl_user_role", "pk_role_id", pkRoleId);
}

async function insertActivation({
  fkUserId,
  tokenHash,
  expiresAt,
  pkActivationTokenId = null,
  usedAt = null,
  isUsed = false,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    fk_user_id: fkUserId,
    token_hash: tokenHash,
    expires_at: expiresAt,
    used_at: usedAt,
    is_used: isUsed,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_activations", "pk_activation_token_id", pkActivationTokenId, fields);
}

function readActivation(pkActivationTokenId) {
  return _readByPk("tbl_activations", "pk_activation_token_id", pkActivationTokenId);
}

// ============================================================================
// GEOGRAPHY
// ============================================================================

async function insertCountry({
  countryName,
  countryCode,
  pkCountryId = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isActive = true,
  isDelete = false,
}) {
  const fields = {
    country_name: countryName,
    country_code: countryCode,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_country", "pk_country_id", pkCountryId, fields);
}

function readCountry({ pkCountryId = null, countryName = null, countryCode = null } = {}) {
  if (pkCountryId) return _readByPk("tbl_country", "pk_country_id", pkCountryId);
  if (countryName) return _readByField("tbl_country", "country_name", countryName);
  if (countryCode) return _readByField("tbl_country", "country_code", countryCode);
  throw new Error("At least one parameter must be provided");
}

async function insertCity({
  cityName,
  fkCountryId,
  pkCityId = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    city_name: cityName,
    fk_country_id: fkCountryId,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_city", "pk_city_id", pkCityId, fields);
}

function readCity(pkCityId) {
  return _readByPk("tbl_city", "pk_city_id", pkCityId);
}

// ============================================================================
// COMPANY & CURRENCY
// ============================================================================

async function insertCompany({
  companyName = null,
  companyCode = null,
  companyEmail = null,
  companyPhone = null,
  pkCompanyId = null,
  companyAddress = null,
  city = null,
  state = null,
  country = null,
  postalCode = null,
  website = null,
  taxNumber = null,
  currency = null,
  logoUrl = null,
  isActive = true,
  isDelete = false,
} = {}) {
  const fields = {
    company_name: companyName,
    company_code: companyCode,
    company_email: companyEmail,
    company_phone: companyPhone,
    company_address: companyAddress,
    city,
    state,
    country,
    postal_code: postalCode,
    website,
    tax_number: taxNumber,
    currency,
    logo_url: logoUrl,
    is_active: isActive,
    is_delete: isDelete,
  };
  return _insert("tbl_company", "pk_company_id", pkCompanyId, fields);
}

function readCompany({ pkCompanyId = null, companyCode = null, companyEmail = null } = {}) {
  if (pkCompanyId) return _readByPk("tbl_company", "pk_company_id", pkCompanyId);
  if (companyCode) return _readByField("tbl_company", "company_code", companyCode);
  if (companyEmail) return _readByField("tbl_company", "company_email", companyEmail);
  throw new Error("At least one parameter must be provided");
}

async function insertCurrency({
  currencyName,
  currencyCode,
  symbol,
  pkCurrencyId = null,
  description = null,
  isActive = true,
  isDelete = false,
}) {
  const fields = {
    currency_name: currencyName,
    currency_code: currencyCode,
    symbol,
    description,
    is_active: isActive,
    is_delete: isDelete,
  };
  return _insert("tbl_currency", "pk_currency_id", pkCurrencyId, fields);
}

function readCurrency({ pkCurrencyId = null, currencyCode = null } = {}) {
  if (pkCurrencyId) return _readByPk("tbl_currency", "pk_currency_id", pkCurrencyId);
  if (currencyCode) return _readByField("tbl_currency", "currency_code", currencyCode);
  throw new Error("At least one parameter must be provided");
}

// ============================================================================
// ORG / LOOKUP TABLES
// ============================================================================

async function insertDepartment({
  departmentName,
  departmentCode,
  pkDepartmentId = null,
  description = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    department_name: departmentName,
    department_code: departmentCode,
    description,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_department", "pk_department_id", pkDepartmentId, fields);
}

function readDepartment(pkDepartmentId) {
  return _readByPk("tbl_department", "pk_department_id", pkDepartmentId);
}

async function insertCategory({
  categoryName,
  hierarchyLevel,
  pkCategoryId = null,
  parentCategoryId = null,
  isActive = true,
  isDelete = false,
  fkCreatedId = null,
  fkModifiedId = null,
}) {
  const fields = {
    category_name: categoryName,
    hierarchy_level: hierarchyLevel,
    parent_category_id: parentCategoryId,
    is_active: isActive,
    is_delete: isDelete,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
  };
  return _insert("tbl_category", "pk_category_id", pkCategoryId, fields);
}

function readCategory(pkCategoryId) {
  return _readByPk("tbl_category", "pk_category_id", pkCategoryId);
}

async function insertRequestPhase({
  phaseName,
  phaseCode,
  order,
  pkRequestPhaseId = null,
  description = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    phase_name: phaseName,
    phase_code: phaseCode,
    description,
    order,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_request_phase", "pk_request_phase_id", pkRequestPhaseId, fields);
}

function readRequestPhase(pkRequestPhaseId) {
  return _readByPk("tbl_request_phase", "pk_request_phase_id", pkRequestPhaseId);
}

async function insertNotificationType({
  typeName,
  typeCode,
  pkNotificationTypeId = null,
  description = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    type_name: typeName,
    type_code: typeCode,
    description,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_notification_type", "pk_notification_type_id", pkNotificationTypeId, fields);
}

function readNotificationType(pkNotificationTypeId) {
  return _readByPk("tbl_notification_type", "pk_notification_type_id", pkNotificationTypeId);
}

async function insertSlaPolicy({
  policyName,
  policyCode,
  responseTimeMins,
  resolutionTimeMins,
  escalationTimeMins,
  pkSlaPolicyId = null,
  description = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    policy_name: policyName,
    policy_code: policyCode,
    description,
    response_time_mins: responseTimeMins,
    resolution_time_mins: resolutionTimeMins,
    escalation_time_mins: escalationTimeMins,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_sla_policy", "pk_sla_policy_id", pkSlaPolicyId, fields);
}

function readSlaPolicy(pkSlaPolicyId) {
  return _readByPk("tbl_sla_policy", "pk_sla_policy_id", pkSlaPolicyId);
}

async function insertApprovalLevel({
  approvalLevel,
  order,
  fromAmount,
  toAmount,
  pkApprovalLevelId = null,
  description = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    approval_level: approvalLevel,
    description,
    order,
    is_active: isActive,
    from_amount: fromAmount,
    to_amount: toAmount,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_approval_level", "pk_approval_level_id", pkApprovalLevelId, fields);
}

function readApprovalLevel(pkApprovalLevelId) {
  return _readByPk("tbl_approval_level", "pk_approval_level_id", pkApprovalLevelId);
}

// ============================================================================
// VENDOR & ITEM
// ============================================================================

async function insertVendor({
  companyLegalName,
  contactPerson,
  email,
  phone,
  companyType,
  yearOfEstablishment,
  officeAddress,
  gstNumber,
  panNumber,
  msmeStatus,
  bank,
  natureOfBusiness,
  categoriesOfSupply,
  fkCountryId,
  fkCityId,
  status,
  pkVendorId = null,
  tradingName = null,
  notes = null,
  fkCreatedId = null,
  fkModifiedId = null,
  fkCompanyId = null,
  isDelete = false,
}) {
  const fields = {
    company_legal_name: companyLegalName,
    trading_name: tradingName,
    contact_person: contactPerson,
    email,
    phone,
    company_type: companyType,
    year_of_establishment: yearOfEstablishment,
    office_address: officeAddress,
    GST_number: gstNumber,
    PAN_number: panNumber,
    MSME_status: msmeStatus,
    bank,
    nature_of_business: natureOfBusiness,
    categories_of_supply: categoriesOfSupply,
    fk_country_id: fkCountryId,
    fk_city_id: fkCityId,
    status,
    notes,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    fk_company_id: fkCompanyId,
    is_delete: isDelete,
  };
  return _insert("tbl_vendor", "pk_vendor_id", pkVendorId, fields);
}

function readVendor(pkVendorId) {
  return _readByPk("tbl_vendor", "pk_vendor_id", pkVendorId);
}

function readVendorByEmail(email) {
  return _readByField("tbl_vendor", "email", email);
}

async function insertItem({
  itemName,
  itemCode,
  fkCategoryId,
  rcFlag,
  pkItemId = null,
  unit = null,
  hsnCode = null,
  description = null,
  documents = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isActive = true,
}) {
  const fields = {
    item_name: itemName,
    item_code: itemCode,
    fk_category_id: fkCategoryId,
    unit,
    rc_flag: rcFlag,
    hsn_code: hsnCode,
    description,
    documents,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_active: isActive,
  };
  return _insert("tbl_item", "pk_item_id", pkItemId, fields);
}

function readItem(pkItemId) {
  return _readByPk("tbl_item", "pk_item_id", pkItemId);
}

function readItemByCode(itemCode) {
  return _readByField("tbl_item", "item_code", itemCode);
}

// ============================================================================
// PURCHASE REQUEST FLOW
// ============================================================================

async function insertPurchaseRequest({
  requestNumber,
  title,
  status,
  fkRequestedById,
  pkRequestId = null,
  description = null,
  estimatedValue = null,
  currency = "USD",
  fkDepartmentId = null,
  fkCategoryId = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    request_number: requestNumber,
    title,
    description,
    status,
    estimated_value: estimatedValue,
    currency,
    fk_requested_by_id: fkRequestedById,
    fk_department_id: fkDepartmentId,
    fk_category_id: fkCategoryId,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_purchase_request", "pk_request_id", pkRequestId, fields);
}

function readPurchaseRequest(pkRequestId) {
  return _readByPk("tbl_purchase_request", "pk_request_id", pkRequestId);
}

function readPurchaseRequestByNumber(requestNumber) {
  return _readByField("tbl_purchase_request", "request_number", requestNumber);
}

async function insertPrItemMapping({
  fkRequestId,
  fkItemId,
  itemDescription,
  quantity,
  pkPrItemMappingId = null,
  unitOfMeasure = null,
  estimatedUnitPrice = null,
  totalPrice = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    fk_request_id: fkRequestId,
    fk_item_id: fkItemId,
    item_description: itemDescription,
    quantity,
    unit_of_measure: unitOfMeasure,
    estimated_unit_price: estimatedUnitPrice,
    total_price: totalPrice,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert(
    "tbl_purchase_request_item_mapping",
    "pk_pr_item_mapping_id",
    pkPrItemMappingId,
    fields
  );
}

function readPrItemMapping(pkPrItemMappingId) {
  return _readByPk("tbl_purchase_request_item_mapping", "pk_pr_item_mapping_id", pkPrItemMappingId);
}

async function insertApproval({
  fkRequestId,
  fkApproverId,
  fkApprovalLevelId,
  pkApprovalId = null,
  status = "PENDING",
  comment = null,
  actionedAt = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    fk_request_id: fkRequestId,
    fk_approver_id: fkApproverId,
    fk_approval_level_id: fkApprovalLevelId,
    status,
    comment,
    actioned_at: actionedAt,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_approval", "pk_approval_id", pkApprovalId, fields);
}

function readApproval(pkApprovalId) {
  return _readByPk("tbl_approval", "pk_approval_id", pkApprovalId);
}

async function insertRequestHistory({
  fkRequestId,
  fkToStatus,
  fkToPhaseId,
  fkChangedById,
  pkStatusHistoryId = null,
  fkFromStatus = null,
  fkFromPhaseId = null,
  comment = null,
  metadata = null,
}) {
  const fields = {
    fk_request_id: fkRequestId,
    fk_from_status: fkFromStatus,
    fk_to_status: fkToStatus,
    fk_from_phase_id: fkFromPhaseId,
    fk_to_phase_id: fkToPhaseId,
    fk_changed_by_id: fkChangedById,
    comment,
    metadata,
  };
  // tbl_request_history only has `created`, no `modified`
  return _insert("tbl_request_history", "pk_status_history_id", pkStatusHistoryId, fields, [
    "created",
  ]);
}

function readRequestHistory(pkStatusHistoryId) {
  return _readByPk("tbl_request_history", "pk_status_history_id", pkStatusHistoryId);
}

async function insertAttachmentMaster({
  entityType,
  fkEntityId,
  folderPath,
  fkUploadedById,
  pkAttchmentMasterId = null,
  fkPhaseId = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    entity_type: entityType,
    fk_entity_id: fkEntityId,
    folder_path: folderPath,
    fk_phase_id: fkPhaseId,
    fk_uploaded_by_id: fkUploadedById,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_request_attachment_master", "pk_attchment_master_id", pkAttchmentMasterId, fields);
}

function readAttachmentMaster(pkAttchmentMasterId) {
  return _readByPk("tbl_request_attachment_master", "pk_attchment_master_id", pkAttchmentMasterId);
}

async function insertRequestAttachment({
  fkAttchmentMasterId,
  fkRequestId,
  fileName,
  fileUrl,
  fileType,
  fkUploadedById,
  pkRequestAttchmentId = null,
  fileSize = null,
  fkPhaseId = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    fk_attchment_master_id: fkAttchmentMasterId,
    fk_request_id: fkRequestId,
    file_name: fileName,
    file_url: fileUrl,
    file_type: fileType,
    file_size: fileSize,
    fk_uploaded_by_id: fkUploadedById,
    fk_phase_id: fkPhaseId,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_request_attachments", "pk_request_attchment_id", pkRequestAttchmentId, fields);
}

function readRequestAttachment(pkRequestAttchmentId) {
  return _readByPk("tbl_request_attachments", "pk_request_attchment_id", pkRequestAttchmentId);
}

// ============================================================================
// SOURCING: CONTRACT, EOI, RFQ, QUOTATION, PURCHASE ORDER
// ============================================================================

async function insertContract({
  title,
  startDate,
  endDate,
  value,
  fkVendorId,
  pkContractId = null,
  contractCode = null,
  description = null,
  status = "DRAFT",
  fkRequestId = null,
  fkCreatedId = null,
  fkModifiedId = null,
  renderedHtml = null,
  isDelete = false,
}) {
  const fields = {
    contract_code: contractCode,
    title,
    description,
    status,
    start_date: startDate,
    end_date: endDate,
    value,
    fk_vendor_id: fkVendorId,
    fk_request_id: fkRequestId,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    rendered_html: renderedHtml,
    is_delete: isDelete,
  };
  return _insert("tbl_contract", "pk_contract_id", pkContractId, fields);
}

function readContract(pkContractId) {
  return _readByPk("tbl_contract", "pk_contract_id", pkContractId);
}

async function insertEoi({
  eoiCode,
  eoiTitle,
  fkRequestId,
  fkVendorId,
  submissionDeadline,
  pkEoiId = null,
  status = "DRAFT",
  notes = null,
  submittedAt = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    eoi_code: eoiCode,
    eoi_title: eoiTitle,
    fk_request_id: fkRequestId,
    fk_vendor_id: fkVendorId,
    status,
    notes,
    submission_deadline: submissionDeadline,
    submitted_at: submittedAt,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_expression_of_interest", "pk_eoi_id", pkEoiId, fields);
}

function readEoi(pkEoiId) {
  return _readByPk("tbl_expression_of_interest", "pk_eoi_id", pkEoiId);
}

async function insertRfq({
  rfqCode,
  rfqTitle,
  fkRequestId,
  issueDate,
  dueDate,
  submissionDeadline,
  pkRfqId = null,
  fkEoiId = null,
  status = "PENDING",
  notes = null,
  fkCreatedId = null,
  fkModifiedId = null,
  renderedHtml = null,
  isDelete = false,
}) {
  const fields = {
    rfq_code: rfqCode,
    rfq_title: rfqTitle,
    fk_request_id: fkRequestId,
    fk_eoi_id: fkEoiId,
    status,
    issue_date: issueDate,
    due_date: dueDate,
    submission_deadline: submissionDeadline,
    notes,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    rendered_html: renderedHtml,
    is_delete: isDelete,
  };
  return _insert("tbl_request_for_quotation", "pk_rfq_id", pkRfqId, fields);
}

function readRfq(pkRfqId) {
  return _readByPk("tbl_request_for_quotation", "pk_rfq_id", pkRfqId);
}

async function insertQuotation({
  title,
  fkVendorId,
  fkRfqId,
  fkRequestId,
  issueDate,
  dueDate,
  pkQuotationId = null,
  fkCategoryId = null,
  fkBuyerId = null,
  status = "PENDING",
  totalAmount = null,
  currency = "USD",
  notes = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
  buyerDetails = null,
  sellerDetails = null,
  renderedHtml = null,
}) {
  const fields = {
    title,
    fk_vendor_id: fkVendorId,
    fk_rfq_id: fkRfqId,
    fk_request_id: fkRequestId,
    fk_category_id: fkCategoryId,
    fk_buyer_id: fkBuyerId,
    status,
    total_amount: totalAmount,
    currency,
    issue_date: issueDate,
    due_date: dueDate,
    notes,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
    buyer_details: buyerDetails,
    seller_details: sellerDetails,
    rendered_html: renderedHtml,
  };
  return _insert("tbl_quotation", "pk_quotation_id", pkQuotationId, fields);
}

function readQuotation(pkQuotationId) {
  return _readByPk("tbl_quotation", "pk_quotation_id", pkQuotationId);
}

async function insertPurchaseOrder({
  poTitle,
  fkRequestId,
  poNumber,
  fkVendorId,
  totalValue,
  status,
  fkQuotationId,
  pkPurchaseOrderId = null,
  currency = "USD",
  issuedAt = null,
  deliveryAddress = null,
  expectedDelivery = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
  renderedHtml = null,
}) {
  const fields = {
    po_title: poTitle,
    fk_request_id: fkRequestId,
    po_number: poNumber,
    fk_vendor_id: fkVendorId,
    total_value: totalValue,
    currency,
    status,
    issued_at: issuedAt,
    delivery_address: deliveryAddress,
    expected_delivery: expectedDelivery,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
    fk_quotation_id: fkQuotationId,
    rendered_html: renderedHtml,
  };
  return _insert("tbl_purchase_order", "pk_purchase_order_id", pkPurchaseOrderId, fields);
}

function readPurchaseOrder(pkPurchaseOrderId) {
  return _readByPk("tbl_purchase_order", "pk_purchase_order_id", pkPurchaseOrderId);
}

function readPurchaseOrderByNumber(poNumber) {
  return _readByField("tbl_purchase_order", "po_number", poNumber);
}

// ============================================================================
// FULFILLMENT: SHIPMENT, GOODS RECEIPT, INVOICE
// ============================================================================

async function insertShipmentTracking({
  orderId,
  courierPersonName,
  courierPersonPhone,
  pkShipmentTrackingId = null,
}) {
  const fields = {
    order_id: orderId,
    courier_person_name: courierPersonName,
    courier_person_phone: courierPersonPhone,
  };
  return _insert("tbl_shipment_tracking", "pk_shipment_tracking_id", pkShipmentTrackingId, fields, [
    "created_at",
    "updated_at",
  ]);
}

function readShipmentTracking(pkShipmentTrackingId) {
  return _readByPk("tbl_shipment_tracking", "pk_shipment_tracking_id", pkShipmentTrackingId);
}

async function insertShipment({
  fkPoNumber,
  fkVendorId,
  asnId,
  dispatchDate,
  deliveryDate,
  logisticsProvider,
  fkTrackingNo,
  quantity,
  status,
  pkShipmentId = null,
  notes = null,
  documents = null,
}) {
  const fields = {
    fk_po_number: fkPoNumber,
    fk_vendor_id: fkVendorId,
    asn_id: asnId,
    dispatch_date: dispatchDate,
    delivery_date: deliveryDate,
    logistics_provider: logisticsProvider,
    fk_tracking_no: fkTrackingNo,
    quantity,
    status,
    notes,
    documents,
  };
  return _insert("tbl_shipment", "pk_shipment_id", pkShipmentId, fields, [
    "created_at",
    "updated_at",
  ]);
}

function readShipment(pkShipmentId) {
  return _readByPk("tbl_shipment", "pk_shipment_id", pkShipmentId);
}

async function insertGoodsReceipt({
  grnCode,
  fkPurchaseOrderId,
  receivedAt,
  pkGoodsReceiptId = null,
  status = "PENDING",
  deliveryNoteNo = null,
  notes = null,
  fkCreatedId = null,
  fkModifiedId = null,
  renderedHtml = null,
  isDelete = false,
}) {
  const fields = {
    grn_code: grnCode,
    fk_purchase_order_id: fkPurchaseOrderId,
    status,
    received_at: receivedAt,
    delivery_note_no: deliveryNoteNo,
    notes,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    rendered_html: renderedHtml,
    is_delete: isDelete,
  };
  return _insert("tbl_goods_receipt", "pk_goods_receipt_id", pkGoodsReceiptId, fields);
}

function readGoodsReceipt(pkGoodsReceiptId) {
  return _readByPk("tbl_goods_receipt", "pk_goods_receipt_id", pkGoodsReceiptId);
}

async function insertGoodsReceiptItem({
  fkGoodsReceiptId,
  fkItemId,
  quantityOrdered,
  quantityReceived,
  pkGriId = null,
  quantityRejected = 0,
  unitOfMeasure = null,
  rejectionReason = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    fk_goods_receipt_id: fkGoodsReceiptId,
    fk_item_id: fkItemId,
    quantity_ordered: quantityOrdered,
    quantity_received: quantityReceived,
    quantity_rejected: quantityRejected,
    unit_of_measure: unitOfMeasure,
    rejection_reason: rejectionReason,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_goods_receipt_item", "pk_gri_id", pkGriId, fields);
}

function readGoodsReceiptItem(pkGriId) {
  return _readByPk("tbl_goods_receipt_item", "pk_gri_id", pkGriId);
}

async function insertInvoice({
  invoiceNumber,
  fkPurchaseOrderId,
  fkRequestId,
  fkVendorId,
  subtotal,
  totalAmount,
  invoiceDate,
  dueDate,
  pkInvoiceId = null,
  fkGoodsReceiptId = null,
  status = "PENDING",
  taxAmount = 0,
  currency = "USD",
  paidAt = null,
  notes = null,
  fkCreatedId = null,
  fkModifiedId = null,
  renderedHtml = null,
  isDelete = false,
}) {
  const fields = {
    invoice_number: invoiceNumber,
    fk_purchase_order_id: fkPurchaseOrderId,
    fk_goods_receipt_id: fkGoodsReceiptId,
    fk_request_id: fkRequestId,
    fk_vendor_id: fkVendorId,
    status,
    subtotal,
    tax_amount: taxAmount,
    total_amount: totalAmount,
    currency,
    invoice_date: invoiceDate,
    due_date: dueDate,
    paid_at: paidAt,
    notes,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    rendered_html: renderedHtml,
    is_delete: isDelete,
  };
  return _insert("tbl_invoice", "pk_invoice_id", pkInvoiceId, fields);
}

function readInvoice(pkInvoiceId) {
  return _readByPk("tbl_invoice", "pk_invoice_id", pkInvoiceId);
}

function readInvoiceByNumber(invoiceNumber) {
  return _readByField("tbl_invoice", "invoice_number", invoiceNumber);
}

// ============================================================================
// COLLABORATION: CHAT & NOTIFICATIONS
// ============================================================================

async function insertChatRoom({
  fkRequestId,
  name,
  pkChatRoomId = null,
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    fk_request_id: fkRequestId,
    name,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_chat_room", "pk_chat_room_id", pkChatRoomId, fields);
}

function readChatRoom(pkChatRoomId) {
  return _readByPk("tbl_chat_room", "pk_chat_room_id", pkChatRoomId);
}

async function insertChatRoomMember({
  fkChatRoomId,
  pkChatRoomMemberId = null,
  fkUserId = null,
  fkVendorId = null,
  role = "MEMBER",
  isActive = true,
}) {
  const fields = {
    fk_chat_room_id: fkChatRoomId,
    fk_user_id: fkUserId,
    fk_vendor_id: fkVendorId,
    role,
    is_active: isActive,
  };
  // tbl_chat_room_member only has `created`, no `modified`
  return _insert("tbl_chat_room_member", "pk_chat_room_member_id", pkChatRoomMemberId, fields, [
    "created",
  ]);
}

function readChatRoomMember(pkChatRoomMemberId) {
  return _readByPk("tbl_chat_room_member", "pk_chat_room_member_id", pkChatRoomMemberId);
}

async function insertChatMessage({
  fkChatRoomId,
  fkSenderId,
  senderType,
  content,
  pkChatMessageId = null,
  isRead = false,
  attachmentUrl = null,
  attachmentType = null,
}) {
  const fields = {
    fk_chat_room_id: fkChatRoomId,
    fk_sender_id: fkSenderId,
    sender_type: senderType,
    content,
    is_read: isRead,
    attachment_url: attachmentUrl,
    attachment_type: attachmentType,
  };
  // tbl_chat_message only has `created`, no `modified`
  return _insert("tbl_chat_message", "pk_chat_message_id", pkChatMessageId, fields, ["created"]);
}

function readChatMessage(pkChatMessageId) {
  return _readByPk("tbl_chat_message", "pk_chat_message_id", pkChatMessageId);
}

async function insertNotification({
  fkNotificationTypeId,
  fkUserId,
  title,
  message,
  pkNotificationId = null,
  fkRequestId = null,
  channel = "IN_APP",
  status = "PENDING",
  isRead = false,
  sentAt = null,
  readAt = null,
  metadata = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    fk_notification_type_id: fkNotificationTypeId,
    fk_user_id: fkUserId,
    fk_request_id: fkRequestId,
    title,
    message,
    channel,
    status,
    is_read: isRead,
    sent_at: sentAt,
    read_at: readAt,
    metadata,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_notification", "pk_notification_id", pkNotificationId, fields);
}

function readNotification(pkNotificationId) {
  return _readByPk("tbl_notification", "pk_notification_id", pkNotificationId);
}

// ============================================================================
// TEMPLATES
// ============================================================================

async function insertTemplate({
  templateCode,
  templateName,
  documentType,
  htmlContent,
  pkTemplateId = null,
  isActive = true,
  isDelete = false,
}) {
  const fields = {
    template_code: templateCode,
    template_name: templateName,
    document_type: documentType,
    html_content: htmlContent,
    is_active: isActive,
    is_delete: isDelete,
  };
  return _insert("tbl_templates", "pk_template_id", pkTemplateId, fields);
}

function readTemplate({ pkTemplateId = null, templateCode = null } = {}) {
  if (pkTemplateId) return _readByPk("tbl_templates", "pk_template_id", pkTemplateId);
  if (templateCode) return _readByField("tbl_templates", "template_code", templateCode);
  throw new Error("At least one parameter must be provided");
}

// ============================================================================
// RATE CARDS & PRICING
// ============================================================================

async function insertRateCard({
  rateCardCode,
  rateCardName,
  fkVendorId,
  validFrom,
  validTo,
  pkRateCardId = null,
  status = "DRAFT",
  remarks = null,
  fkCreatedId = null,
  fkModifiedId = null,
  isDelete = false,
}) {
  const fields = {
    rate_card_code: rateCardCode,
    rate_card_name: rateCardName,
    fk_vendor_id: fkVendorId,
    valid_from: validFrom,
    valid_to: validTo,
    status,
    remarks,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
    is_delete: isDelete,
  };
  return _insert("tbl_rate_card", "pk_rate_card_id", pkRateCardId, fields);
}

function readRateCard(pkRateCardId) {
  return _readByPk("tbl_rate_card", "pk_rate_card_id", pkRateCardId);
}

async function insertRateCardItem({
  fkRateCardId,
  fkItemId,
  pricingType,
  pkRateCardItemId = null,
  currency = "INR",
  isActive = true,
  fkCreatedId = null,
  fkModifiedId = null,
}) {
  const fields = {
    fk_rate_card_id: fkRateCardId,
    fk_item_id: fkItemId,
    pricing_type: pricingType,
    currency,
    is_active: isActive,
    fk_created_id: fkCreatedId,
    fk_modified_id: fkModifiedId,
  };
  return _insert("tbl_rate_card_item", "pk_rate_card_item_id", pkRateCardItemId, fields);
}

function readRateCardItem(pkRateCardItemId) {
  return _readByPk("tbl_rate_card_item", "pk_rate_card_item_id", pkRateCardItemId);
}

async function insertRateCardFixedPrice({ fkRateCardItemId, unitPrice, pkFixedPriceId = null }) {
  const fields = {
    fk_rate_card_item_id: fkRateCardItemId,
    unit_price: unitPrice,
  };
  return _insert("tbl_rate_card_fixed_price", "pk_fixed_price_id", pkFixedPriceId, fields, []);
}

function readRateCardFixedPrice(pkFixedPriceId) {
  return _readByPk("tbl_rate_card_fixed_price", "pk_fixed_price_id", pkFixedPriceId);
}

async function insertRateCardTier({
  fkRateCardItemId,
  minQty,
  maxQty,
  unitPrice,
  pkTierId = null,
}) {
  const fields = {
    fk_rate_card_item_id: fkRateCardItemId,
    min_qty: minQty,
    max_qty: maxQty,
    unit_price: unitPrice,
  };
  return _insert("tbl_rate_card_tier", "pk_tier_id", pkTierId, fields, []);
}

function readRateCardTier(pkTierId) {
  return _readByPk("tbl_rate_card_tier", "pk_tier_id", pkTierId);
}

async function insertRateCardMilestone({
  fkRateCardItemId,
  milestoneName,
  milestoneOrder,
  unitPrice,
  pkMilestoneId = null,
}) {
  const fields = {
    fk_rate_card_item_id: fkRateCardItemId,
    milestone_name: milestoneName,
    milestone_order: milestoneOrder,
    unit_price: unitPrice,
  };
  return _insert("tbl_rate_card_milestone", "pk_milestone_id", pkMilestoneId, fields, []);
}

function readRateCardMilestone(pkMilestoneId) {
  return _readByPk("tbl_rate_card_milestone", "pk_milestone_id", pkMilestoneId);
}

async function insertVendorItemPrice({
  fkVendorId,
  fkItemId,
  fkRateCardId,
  fkRateCardItemId,
  pkVendorItemPriceId = null,
  isActive = true,
}) {
  const fields = {
    fk_vendor_id: fkVendorId,
    fk_item_id: fkItemId,
    fk_rate_card_id: fkRateCardId,
    fk_rate_card_item_id: fkRateCardItemId,
    is_active: isActive,
  };
  return _insert("tbl_vendor_item_price", "pk_vendor_item_price_id", pkVendorItemPriceId, fields, []);
}

function readVendorItemPrice(pkVendorItemPriceId) {
  return _readByPk("tbl_vendor_item_price", "pk_vendor_item_price_id", pkVendorItemPriceId);
}

// ============================================================================
// DESTRUCTIVE OPERATIONS — require confirm: true on purpose
// ============================================================================

async function dropAllTables({ confirm = false, schema = "public" } = {}) {
  if (!confirm) {
    console.log("Refusing to drop tables: call dropAllTables({ confirm: true }) to proceed.");
    return null;
  }

  const tables = await executeQuery("SELECT tablename FROM pg_tables WHERE schemaname = $1;", [
    schema,
  ]);
  if (!tables || tables.length === 0) {
    console.log(`No tables found in schema '${schema}'.`);
    return true;
  }

  for (const row of tables) {
    const result = await executeQuery(
      `DROP TABLE IF EXISTS "${schema}"."${row.tablename}" CASCADE;`
    );
    if (result === null) {
      console.log(`Failed to drop ${row.tablename}, stopping.`);
      return null;
    }
  }

  console.log(`Dropped ${tables.length} tables from schema '${schema}'.`);
  return true;
}

async function truncateAllTables({ confirm = false, schema = "public" } = {}) {
  if (!confirm) {
    console.log("Refusing to truncate tables: call truncateAllTables({ confirm: true }) to proceed.");
    return null;
  }

  const tables = await executeQuery("SELECT tablename FROM pg_tables WHERE schemaname = $1;", [
    schema,
  ]);
  if (!tables || tables.length === 0) {
    console.log(`No tables found in schema '${schema}'.`);
    return true;
  }

  const quoted = tables.map((row) => `"${schema}"."${row.tablename}"`).join(", ");
  const sql = `TRUNCATE TABLE ${quoted} RESTART IDENTITY CASCADE;`;
  const result = await executeQuery(sql);
  if (result === null) {
    console.log("Failed to truncate tables.");
    return null;
  }

  console.log(`Truncated ${tables.length} tables in schema '${schema}'.`);
  return true;
}

module.exports = {
  pool,
  executeQuery,
  listTable,
  // users & roles
  insertUser,
  readUser,
  readUserByEmail,
  insertUserRole,
  readUserRole,
  insertActivation,
  readActivation,
  // geography
  insertCountry,
  readCountry,
  insertCity,
  readCity,
  // company & currency
  insertCompany,
  readCompany,
  insertCurrency,
  readCurrency,
  // org / lookup
  insertDepartment,
  readDepartment,
  insertCategory,
  readCategory,
  insertRequestPhase,
  readRequestPhase,
  insertNotificationType,
  readNotificationType,
  insertSlaPolicy,
  readSlaPolicy,
  insertApprovalLevel,
  readApprovalLevel,
  // vendor & item
  insertVendor,
  readVendor,
  readVendorByEmail,
  insertItem,
  readItem,
  readItemByCode,
  // purchase request flow
  insertPurchaseRequest,
  readPurchaseRequest,
  readPurchaseRequestByNumber,
  insertPrItemMapping,
  readPrItemMapping,
  insertApproval,
  readApproval,
  insertRequestHistory,
  readRequestHistory,
  insertAttachmentMaster,
  readAttachmentMaster,
  insertRequestAttachment,
  readRequestAttachment,
  // sourcing
  insertContract,
  readContract,
  insertEoi,
  readEoi,
  insertRfq,
  readRfq,
  insertQuotation,
  readQuotation,
  insertPurchaseOrder,
  readPurchaseOrder,
  readPurchaseOrderByNumber,
  // fulfillment
  insertShipmentTracking,
  readShipmentTracking,
  insertShipment,
  readShipment,
  insertGoodsReceipt,
  readGoodsReceipt,
  insertGoodsReceiptItem,
  readGoodsReceiptItem,
  insertInvoice,
  readInvoice,
  readInvoiceByNumber,
  // collaboration
  insertChatRoom,
  readChatRoom,
  insertChatRoomMember,
  readChatRoomMember,
  insertChatMessage,
  readChatMessage,
  insertNotification,
  readNotification,
  // templates
  insertTemplate,
  readTemplate,
  // rate cards
  insertRateCard,
  readRateCard,
  insertRateCardItem,
  readRateCardItem,
  insertRateCardFixedPrice,
  readRateCardFixedPrice,
  insertRateCardTier,
  readRateCardTier,
  insertRateCardMilestone,
  readRateCardMilestone,
  insertVendorItemPrice,
  readVendorItemPrice,
  // destructive
  dropAllTables,
  truncateAllTables,
};
const { faker } = require("@faker-js/faker");
const db = require("./dbUtil");

function futureDate(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function main() {
  // ==========================================================================
  // 0. RESET
  // ==========================================================================
  await db.truncateAllTables({ confirm: true });

  // ==========================================================================
  // 1. COMPANY & CURRENCY
  // ==========================================================================
  const company = await db.insertCompany({
    pkCompanyId: "company_1",
    companyName: "OpenAI",
    companyCode: "OAI",
    companyEmail: "info@openai.com",
    companyPhone: "+1 1234567890",
    companyAddress: "1 AI Plaza",
    city: "San Francisco",
    state: "California",
    country: "USA",
    postalCode: "94105",
    website: "https://openai.com",
    taxNumber: "GST123456",
    currency: "USD",
    logoUrl: "https://example.com/logo.png",
  });
  console.log(company);
  const companyId = company.pk_company_id;

  const currency = await db.insertCurrency({
    pkCurrencyId: "currency_1",
    currencyName: "US Dollar",
    currencyCode: "USD",
    symbol: "$",
  });
  console.log(currency);

  // ==========================================================================
  // 2. ROLES & USERS
  // ==========================================================================
  const adminRole = await db.insertUserRole({
    roleName: "admin",
    roleCode: "ADMIN",
    pkRoleId: "role_1",
    isActive: true,
  });
  console.log(adminRole);
  const adminRoleId = adminRole.pk_role_id;

  const buyerRole = await db.insertUserRole({
    roleName: "buyer",
    roleCode: "BUYER",
    pkRoleId: "role_2",
    isActive: true,
  });
  console.log(buyerRole);
  const buyerRoleId = buyerRole.pk_role_id;

  const adminUser = await db.insertUser({
    pkUserId: "user_1",
    userName: "admin",
    userEmail: "admin@optima.com",
    userPhone: faker.phone.number().slice(0, 10),
    fkCompanyId: companyId,
    fkRoleId: adminRoleId,
    keycloakId: faker.string.uuid(),
  });
  console.log(adminUser);
  const adminUserId = adminUser.pk_user_id;

  const buyerUser = await db.insertUser({
    pkUserId: "user_2",
    userName: faker.person.fullName(),
    userEmail: faker.internet.email(),
    userPhone: faker.phone.number().slice(0, 10),
    fkCompanyId: companyId,
    fkRoleId: buyerRoleId,
    keycloakId: faker.string.uuid(),
    fkCreatedId: adminUserId,
  });
  console.log(buyerUser);
  const buyerUserId = buyerUser.pk_user_id;

  const activation = await db.insertActivation({
    pkActivationTokenId: "activation_1",
    fkUserId: buyerUserId,
    tokenHash: faker.string.alphanumeric(64),
    expiresAt: futureDate(7),
    fkCreatedId: adminUserId,
  });
  console.log(activation);

  // ==========================================================================
  // 3. GEOGRAPHY
  // ==========================================================================
  const country = await db.insertCountry({
    pkCountryId: "country_1",
    countryName: "india",
    countryCode: "IN",
    fkCreatedId: adminUserId,
  });
  console.log(country);
  const countryId = country.pk_country_id;

  const city = await db.insertCity({
    cityName: "kochi",
    fkCountryId: countryId,
    pkCityId: "city_1",
    isActive: true,
    fkCreatedId: adminUserId,
  });
  console.log(city);
  const cityId = city.pk_city_id;

  // ==========================================================================
  // 4. ORG / LOOKUP TABLES
  // ==========================================================================
  const department = await db.insertDepartment({
    departmentName: "Procurement",
    departmentCode: "PROC",
    pkDepartmentId: "department_1",
    fkCreatedId: adminUserId,
  });
  console.log(department);
  const departmentId = department.pk_department_id;

  const parentCategory = await db.insertCategory({
    categoryName: "Electronics",
    hierarchyLevel: 1,
    pkCategoryId: "category_1",
    fkCreatedId: adminUserId,
  });
  console.log(parentCategory);
  const parentCategoryId = parentCategory.pk_category_id;

  const childCategory = await db.insertCategory({
    categoryName: "Laptops",
    hierarchyLevel: 2,
    pkCategoryId: "category_2",
    parentCategoryId: parentCategoryId,
    fkCreatedId: adminUserId,
  });
  console.log(childCategory);
  const categoryId = childCategory.pk_category_id;

  const phaseDraft = await db.insertRequestPhase({
    phaseName: "Draft",
    phaseCode: "DRAFT",
    order: 1,
    pkRequestPhaseId: "phase_1",
    fkCreatedId: adminUserId,
  });
  console.log(phaseDraft);
  const phaseDraftId = phaseDraft.pk_request_phase_id;

  const phaseApproval = await db.insertRequestPhase({
    phaseName: "Approval",
    phaseCode: "APPROVAL",
    order: 2,
    pkRequestPhaseId: "phase_2",
    fkCreatedId: adminUserId,
  });
  console.log(phaseApproval);
  const phaseApprovalId = phaseApproval.pk_request_phase_id;

  const notificationType = await db.insertNotificationType({
    typeName: "Approval Required",
    typeCode: "APPROVAL_REQUIRED",
    pkNotificationTypeId: "notification_type_1",
    fkCreatedId: adminUserId,
  });
  console.log(notificationType);
  const notificationTypeId = notificationType.pk_notification_type_id;

  const slaPolicy = await db.insertSlaPolicy({
    policyName: "Standard SLA",
    policyCode: "STD_SLA",
    responseTimeMins: 60,
    resolutionTimeMins: 1440,
    escalationTimeMins: 2880,
    pkSlaPolicyId: "sla_policy_1",
    fkCreatedId: adminUserId,
  });
  console.log(slaPolicy);

  const approvalLevel = await db.insertApprovalLevel({
    approvalLevel: "Level 1",
    order: 1,
    fromAmount: 0,
    toAmount: 50000,
    pkApprovalLevelId: "approval_level_1",
    fkCreatedId: adminUserId,
  });
  console.log(approvalLevel);
  const approvalLevelId = approvalLevel.pk_approval_level_id;

  // ==========================================================================
  // 5. VENDOR & ITEM
  // ==========================================================================
  const vendor = await db.insertVendor({
    companyLegalName: "Acme Supplies Pvt Ltd",
    contactPerson: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number().slice(0, 10),
    companyType: "Private Limited",
    yearOfEstablishment: 2010,
    officeAddress: faker.location.streetAddress(),
    gstNumber: "GSTIN12345",
    panNumber: "PAN12345",
    msmeStatus: "Registered",
    bank: "HDFC Bank",
    natureOfBusiness: "Trading",
    categoriesOfSupply: "Electronics",
    fkCountryId: countryId,
    fkCityId: cityId,
    status: "ACTIVE",
    pkVendorId: "vendor_1",
    tradingName: "Acme Supplies",
    fkCreatedId: adminUserId,
    fkCompanyId: companyId,
  });
  console.log(vendor);
  const vendorId = vendor.pk_vendor_id;

  const item = await db.insertItem({
    itemName: "Laptop - 14 inch",
    itemCode: "ITEM-LAPTOP-14",
    fkCategoryId: categoryId,
    rcFlag: false,
    pkItemId: "item_1",
    unit: "unit",
    hsnCode: "8471",
    description: "14 inch business laptop",
    fkCreatedId: adminUserId,
  });
  console.log(item);
  const itemId = item.pk_item_id;

  const item2 = await db.insertItem({
    itemName: "Wireless Mouse",
    itemCode: "ITEM-MOUSE-01",
    fkCategoryId: categoryId,
    rcFlag: false,
    pkItemId: "item_2",
    unit: "unit",
    hsnCode: "8471",
    fkCreatedId: adminUserId,
  });
  console.log(item2);
  const item2Id = item2.pk_item_id;

  // ==========================================================================
  // 6. PURCHASE REQUEST FLOW
  // ==========================================================================
  const purchaseRequest = await db.insertPurchaseRequest({
    requestNumber: "PR-2026-0001",
    title: "Laptops for new hires",
    status: "PENDING_APPROVAL",
    fkRequestedById: buyerUserId,
    pkRequestId: "request_1",
    description: "10 laptops needed for onboarding batch",
    estimatedValue: 800000,
    currency: "INR",
    fkDepartmentId: departmentId,
    fkCategoryId: categoryId,
    fkCreatedId: buyerUserId,
  });
  console.log(purchaseRequest);
  const requestId = purchaseRequest.pk_request_id;

  const prItemMapping1 = await db.insertPrItemMapping({
    fkRequestId: requestId,
    fkItemId: itemId,
    itemDescription: "14 inch laptop",
    quantity: 10,
    pkPrItemMappingId: "pr_item_mapping_1",
    unitOfMeasure: "unit",
    estimatedUnitPrice: 70000,
    totalPrice: 700000,
    fkCreatedId: buyerUserId,
  });
  console.log(prItemMapping1);

  const prItemMapping2 = await db.insertPrItemMapping({
    fkRequestId: requestId,
    fkItemId: item2Id,
    itemDescription: "Wireless mouse",
    quantity: 10,
    pkPrItemMappingId: "pr_item_mapping_2",
    unitOfMeasure: "unit",
    estimatedUnitPrice: 1000,
    totalPrice: 10000,
    fkCreatedId: buyerUserId,
  });
  console.log(prItemMapping2);

  const approval = await db.insertApproval({
    fkRequestId: requestId,
    fkApproverId: adminUserId,
    fkApprovalLevelId: approvalLevelId,
    pkApprovalId: "approval_1",
    status: "PENDING",
    fkCreatedId: buyerUserId,
  });
  console.log(approval);

  const requestHistory = await db.insertRequestHistory({
    fkRequestId: requestId,
    fkToStatus: "PENDING_APPROVAL",
    fkToPhaseId: phaseApprovalId,
    fkChangedById: buyerUserId,
    pkStatusHistoryId: "request_history_1",
    fkFromPhaseId: phaseDraftId,
    comment: "Submitted for approval",
    metadata: { submitted_via: "web" },
  });
  console.log(requestHistory);

  const attachmentMaster = await db.insertAttachmentMaster({
    entityType: "PURCHASE_REQUEST",
    fkEntityId: requestId,
    folderPath: `/attachments/purchase_request/${requestId}`,
    fkUploadedById: buyerUserId,
    pkAttchmentMasterId: "attachment_master_1",
    fkPhaseId: phaseDraftId,
    fkCreatedId: buyerUserId,
  });
  console.log(attachmentMaster);
  const attachmentMasterId = attachmentMaster.pk_attchment_master_id;

  const requestAttachment = await db.insertRequestAttachment({
    fkAttchmentMasterId: attachmentMasterId,
    fkRequestId: requestId,
    fileName: "quote_justification.pdf",
    fileUrl: "https://example.com/files/quote_justification.pdf",
    fileType: "application/pdf",
    fkUploadedById: buyerUserId,
    pkRequestAttchmentId: "request_attachment_1",
    fileSize: 204800,
    fkPhaseId: phaseDraftId,
    fkCreatedId: buyerUserId,
  });
  console.log(requestAttachment);

  // ==========================================================================
  // 7. SOURCING: EOI, RFQ, QUOTATION, PURCHASE ORDER, CONTRACT
  // ==========================================================================
  const eoi = await db.insertEoi({
    eoiCode: "EOI-2026-0001",
    eoiTitle: "EOI for laptop supply",
    fkRequestId: requestId,
    fkVendorId: vendorId,
    submissionDeadline: futureDate(10),
    pkEoiId: "eoi_1",
    status: "SUBMITTED",
    fkCreatedId: buyerUserId,
  });
  console.log(eoi);
  const eoiId = eoi.pk_eoi_id;

  const rfq = await db.insertRfq({
    rfqCode: "RFQ-2026-0001",
    rfqTitle: "RFQ for laptop supply",
    fkRequestId: requestId,
    issueDate: new Date(),
    dueDate: futureDate(14),
    submissionDeadline: futureDate(12),
    pkRfqId: "rfq_1",
    fkEoiId: eoiId,
    status: "ISSUED",
    fkCreatedId: buyerUserId,
  });
  console.log(rfq);
  const rfqId = rfq.pk_rfq_id;

  const quotation = await db.insertQuotation({
    title: "Acme Supplies - Laptop Quotation",
    fkVendorId: vendorId,
    fkRfqId: rfqId,
    fkRequestId: requestId,
    issueDate: new Date(),
    dueDate: futureDate(15),
    pkQuotationId: "quotation_1",
    fkCategoryId: categoryId,
    fkBuyerId: buyerUserId,
    status: "ACCEPTED",
    totalAmount: 710000,
    currency: "INR",
    fkCreatedId: buyerUserId,
  });
  console.log(quotation);
  const quotationId = quotation.pk_quotation_id;

  const purchaseOrder = await db.insertPurchaseOrder({
    poTitle: "PO for laptop supply",
    fkRequestId: requestId,
    poNumber: "PO-2026-0001",
    fkVendorId: vendorId,
    totalValue: 710000,
    status: "ISSUED",
    fkQuotationId: quotationId,
    pkPurchaseOrderId: "purchase_order_1",
    currency: "INR",
    issuedAt: new Date(),
    deliveryAddress: "Optima HQ, Kochi",
    expectedDelivery: futureDate(20),
    fkCreatedId: buyerUserId,
  });
  console.log(purchaseOrder);
  const purchaseOrderId = purchaseOrder.pk_purchase_order_id;
  const po=    await db.readPurchaseOrder(purchaseOrderId)
  const poNumber = po.po_number;

  const contract = await db.insertContract({
    title: "Laptop Supply Contract",
    startDate: new Date(),
    endDate: futureDate(365),
    value: 710000,
    fkVendorId: vendorId,
    pkContractId: "contract_1",
    contractCode: "CONTRACT-2026-0001",
    status: "ACTIVE",
    fkRequestId: requestId,
    fkCreatedId: buyerUserId,
  });
  console.log(contract);

  // ==========================================================================
  // 8. FULFILLMENT: SHIPMENT, GOODS RECEIPT, INVOICE
  // ==========================================================================
  const shipmentTracking = await db.insertShipmentTracking({
    orderId: poNumber,
    courierPersonName: faker.person.fullName(),
    courierPersonPhone: faker.phone.number().slice(0, 10),
    pkShipmentTrackingId: "shipment_tracking_1",
  });
  console.log(shipmentTracking);
  const shipmentTrackingId = shipmentTracking.pk_shipment_tracking_id;

  const shipment = await db.insertShipment({
    fkPoNumber: poNumber,
    fkVendorId: vendorId,
    asnId: "ASN-2026-0001",
    dispatchDate: new Date(),
    deliveryDate: futureDate(5),
    logisticsProvider: "BlueDart",
    fkTrackingNo: shipmentTrackingId,
    quantity: 20,
    status: 1,
    pkShipmentId: "shipment_1",
  });
  console.log(shipment);

  const goodsReceipt = await db.insertGoodsReceipt({
    grnCode: "GRN-2026-0001",
    fkPurchaseOrderId: purchaseOrderId,
    receivedAt: new Date(),
    pkGoodsReceiptId: "goods_receipt_1",
    status: "RECEIVED",
    deliveryNoteNo: "DN-0001",
    fkCreatedId: buyerUserId,
  });
  console.log(goodsReceipt);
  const goodsReceiptId = goodsReceipt.pk_goods_receipt_id;

  const goodsReceiptItem1 = await db.insertGoodsReceiptItem({
    fkGoodsReceiptId: goodsReceiptId,
    fkItemId: itemId,
    quantityOrdered: 10,
    quantityReceived: 10,
    pkGriId: "goods_receipt_item_1",
    unitOfMeasure: "unit",
    fkCreatedId: buyerUserId,
  });
  console.log(goodsReceiptItem1);

  const goodsReceiptItem2 = await db.insertGoodsReceiptItem({
    fkGoodsReceiptId: goodsReceiptId,
    fkItemId: item2Id,
    quantityOrdered: 10,
    quantityReceived: 10,
    pkGriId: "goods_receipt_item_2",
    unitOfMeasure: "unit",
    fkCreatedId: buyerUserId,
  });
  console.log(goodsReceiptItem2);

  const invoice = await db.insertInvoice({
    invoiceNumber: "INV-2026-0001",
    fkPurchaseOrderId: purchaseOrderId,
    fkRequestId: requestId,
    fkVendorId: vendorId,
    subtotal: 710000,
    totalAmount: 710000,
    invoiceDate: new Date(),
    dueDate: futureDate(30),
    pkInvoiceId: "invoice_1",
    fkGoodsReceiptId: goodsReceiptId,
    status: "PENDING",
    currency: "INR",
    fkCreatedId: buyerUserId,
  });
  console.log(invoice);

  // ==========================================================================
  // 9. COLLABORATION: CHAT & NOTIFICATIONS
  // ==========================================================================
  const chatRoom = await db.insertChatRoom({
    fkRequestId: requestId,
    name: "PR-2026-0001 discussion",
    pkChatRoomId: "chat_room_1",
    fkCreatedId: buyerUserId,
  });
  console.log(chatRoom);
  const chatRoomId = chatRoom.pk_chat_room_id;

  const chatRoomMember1 = await db.insertChatRoomMember({
    fkChatRoomId: chatRoomId,
    pkChatRoomMemberId: "chat_room_member_1",
    fkUserId: buyerUserId,
    role: "OWNER",
  });
  console.log(chatRoomMember1);

  const chatRoomMember2 = await db.insertChatRoomMember({
    fkChatRoomId: chatRoomId,
    pkChatRoomMemberId: "chat_room_member_2",
    fkVendorId: vendorId,
    role: "MEMBER",
  });
  console.log(chatRoomMember2);

  const chatMessage = await db.insertChatMessage({
    fkChatRoomId: chatRoomId,
    fkSenderId: buyerUserId,
    senderType: "USER",
    content: "Please confirm delivery timeline.",
    pkChatMessageId: "chat_message_1",
  });
  console.log(chatMessage);

  const notification = await db.insertNotification({
    fkNotificationTypeId: notificationTypeId,
    fkUserId: adminUserId,
    title: "Approval required",
    message: "PR-2026-0001 requires your approval.",
    pkNotificationId: "notification_1",
    fkRequestId: requestId,
    fkCreatedId: buyerUserId,
  });
  console.log(notification);

  // ==========================================================================
  // 10. TEMPLATES
  // ==========================================================================
  const template = await db.insertTemplate({
    templateCode: "PO_TEMPLATE_V1",
    templateName: "Purchase Order Template",
    documentType: "PURCHASE_ORDER",
    htmlContent: "<html><body>PO for {{po_number}}</body></html>",
    pkTemplateId: "template_1",
  });
  console.log(template);

  // ==========================================================================
  // 11. RATE CARDS & PRICING
  // ==========================================================================
  const rateCard = await db.insertRateCard({
    rateCardCode: "RC-2026-0001",
    rateCardName: "Acme Supplies 2026 Rate Card",
    fkVendorId: vendorId,
    validFrom: new Date(),
    validTo: futureDate(365),
    pkRateCardId: "rate_card_1",
    status: "ACTIVE",
    fkCreatedId: adminUserId,
  });
  console.log(rateCard);
  const rateCardId = rateCard.pk_rate_card_id;

  const rateCardItemFixed = await db.insertRateCardItem({
    fkRateCardId: rateCardId,
    fkItemId: itemId,
    pricingType: "FIXED",
    pkRateCardItemId: "rate_card_item_1",
    currency: "INR",
    fkCreatedId: adminUserId,
  });
  console.log(rateCardItemFixed);
  const rateCardItemFixedId = rateCardItemFixed.pk_rate_card_item_id;

  const fixedPrice = await db.insertRateCardFixedPrice({
    fkRateCardItemId: rateCardItemFixedId,
    unitPrice: 68000,
    pkFixedPriceId: "fixed_price_1",
  });
  console.log(fixedPrice);

  const rateCardItemTiered = await db.insertRateCardItem({
    fkRateCardId: rateCardId,
    fkItemId: item2Id,
    pricingType: "TIERED",
    pkRateCardItemId: "rate_card_item_2",
    currency: "INR",
    fkCreatedId: adminUserId,
  });
  console.log(rateCardItemTiered);
  const rateCardItemTieredId = rateCardItemTiered.pk_rate_card_item_id;

  const tier1 = await db.insertRateCardTier({
    fkRateCardItemId: rateCardItemTieredId,
    minQty: 1,
    maxQty: 9,
    unitPrice: 1000,
    pkTierId: "tier_1",
  });
  console.log(tier1);

  const tier2 = await db.insertRateCardTier({
    fkRateCardItemId: rateCardItemTieredId,
    minQty: 10,
    maxQty: 50,
    unitPrice: 900,
    pkTierId: "tier_2",
  });
  console.log(tier2);

  const milestone1 = await db.insertRateCardMilestone({
    fkRateCardItemId: rateCardItemFixedId,
    milestoneName: "Delivery",
    milestoneOrder: 1,
    unitPrice: 68000,
    pkMilestoneId: "milestone_1",
  });
  console.log(milestone1);

  const vendorItemPrice1 = await db.insertVendorItemPrice({
    fkVendorId: vendorId,
    fkItemId: itemId,
    fkRateCardId: rateCardId,
    fkRateCardItemId: rateCardItemFixedId,
    pkVendorItemPriceId: "vendor_item_price_1",
  });
  console.log(vendorItemPrice1);

  const vendorItemPrice2 = await db.insertVendorItemPrice({
    fkVendorId: vendorId,
    fkItemId: item2Id,
    fkRateCardId: rateCardId,
    fkRateCardItemId: rateCardItemTieredId,
    pkVendorItemPriceId: "vendor_item_price_2",
  });
  console.log(vendorItemPrice2);

  console.log("\nSeed complete.");

  await db.pool.end();
}

main().catch(async (err) => {
  console.error("Fatal error:", err);
  await db.pool.end();
  process.exit(1);
});
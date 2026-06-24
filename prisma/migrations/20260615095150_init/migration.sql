-- CreateTable
CREATE TABLE "tbl_tenant_registry" (
    "pk_tenant_id" TEXT NOT NULL,
    "tenant_name" TEXT NOT NULL,
    "tenant_code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_tenant_registry_pkey" PRIMARY KEY ("pk_tenant_id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "pk_user_id" TEXT NOT NULL,
    "fk_tenant_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_phone" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "fk_company_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("pk_user_id")
);

-- CreateTable
CREATE TABLE "tbl_user_role" (
    "pk_role_id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_code" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_user_role_pkey" PRIMARY KEY ("pk_role_id")
);

-- CreateTable
CREATE TABLE "tbl_user_role_mapping" (
    "pk_user_role_mapping_id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "fk_role_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_user_role_mapping_pkey" PRIMARY KEY ("pk_user_role_mapping_id")
);

-- CreateTable
CREATE TABLE "tbl_activations" (
    "pk_activation_token_id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_activations_pkey" PRIMARY KEY ("pk_activation_token_id")
);

-- CreateTable
CREATE TABLE "tbl_country" (
    "pk_country_id" TEXT NOT NULL,
    "country_name" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_country_pkey" PRIMARY KEY ("pk_country_id")
);

-- CreateTable
CREATE TABLE "tbl_city" (
    "pk_city_id" TEXT NOT NULL,
    "city_name" TEXT NOT NULL,
    "fk_country_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_city_pkey" PRIMARY KEY ("pk_city_id")
);

-- CreateTable
CREATE TABLE "tbl_department" (
    "pk_department_id" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "department_code" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_department_pkey" PRIMARY KEY ("pk_department_id")
);

-- CreateTable
CREATE TABLE "tbl_category" (
    "pk_category_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,

    CONSTRAINT "tbl_category_pkey" PRIMARY KEY ("pk_category_id")
);

-- CreateTable
CREATE TABLE "tbl_request_phase" (
    "pk_request_phase_id" TEXT NOT NULL,
    "phase_name" TEXT NOT NULL,
    "phase_code" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_request_phase_pkey" PRIMARY KEY ("pk_request_phase_id")
);

-- CreateTable
CREATE TABLE "tbl_notification_type" (
    "pk_notification_type_id" TEXT NOT NULL,
    "type_name" TEXT NOT NULL,
    "type_code" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_notification_type_pkey" PRIMARY KEY ("pk_notification_type_id")
);

-- CreateTable
CREATE TABLE "tbl_sla_policy" (
    "pk_sla_policy_id" TEXT NOT NULL,
    "policy_name" TEXT NOT NULL,
    "policy_code" TEXT NOT NULL,
    "description" TEXT,
    "response_time_mins" INTEGER NOT NULL,
    "resolution_time_mins" INTEGER NOT NULL,
    "escalation_time_mins" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_sla_policy_pkey" PRIMARY KEY ("pk_sla_policy_id")
);

-- CreateTable
CREATE TABLE "tbl_vendor" (
    "pk_vendor_id" TEXT NOT NULL,
    "company_legal_name" TEXT NOT NULL,
    "trading_name" TEXT,
    "company_type" TEXT NOT NULL,
    "year_of_establishment" TIMESTAMP(3) NOT NULL,
    "office_address" TEXT NOT NULL,
    "GST_number" TEXT NOT NULL,
    "PAN_number" TEXT NOT NULL,
    "MSME_status" TEXT NOT NULL,
    "nature_of_business" TEXT NOT NULL,
    "categories_of_supply" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fk_country_id" TEXT NOT NULL,
    "fk_city_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "fk_company_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_vendor_pkey" PRIMARY KEY ("pk_vendor_id")
);

-- CreateTable
CREATE TABLE "tbl_item" (
    "pk_item_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_code" TEXT NOT NULL,
    "description" TEXT,
    "fk_category_id" TEXT NOT NULL,
    "unit" TEXT,
    "documents" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_item_pkey" PRIMARY KEY ("pk_item_id")
);

-- CreateTable
CREATE TABLE "tbl_purchase_request" (
    "pk_request_id" TEXT NOT NULL,
    "request_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "estimated_value" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "fk_requested_by_id" TEXT NOT NULL,
    "fk_department_id" TEXT,
    "fk_category_id" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_purchase_request_pkey" PRIMARY KEY ("pk_request_id")
);

-- CreateTable
CREATE TABLE "tbl_purchase_request_item_mapping" (
    "pk_pr_item_mapping_id" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "fk_item_id" TEXT NOT NULL,
    "item_description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_of_measure" TEXT,
    "estimated_unit_price" DOUBLE PRECISION,
    "total_price" DOUBLE PRECISION,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_purchase_request_item_mapping_pkey" PRIMARY KEY ("pk_pr_item_mapping_id")
);

-- CreateTable
CREATE TABLE "tbl_approval" (
    "pk_approval_id" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "fk_approver_id" TEXT NOT NULL,
    "fk_approval_level_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "comment" TEXT,
    "actioned_at" TIMESTAMP(3),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_approval_pkey" PRIMARY KEY ("pk_approval_id")
);

-- CreateTable
CREATE TABLE "tbl_approval_level" (
    "pk_approval_level_id" TEXT NOT NULL,
    "approval_level" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "from_amount" DOUBLE PRECISION NOT NULL,
    "to_amount" DOUBLE PRECISION NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_approval_level_pkey" PRIMARY KEY ("pk_approval_level_id")
);

-- CreateTable
CREATE TABLE "tbl_request_history" (
    "pk_status_history_id" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "fk_from_status" TEXT,
    "fk_to_status" TEXT NOT NULL,
    "fk_from_phase_id" TEXT,
    "fk_to_phase_id" TEXT NOT NULL,
    "fk_changed_by_id" TEXT NOT NULL,
    "comment" TEXT,
    "metadata" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_request_history_pkey" PRIMARY KEY ("pk_status_history_id")
);

-- CreateTable
CREATE TABLE "tbl_request_attachment_master" (
    "pk_attchment_master_id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "fk_entity_id" TEXT NOT NULL,
    "folder_path" TEXT NOT NULL,
    "fk_phase_id" TEXT,
    "fk_uploaded_by_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_request_attachment_master_pkey" PRIMARY KEY ("pk_attchment_master_id")
);

-- CreateTable
CREATE TABLE "tbl_request_attachments" (
    "pk_request_attchment_id" TEXT NOT NULL,
    "fk_attchment_master_id" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_size" INTEGER,
    "fk_uploaded_by_id" TEXT NOT NULL,
    "fk_phase_id" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_request_attachments_pkey" PRIMARY KEY ("pk_request_attchment_id")
);

-- CreateTable
CREATE TABLE "tbl_contract" (
    "pk_contract_id" TEXT NOT NULL,
    "contract_code" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "fk_request_id" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "rendered_html" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_contract_pkey" PRIMARY KEY ("pk_contract_id")
);

-- CreateTable
CREATE TABLE "tbl_expression_of_interest" (
    "pk_eoi_id" TEXT NOT NULL,
    "eoi_code" TEXT NOT NULL,
    "eoi_title" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "submission_deadline" TIMESTAMP(3) NOT NULL,
    "submitted_at" TIMESTAMP(3),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_expression_of_interest_pkey" PRIMARY KEY ("pk_eoi_id")
);

-- CreateTable
CREATE TABLE "tbl_request_for_quotation" (
    "pk_rfq_id" TEXT NOT NULL,
    "rfq_code" TEXT NOT NULL,
    "rfq_title" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "fk_eoi_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "issue_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "submission_deadline" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "rendered_html" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_request_for_quotation_pkey" PRIMARY KEY ("pk_rfq_id")
);

-- CreateTable
CREATE TABLE "tbl_quotation" (
    "pk_quotation_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "fk_rfq_id" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "fk_category_id" TEXT,
    "fk_buyer_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "total_amount" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "issue_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "buyer_details" TEXT,
    "seller_details" TEXT,
    "rendered_html" TEXT,

    CONSTRAINT "tbl_quotation_pkey" PRIMARY KEY ("pk_quotation_id")
);

-- CreateTable
CREATE TABLE "tbl_purchase_order" (
    "pk_purchase_order_id" TEXT NOT NULL,
    "po_title" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "po_number" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3),
    "delivery_address" TEXT,
    "expected_delivery" TIMESTAMP(3),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "fk_quotation_id" TEXT NOT NULL,
    "rendered_html" TEXT,

    CONSTRAINT "tbl_purchase_order_pkey" PRIMARY KEY ("pk_purchase_order_id")
);

-- CreateTable
CREATE TABLE "tbl_shipment" (
    "pk_shipment_id" TEXT NOT NULL,
    "fk_po_number" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "asn_id" TEXT NOT NULL,
    "dispatch_date" TIMESTAMP(3) NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "logistics_provider" TEXT NOT NULL,
    "fk_tracking_no" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "notes" TEXT,
    "documents" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_shipment_pkey" PRIMARY KEY ("pk_shipment_id")
);

-- CreateTable
CREATE TABLE "tbl_shipment_tracking" (
    "pk_shipment_tracking_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "courier_person_name" TEXT NOT NULL,
    "courier_person_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_shipment_tracking_pkey" PRIMARY KEY ("pk_shipment_tracking_id")
);

-- CreateTable
CREATE TABLE "tbl_goods_receipt" (
    "pk_goods_receipt_id" TEXT NOT NULL,
    "grn_code" TEXT NOT NULL,
    "fk_purchase_order_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "received_at" TIMESTAMP(3) NOT NULL,
    "delivery_note_no" TEXT,
    "notes" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "rendered_html" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_goods_receipt_pkey" PRIMARY KEY ("pk_goods_receipt_id")
);

-- CreateTable
CREATE TABLE "tbl_goods_receipt_item" (
    "pk_gri_id" TEXT NOT NULL,
    "fk_goods_receipt_id" TEXT NOT NULL,
    "fk_item_id" TEXT NOT NULL,
    "quantity_ordered" INTEGER NOT NULL,
    "quantity_received" INTEGER NOT NULL,
    "quantity_rejected" INTEGER NOT NULL DEFAULT 0,
    "unit_of_measure" TEXT,
    "rejection_reason" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_goods_receipt_item_pkey" PRIMARY KEY ("pk_gri_id")
);

-- CreateTable
CREATE TABLE "tbl_invoice" (
    "pk_invoice_id" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "fk_purchase_order_id" TEXT NOT NULL,
    "fk_goods_receipt_id" TEXT,
    "fk_request_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "subtotal" DOUBLE PRECISION NOT NULL,
    "tax_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "paid_at" TIMESTAMP(3),
    "notes" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "rendered_html" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_invoice_pkey" PRIMARY KEY ("pk_invoice_id")
);

-- CreateTable
CREATE TABLE "tbl_chat_room" (
    "pk_chat_room_id" TEXT NOT NULL,
    "fk_request_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_chat_room_pkey" PRIMARY KEY ("pk_chat_room_id")
);

-- CreateTable
CREATE TABLE "tbl_chat_room_member" (
    "pk_chat_room_member_id" TEXT NOT NULL,
    "fk_chat_room_id" TEXT NOT NULL,
    "fk_user_id" TEXT,
    "fk_vendor_id" TEXT,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_chat_room_member_pkey" PRIMARY KEY ("pk_chat_room_member_id")
);

-- CreateTable
CREATE TABLE "tbl_chat_message" (
    "pk_chat_message_id" TEXT NOT NULL,
    "fk_chat_room_id" TEXT NOT NULL,
    "fk_sender_id" TEXT NOT NULL,
    "sender_type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "attachment_url" TEXT,
    "attachment_type" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_chat_message_pkey" PRIMARY KEY ("pk_chat_message_id")
);

-- CreateTable
CREATE TABLE "tbl_notification" (
    "pk_notification_id" TEXT NOT NULL,
    "fk_notification_type_id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "fk_request_id" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'IN_APP',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3),
    "read_at" TIMESTAMP(3),
    "metadata" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_notification_pkey" PRIMARY KEY ("pk_notification_id")
);

-- CreateTable
CREATE TABLE "tbl_templates" (
    "pk_template_id" TEXT NOT NULL,
    "template_code" TEXT NOT NULL,
    "template_name" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "html_content" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_templates_pkey" PRIMARY KEY ("pk_template_id")
);

-- CreateTable
CREATE TABLE "tbl_company" (
    "pk_company_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_code" TEXT NOT NULL,
    "company_email" TEXT NOT NULL,
    "company_phone" TEXT NOT NULL,
    "company_address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postal_code" TEXT,
    "website" TEXT,
    "tax_number" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "logo_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_company_pkey" PRIMARY KEY ("pk_company_id")
);

-- CreateTable
CREATE TABLE "_tbl_goods_receiptTotbl_shipment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_tenant_registry_tenant_name_key" ON "tbl_tenant_registry"("tenant_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_tenant_registry_tenant_code_key" ON "tbl_tenant_registry"("tenant_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_tenant_registry_email_key" ON "tbl_tenant_registry"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_user_email_key" ON "tbl_user"("user_email");

-- CreateIndex
CREATE INDEX "tbl_user_fk_tenant_id_idx" ON "tbl_user"("fk_tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_role_role_name_key" ON "tbl_user_role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_role_role_code_key" ON "tbl_user_role"("role_code");

-- CreateIndex
CREATE INDEX "tbl_user_role_mapping_fk_user_id_idx" ON "tbl_user_role_mapping"("fk_user_id");

-- CreateIndex
CREATE INDEX "tbl_user_role_mapping_fk_role_id_idx" ON "tbl_user_role_mapping"("fk_role_id");

-- CreateIndex
CREATE INDEX "tbl_user_role_mapping_is_active_idx" ON "tbl_user_role_mapping"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_role_mapping_fk_user_id_fk_role_id_key" ON "tbl_user_role_mapping"("fk_user_id", "fk_role_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_activations_token_hash_key" ON "tbl_activations"("token_hash");

-- CreateIndex
CREATE INDEX "tbl_activations_fk_user_id_idx" ON "tbl_activations"("fk_user_id");

-- CreateIndex
CREATE INDEX "tbl_activations_expires_at_idx" ON "tbl_activations"("expires_at");

-- CreateIndex
CREATE INDEX "tbl_activations_is_used_idx" ON "tbl_activations"("is_used");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_country_country_name_key" ON "tbl_country"("country_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_country_country_code_key" ON "tbl_country"("country_code");

-- CreateIndex
CREATE INDEX "tbl_city_fk_country_id_idx" ON "tbl_city"("fk_country_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_department_department_name_key" ON "tbl_department"("department_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_department_department_code_key" ON "tbl_department"("department_code");

-- CreateIndex
CREATE INDEX "tbl_category_is_active_idx" ON "tbl_category"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_phase_phase_name_key" ON "tbl_request_phase"("phase_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_phase_phase_code_key" ON "tbl_request_phase"("phase_code");

-- CreateIndex
CREATE INDEX "tbl_request_phase_order_idx" ON "tbl_request_phase"("order");

-- CreateIndex
CREATE INDEX "tbl_request_phase_is_active_idx" ON "tbl_request_phase"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_notification_type_type_name_key" ON "tbl_notification_type"("type_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_notification_type_type_code_key" ON "tbl_notification_type"("type_code");

-- CreateIndex
CREATE INDEX "tbl_notification_type_is_active_idx" ON "tbl_notification_type"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_sla_policy_policy_name_key" ON "tbl_sla_policy"("policy_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_sla_policy_policy_code_key" ON "tbl_sla_policy"("policy_code");

-- CreateIndex
CREATE INDEX "tbl_sla_policy_is_active_idx" ON "tbl_sla_policy"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendor_email_key" ON "tbl_vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_item_item_code_key" ON "tbl_item"("item_code");

-- CreateIndex
CREATE INDEX "tbl_item_fk_category_id_idx" ON "tbl_item"("fk_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_purchase_request_request_number_key" ON "tbl_purchase_request"("request_number");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_fk_requested_by_id_idx" ON "tbl_purchase_request"("fk_requested_by_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_request_number_idx" ON "tbl_purchase_request"("request_number");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_item_mapping_fk_request_id_idx" ON "tbl_purchase_request_item_mapping"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_item_mapping_fk_item_id_idx" ON "tbl_purchase_request_item_mapping"("fk_item_id");

-- CreateIndex
CREATE INDEX "tbl_approval_fk_request_id_idx" ON "tbl_approval"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_approval_fk_approver_id_idx" ON "tbl_approval"("fk_approver_id");

-- CreateIndex
CREATE INDEX "tbl_approval_fk_approval_level_id_idx" ON "tbl_approval"("fk_approval_level_id");

-- CreateIndex
CREATE INDEX "tbl_approval_status_idx" ON "tbl_approval"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_approval_level_approval_level_key" ON "tbl_approval_level"("approval_level");

-- CreateIndex
CREATE INDEX "tbl_approval_level_is_active_idx" ON "tbl_approval_level"("is_active");

-- CreateIndex
CREATE INDEX "tbl_request_history_fk_request_id_idx" ON "tbl_request_history"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_request_history_created_idx" ON "tbl_request_history"("created");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_fk_entity_id_idx" ON "tbl_request_attachment_master"("fk_entity_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_entity_type_idx" ON "tbl_request_attachment_master"("entity_type");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_fk_phase_id_idx" ON "tbl_request_attachment_master"("fk_phase_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_fk_uploaded_by_id_idx" ON "tbl_request_attachment_master"("fk_uploaded_by_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_attchment_master_id_idx" ON "tbl_request_attachments"("fk_attchment_master_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_request_id_idx" ON "tbl_request_attachments"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_uploaded_by_id_idx" ON "tbl_request_attachments"("fk_uploaded_by_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_phase_id_idx" ON "tbl_request_attachments"("fk_phase_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_file_type_idx" ON "tbl_request_attachments"("file_type");

-- CreateIndex
CREATE INDEX "tbl_contract_fk_vendor_id_idx" ON "tbl_contract"("fk_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_contract_fk_request_id_idx" ON "tbl_contract"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_contract_status_idx" ON "tbl_contract"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_expression_of_interest_eoi_code_key" ON "tbl_expression_of_interest"("eoi_code");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_fk_request_id_idx" ON "tbl_expression_of_interest"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_fk_vendor_id_idx" ON "tbl_expression_of_interest"("fk_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_status_idx" ON "tbl_expression_of_interest"("status");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_submission_deadline_idx" ON "tbl_expression_of_interest"("submission_deadline");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_for_quotation_rfq_code_key" ON "tbl_request_for_quotation"("rfq_code");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_fk_request_id_idx" ON "tbl_request_for_quotation"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_fk_eoi_id_idx" ON "tbl_request_for_quotation"("fk_eoi_id");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_status_idx" ON "tbl_request_for_quotation"("status");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_submission_deadline_idx" ON "tbl_request_for_quotation"("submission_deadline");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_due_date_idx" ON "tbl_request_for_quotation"("due_date");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_request_id_idx" ON "tbl_quotation"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_vendor_id_idx" ON "tbl_quotation"("fk_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_rfq_id_idx" ON "tbl_quotation"("fk_rfq_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_category_id_idx" ON "tbl_quotation"("fk_category_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_buyer_id_idx" ON "tbl_quotation"("fk_buyer_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_status_idx" ON "tbl_quotation"("status");

-- CreateIndex
CREATE INDEX "tbl_quotation_due_date_idx" ON "tbl_quotation"("due_date");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_purchase_order_po_number_key" ON "tbl_purchase_order"("po_number");

-- CreateIndex
CREATE INDEX "tbl_purchase_order_fk_request_id_idx" ON "tbl_purchase_order"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_order_fk_vendor_id_idx" ON "tbl_purchase_order"("fk_vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_shipment_asn_id_key" ON "tbl_shipment"("asn_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_goods_receipt_grn_code_key" ON "tbl_goods_receipt"("grn_code");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_fk_purchase_order_id_idx" ON "tbl_goods_receipt"("fk_purchase_order_id");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_status_idx" ON "tbl_goods_receipt"("status");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_received_at_idx" ON "tbl_goods_receipt"("received_at");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_item_fk_goods_receipt_id_idx" ON "tbl_goods_receipt_item"("fk_goods_receipt_id");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_item_fk_item_id_idx" ON "tbl_goods_receipt_item"("fk_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_invoice_invoice_number_key" ON "tbl_invoice"("invoice_number");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_purchase_order_id_idx" ON "tbl_invoice"("fk_purchase_order_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_goods_receipt_id_idx" ON "tbl_invoice"("fk_goods_receipt_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_request_id_idx" ON "tbl_invoice"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_vendor_id_idx" ON "tbl_invoice"("fk_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_status_idx" ON "tbl_invoice"("status");

-- CreateIndex
CREATE INDEX "tbl_invoice_due_date_idx" ON "tbl_invoice"("due_date");

-- CreateIndex
CREATE INDEX "tbl_invoice_paid_at_idx" ON "tbl_invoice"("paid_at");

-- CreateIndex
CREATE INDEX "tbl_chat_room_fk_request_id_idx" ON "tbl_chat_room"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_chat_room_member_fk_chat_room_id_idx" ON "tbl_chat_room_member"("fk_chat_room_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_chat_room_member_fk_chat_room_id_fk_user_id_key" ON "tbl_chat_room_member"("fk_chat_room_id", "fk_user_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_fk_chat_room_id_idx" ON "tbl_chat_message"("fk_chat_room_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_fk_sender_id_idx" ON "tbl_chat_message"("fk_sender_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_created_idx" ON "tbl_chat_message"("created");

-- CreateIndex
CREATE INDEX "tbl_notification_fk_user_id_idx" ON "tbl_notification"("fk_user_id");

-- CreateIndex
CREATE INDEX "tbl_notification_fk_notification_type_id_idx" ON "tbl_notification"("fk_notification_type_id");

-- CreateIndex
CREATE INDEX "tbl_notification_fk_request_id_idx" ON "tbl_notification"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_notification_channel_idx" ON "tbl_notification"("channel");

-- CreateIndex
CREATE INDEX "tbl_notification_status_idx" ON "tbl_notification"("status");

-- CreateIndex
CREATE INDEX "tbl_notification_is_read_idx" ON "tbl_notification"("is_read");

-- CreateIndex
CREATE INDEX "tbl_notification_sent_at_idx" ON "tbl_notification"("sent_at");

-- CreateIndex
CREATE INDEX "tbl_notification_created_idx" ON "tbl_notification"("created");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_templates_template_code_key" ON "tbl_templates"("template_code");

-- CreateIndex
CREATE INDEX "tbl_templates_template_code_idx" ON "tbl_templates"("template_code");

-- CreateIndex
CREATE INDEX "tbl_templates_document_type_idx" ON "tbl_templates"("document_type");

-- CreateIndex
CREATE INDEX "tbl_templates_is_active_idx" ON "tbl_templates"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_company_company_code_key" ON "tbl_company"("company_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_company_company_email_key" ON "tbl_company"("company_email");

-- CreateIndex
CREATE INDEX "tbl_company_company_code_idx" ON "tbl_company"("company_code");

-- CreateIndex
CREATE INDEX "tbl_company_is_active_idx" ON "tbl_company"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "_tbl_goods_receiptTotbl_shipment_AB_unique" ON "_tbl_goods_receiptTotbl_shipment"("A", "B");

-- CreateIndex
CREATE INDEX "_tbl_goods_receiptTotbl_shipment_B_index" ON "_tbl_goods_receiptTotbl_shipment"("B");

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_tenant_id_fkey" FOREIGN KEY ("fk_tenant_id") REFERENCES "tbl_tenant_registry"("pk_tenant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_company_id_fkey" FOREIGN KEY ("fk_company_id") REFERENCES "tbl_company"("pk_company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_role_id_fkey" FOREIGN KEY ("fk_role_id") REFERENCES "tbl_user_role"("pk_role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_activations" ADD CONSTRAINT "tbl_activations_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_activations" ADD CONSTRAINT "tbl_activations_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_activations" ADD CONSTRAINT "tbl_activations_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_country" ADD CONSTRAINT "tbl_country_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_country" ADD CONSTRAINT "tbl_country_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_city" ADD CONSTRAINT "tbl_city_fk_country_id_fkey" FOREIGN KEY ("fk_country_id") REFERENCES "tbl_country"("pk_country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_city" ADD CONSTRAINT "tbl_city_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_city" ADD CONSTRAINT "tbl_city_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_department" ADD CONSTRAINT "tbl_department_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_department" ADD CONSTRAINT "tbl_department_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_category" ADD CONSTRAINT "tbl_category_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_category" ADD CONSTRAINT "tbl_category_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_phase" ADD CONSTRAINT "tbl_request_phase_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_phase" ADD CONSTRAINT "tbl_request_phase_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_notification_type" ADD CONSTRAINT "tbl_notification_type_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_notification_type" ADD CONSTRAINT "tbl_notification_type_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_sla_policy" ADD CONSTRAINT "tbl_sla_policy_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_sla_policy" ADD CONSTRAINT "tbl_sla_policy_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_city_id_fkey" FOREIGN KEY ("fk_city_id") REFERENCES "tbl_city"("pk_city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_country_id_fkey" FOREIGN KEY ("fk_country_id") REFERENCES "tbl_country"("pk_country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_company_id_fkey" FOREIGN KEY ("fk_company_id") REFERENCES "tbl_company"("pk_company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_item" ADD CONSTRAINT "tbl_item_fk_category_id_fkey" FOREIGN KEY ("fk_category_id") REFERENCES "tbl_category"("pk_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_item" ADD CONSTRAINT "tbl_item_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_item" ADD CONSTRAINT "tbl_item_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_category_id_fkey" FOREIGN KEY ("fk_category_id") REFERENCES "tbl_category"("pk_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_department_id_fkey" FOREIGN KEY ("fk_department_id") REFERENCES "tbl_department"("pk_department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_requested_by_id_fkey" FOREIGN KEY ("fk_requested_by_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_item_id_fkey" FOREIGN KEY ("fk_item_id") REFERENCES "tbl_item"("pk_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_approval_level_id_fkey" FOREIGN KEY ("fk_approval_level_id") REFERENCES "tbl_approval_level"("pk_approval_level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_approver_id_fkey" FOREIGN KEY ("fk_approver_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_approval_level" ADD CONSTRAINT "tbl_approval_level_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_approval_level" ADD CONSTRAINT "tbl_approval_level_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_changed_by_id_fkey" FOREIGN KEY ("fk_changed_by_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_from_phase_id_fkey" FOREIGN KEY ("fk_from_phase_id") REFERENCES "tbl_request_phase"("pk_request_phase_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_to_phase_id_fkey" FOREIGN KEY ("fk_to_phase_id") REFERENCES "tbl_request_phase"("pk_request_phase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_phase_id_fkey" FOREIGN KEY ("fk_phase_id") REFERENCES "tbl_request_phase"("pk_request_phase_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_uploaded_by_id_fkey" FOREIGN KEY ("fk_uploaded_by_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_attchment_master_id_fkey" FOREIGN KEY ("fk_attchment_master_id") REFERENCES "tbl_request_attachment_master"("pk_attchment_master_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_phase_id_fkey" FOREIGN KEY ("fk_phase_id") REFERENCES "tbl_request_phase"("pk_request_phase_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_uploaded_by_id_fkey" FOREIGN KEY ("fk_uploaded_by_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_eoi_id_fkey" FOREIGN KEY ("fk_eoi_id") REFERENCES "tbl_expression_of_interest"("pk_eoi_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_buyer_id_fkey" FOREIGN KEY ("fk_buyer_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_category_id_fkey" FOREIGN KEY ("fk_category_id") REFERENCES "tbl_category"("pk_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_rfq_id_fkey" FOREIGN KEY ("fk_rfq_id") REFERENCES "tbl_request_for_quotation"("pk_rfq_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_quotation_id_fkey" FOREIGN KEY ("fk_quotation_id") REFERENCES "tbl_quotation"("pk_quotation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_shipment" ADD CONSTRAINT "tbl_shipment_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_shipment" ADD CONSTRAINT "tbl_shipment_fk_tracking_no_fkey" FOREIGN KEY ("fk_tracking_no") REFERENCES "tbl_shipment_tracking"("pk_shipment_tracking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_purchase_order_id_fkey" FOREIGN KEY ("fk_purchase_order_id") REFERENCES "tbl_purchase_order"("pk_purchase_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_goods_receipt_id_fkey" FOREIGN KEY ("fk_goods_receipt_id") REFERENCES "tbl_goods_receipt"("pk_goods_receipt_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_item_id_fkey" FOREIGN KEY ("fk_item_id") REFERENCES "tbl_item"("pk_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_goods_receipt_id_fkey" FOREIGN KEY ("fk_goods_receipt_id") REFERENCES "tbl_goods_receipt"("pk_goods_receipt_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_purchase_order_id_fkey" FOREIGN KEY ("fk_purchase_order_id") REFERENCES "tbl_purchase_order"("pk_purchase_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_room" ADD CONSTRAINT "tbl_chat_room_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_chat_room" ADD CONSTRAINT "tbl_chat_room_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_chat_room" ADD CONSTRAINT "tbl_chat_room_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_room_member" ADD CONSTRAINT "tbl_chat_room_member_fk_chat_room_id_fkey" FOREIGN KEY ("fk_chat_room_id") REFERENCES "tbl_chat_room"("pk_chat_room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_room_member" ADD CONSTRAINT "tbl_chat_room_member_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_room_member" ADD CONSTRAINT "tbl_chat_room_member_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_message" ADD CONSTRAINT "tbl_chat_message_fk_chat_room_id_fkey" FOREIGN KEY ("fk_chat_room_id") REFERENCES "tbl_chat_room"("pk_chat_room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_message" ADD CONSTRAINT "tbl_chat_message_fk_sender_id_fkey" FOREIGN KEY ("fk_sender_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_notification_type_id_fkey" FOREIGN KEY ("fk_notification_type_id") REFERENCES "tbl_notification_type"("pk_notification_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_request_id_fkey" FOREIGN KEY ("fk_request_id") REFERENCES "tbl_purchase_request"("pk_request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" ADD CONSTRAINT "_tbl_goods_receiptTotbl_shipment_A_fkey" FOREIGN KEY ("A") REFERENCES "tbl_goods_receipt"("pk_goods_receipt_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" ADD CONSTRAINT "_tbl_goods_receiptTotbl_shipment_B_fkey" FOREIGN KEY ("B") REFERENCES "tbl_shipment"("pk_shipment_id") ON DELETE CASCADE ON UPDATE CASCADE;

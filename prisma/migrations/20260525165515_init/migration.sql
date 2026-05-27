-- CreateTable
CREATE TABLE "tbl_tenant_registry" (
    "pk_chr_tenant_id" TEXT NOT NULL,
    "chr_tenant_name" TEXT NOT NULL,
    "chr_tenant_code" TEXT NOT NULL,
    "chr_email" TEXT NOT NULL,
    "chr_phone" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "chr_status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_tenant_registry_pkey" PRIMARY KEY ("pk_chr_tenant_id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "pk_chr_user_id" TEXT NOT NULL,
    "fk_chr_tenant_id" TEXT NOT NULL,
    "chr_user_name" TEXT NOT NULL,
    "chr_user_email" TEXT NOT NULL,
    "chr_user_phone" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("pk_chr_user_id")
);

-- CreateTable
CREATE TABLE "tbl_user_role" (
    "pk_chr_role_id" TEXT NOT NULL,
    "chr_role_name" TEXT NOT NULL,
    "chr_role_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_user_role_pkey" PRIMARY KEY ("pk_chr_role_id")
);

-- CreateTable
CREATE TABLE "tbl_user_role_mapping" (
    "pk_chr_user_role_mapping_id" TEXT NOT NULL,
    "fk_chr_user_id" TEXT NOT NULL,
    "fk_chr_role_id" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_user_role_mapping_pkey" PRIMARY KEY ("pk_chr_user_role_mapping_id")
);

-- CreateTable
CREATE TABLE "tbl_activations" (
    "pk_chr_activation_token_id" TEXT NOT NULL,
    "fk_chr_user_id" TEXT NOT NULL,
    "chr_token_hash" TEXT NOT NULL,
    "tim_expires_at" TIMESTAMP(3) NOT NULL,
    "tim_used_at" TIMESTAMP(3),
    "bln_is_used" BOOLEAN NOT NULL DEFAULT false,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_activations_pkey" PRIMARY KEY ("pk_chr_activation_token_id")
);

-- CreateTable
CREATE TABLE "tbl_country" (
    "pk_chr_country_id" TEXT NOT NULL,
    "chr_country_name" TEXT NOT NULL,
    "chr_country_code" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_country_pkey" PRIMARY KEY ("pk_chr_country_id")
);

-- CreateTable
CREATE TABLE "tbl_city" (
    "pk_chr_city_id" TEXT NOT NULL,
    "chr_city_name" TEXT NOT NULL,
    "fk_chr_country_id" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_city_pkey" PRIMARY KEY ("pk_chr_city_id")
);

-- CreateTable
CREATE TABLE "tbl_department" (
    "pk_chr_department_id" TEXT NOT NULL,
    "chr_department_name" TEXT NOT NULL,
    "chr_department_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_department_pkey" PRIMARY KEY ("pk_chr_department_id")
);

-- CreateTable
CREATE TABLE "tbl_category" (
    "pk_chr_category_id" TEXT NOT NULL,
    "chr_category_name" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'N',
    "dt_deleted_at" TIMESTAMP(3),
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,

    CONSTRAINT "tbl_category_pkey" PRIMARY KEY ("pk_chr_category_id")
);

-- CreateTable
CREATE TABLE "tbl_priority" (
    "pk_chr_priority_id" TEXT NOT NULL,
    "chr_priority_name" TEXT NOT NULL,
    "chr_priority_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "int_level" INTEGER NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_priority_pkey" PRIMARY KEY ("pk_chr_priority_id")
);

-- CreateTable
CREATE TABLE "tbl_request_status" (
    "pk_chr_request_status_id" TEXT NOT NULL,
    "chr_status_name" TEXT NOT NULL,
    "chr_status_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "int_order" INTEGER NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_request_status_pkey" PRIMARY KEY ("pk_chr_request_status_id")
);

-- CreateTable
CREATE TABLE "tbl_request_phase" (
    "pk_chr_request_phase_id" TEXT NOT NULL,
    "chr_phase_name" TEXT NOT NULL,
    "chr_phase_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "int_order" INTEGER NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_request_phase_pkey" PRIMARY KEY ("pk_chr_request_phase_id")
);

-- CreateTable
CREATE TABLE "tbl_notification_type" (
    "pk_chr_notification_type_id" TEXT NOT NULL,
    "chr_type_name" TEXT NOT NULL,
    "chr_type_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_notification_type_pkey" PRIMARY KEY ("pk_chr_notification_type_id")
);

-- CreateTable
CREATE TABLE "tbl_approval_level" (
    "pk_chr_approval_level_id" TEXT NOT NULL,
    "chr_approval_level" TEXT NOT NULL,
    "txt_description" TEXT,
    "int_order" INTEGER NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "flt_from_amount" DOUBLE PRECISION NOT NULL,
    "flt_to_amount" DOUBLE PRECISION NOT NULL,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_approval_level_pkey" PRIMARY KEY ("pk_chr_approval_level_id")
);

-- CreateTable
CREATE TABLE "tbl_sla_policy" (
    "pk_chr_sla_policy_id" TEXT NOT NULL,
    "chr_policy_name" TEXT NOT NULL,
    "chr_policy_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "fk_chr_priority_id" TEXT NOT NULL,
    "int_response_time_mins" INTEGER NOT NULL,
    "int_resolution_time_mins" INTEGER NOT NULL,
    "int_escalation_time_mins" INTEGER NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_sla_policy_pkey" PRIMARY KEY ("pk_chr_sla_policy_id")
);

-- CreateTable
CREATE TABLE "tbl_vendor" (
    "pk_chr_vendor_id" TEXT NOT NULL,
    "chr_vendor_name" TEXT NOT NULL,
    "chr_vendor_email" TEXT NOT NULL,
    "chr_vendor_phone" TEXT NOT NULL,
    "fk_chr_country_id" TEXT,
    "fk_chr_city_id" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_vendor_pkey" PRIMARY KEY ("pk_chr_vendor_id")
);

-- CreateTable
CREATE TABLE "tbl_item" (
    "pk_chr_item_id" TEXT NOT NULL,
    "chr_item_name" TEXT NOT NULL,
    "chr_item_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "fk_chr_category_id" TEXT NOT NULL,
    "chr_unit" TEXT,
    "chr_documents" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_item_pkey" PRIMARY KEY ("pk_chr_item_id")
);

-- CreateTable
CREATE TABLE "tbl_vendor_items" (
    "pk_chr_vendor_item_id" TEXT NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "chr_item_name" TEXT NOT NULL,
    "chr_item_code" TEXT NOT NULL,
    "txt_description" TEXT,
    "chr_unit" TEXT,
    "flt_unit_price" DOUBLE PRECISION,
    "chr_currency" TEXT NOT NULL DEFAULT 'USD',
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "chr_documents" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_vendor_items_pkey" PRIMARY KEY ("pk_chr_vendor_item_id")
);

-- CreateTable
CREATE TABLE "tbl_purchase_request" (
    "pk_chr_request_id" TEXT NOT NULL,
    "chr_request_number" TEXT NOT NULL,
    "chr_title" TEXT NOT NULL,
    "txt_description" TEXT,
    "fk_chr_current_status_id" TEXT NOT NULL,
    "fk_chr_priority_id" TEXT NOT NULL,
    "flt_estimated_value" DOUBLE PRECISION,
    "chr_currency" TEXT NOT NULL DEFAULT 'USD',
    "fk_chr_requested_by_id" TEXT NOT NULL,
    "fk_chr_department_id" TEXT,
    "fk_chr_category_id" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_purchase_request_pkey" PRIMARY KEY ("pk_chr_request_id")
);

-- CreateTable
CREATE TABLE "tbl_approval" (
    "pk_chr_approval_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "fk_chr_approver_id" TEXT NOT NULL,
    "fk_chr_approval_level_id" TEXT NOT NULL,
    "chr_status" TEXT NOT NULL DEFAULT 'PENDING',
    "txt_comment" TEXT,
    "tim_actioned_at" TIMESTAMP(3),
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_approval_pkey" PRIMARY KEY ("pk_chr_approval_id")
);

-- CreateTable
CREATE TABLE "tbl_request_history" (
    "pk_chr_status_history_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "fk_chr_from_status_id" TEXT,
    "fk_chr_to_status_id" TEXT NOT NULL,
    "fk_chr_from_phase_id" TEXT,
    "fk_chr_to_phase_id" TEXT NOT NULL,
    "fk_chr_changed_by_id" TEXT NOT NULL,
    "txt_comment" TEXT,
    "json_metadata" JSONB,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_request_history_pkey" PRIMARY KEY ("pk_chr_status_history_id")
);

-- CreateTable
CREATE TABLE "tbl_request_attachment_master" (
    "pk_chr_attchment_master_id" TEXT NOT NULL,
    "chr_entity_type" TEXT NOT NULL,
    "fk_chr_entity_id" TEXT NOT NULL,
    "chr_folder_path" TEXT NOT NULL,
    "fk_chr_phase_id" TEXT,
    "fk_chr_uploaded_by_id" TEXT NOT NULL,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_request_attachment_master_pkey" PRIMARY KEY ("pk_chr_attchment_master_id")
);

-- CreateTable
CREATE TABLE "tbl_request_attachments" (
    "pk_chr_request_attchment_id" TEXT NOT NULL,
    "fk_chr_attchment_master_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "chr_file_name" TEXT NOT NULL,
    "chr_file_url" TEXT NOT NULL,
    "chr_file_type" TEXT NOT NULL,
    "int_file_size" INTEGER,
    "fk_chr_uploaded_by_id" TEXT NOT NULL,
    "fk_chr_phase_id" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_request_attachments_pkey" PRIMARY KEY ("pk_chr_request_attchment_id")
);

-- CreateTable
CREATE TABLE "tbl_purchase_request_item_mapping" (
    "pk_chr_pr_item_mapping_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "fk_chr_item_id" TEXT NOT NULL,
    "chr_item_description" TEXT NOT NULL,
    "int_quantity" INTEGER NOT NULL,
    "chr_unit_of_measure" TEXT,
    "flt_estimated_unit_price" DOUBLE PRECISION,
    "flt_total_price" DOUBLE PRECISION,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_purchase_request_item_mapping_pkey" PRIMARY KEY ("pk_chr_pr_item_mapping_id")
);

-- CreateTable
CREATE TABLE "tbl_contract" (
    "pk_chr_contract_id" TEXT NOT NULL,
    "chr_title" TEXT NOT NULL,
    "txt_description" TEXT,
    "chr_status" TEXT NOT NULL DEFAULT 'DRAFT',
    "dt_start_date" TIMESTAMP(3) NOT NULL,
    "dt_end_date" TIMESTAMP(3) NOT NULL,
    "flt_value" DOUBLE PRECISION NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_contract_pkey" PRIMARY KEY ("pk_chr_contract_id")
);

-- CreateTable
CREATE TABLE "tbl_expression_of_interest" (
    "pk_chr_eoi_id" TEXT NOT NULL,
    "chr_eoi_code" TEXT NOT NULL,
    "chr_eoi_title" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "chr_status" TEXT NOT NULL DEFAULT 'DRAFT',
    "txt_notes" TEXT,
    "dt_submission_deadline" TIMESTAMP(3) NOT NULL,
    "dt_submitted_at" TIMESTAMP(3),
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_expression_of_interest_pkey" PRIMARY KEY ("pk_chr_eoi_id")
);

-- CreateTable
CREATE TABLE "tbl_request_for_quotation" (
    "pk_chr_rfq_id" TEXT NOT NULL,
    "chr_rfq_code" TEXT NOT NULL,
    "chr_rfq_title" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "fk_chr_eoi_id" TEXT,
    "chr_status" TEXT NOT NULL DEFAULT 'DRAFT',
    "dt_issue_date" TIMESTAMP(3) NOT NULL,
    "dt_due_date" TIMESTAMP(3) NOT NULL,
    "dt_submission_deadline" TIMESTAMP(3) NOT NULL,
    "txt_notes" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_request_for_quotation_pkey" PRIMARY KEY ("pk_chr_rfq_id")
);

-- CreateTable
CREATE TABLE "tbl_quotation" (
    "pk_chr_quotation_id" TEXT NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "fk_chr_rfq_id" TEXT NOT NULL,
    "fk_chr_category_id" TEXT,
    "fk_chr_buyer_id" TEXT,
    "chr_status" TEXT NOT NULL DEFAULT 'DRAFT',
    "flt_total_amount" DOUBLE PRECISION,
    "chr_currency" TEXT NOT NULL DEFAULT 'USD',
    "dt_issue_date" TIMESTAMP(3) NOT NULL,
    "dt_due_date" TIMESTAMP(3) NOT NULL,
    "txt_notes" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_quotation_pkey" PRIMARY KEY ("pk_chr_quotation_id")
);

-- CreateTable
CREATE TABLE "tbl_quotation_item" (
    "pk_chr_quotation_item_id" TEXT NOT NULL,
    "fk_chr_quotation_id" TEXT NOT NULL,
    "fk_chr_item_id" TEXT NOT NULL,
    "fk_chr_vendor_item_id" TEXT,
    "chr_item_description" TEXT NOT NULL,
    "int_quantity" INTEGER NOT NULL,
    "chr_unit_of_measure" TEXT,
    "flt_unit_price" DOUBLE PRECISION NOT NULL,
    "flt_tax_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "flt_tax_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "flt_total_price" DOUBLE PRECISION NOT NULL,
    "chr_currency" TEXT NOT NULL DEFAULT 'USD',
    "dt_delivery_lead_time" TIMESTAMP(3),
    "txt_notes" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_quotation_item_pkey" PRIMARY KEY ("pk_chr_quotation_item_id")
);

-- CreateTable
CREATE TABLE "tbl_purchase_order" (
    "pk_chr_purchase_order_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "chr_po_number" TEXT NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "flt_total_value" DOUBLE PRECISION NOT NULL,
    "chr_currency" TEXT NOT NULL DEFAULT 'USD',
    "dt_issued_at" TIMESTAMP(3),
    "chr_delivery_address" TEXT,
    "dt_expected_delivery" TIMESTAMP(3),
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_purchase_order_pkey" PRIMARY KEY ("pk_chr_purchase_order_id")
);

-- CreateTable
CREATE TABLE "tbl_goods_receipt" (
    "pk_chr_goods_receipt_id" TEXT NOT NULL,
    "chr_grn_code" TEXT NOT NULL,
    "fk_chr_purchase_order_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "chr_status" TEXT NOT NULL DEFAULT 'PENDING',
    "dt_received_at" TIMESTAMP(3) NOT NULL,
    "chr_delivery_note_no" TEXT,
    "txt_notes" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_goods_receipt_pkey" PRIMARY KEY ("pk_chr_goods_receipt_id")
);

-- CreateTable
CREATE TABLE "tbl_goods_receipt_item" (
    "pk_chr_gri_id" TEXT NOT NULL,
    "fk_chr_goods_receipt_id" TEXT NOT NULL,
    "fk_chr_item_id" TEXT NOT NULL,
    "int_quantity_ordered" INTEGER NOT NULL,
    "int_quantity_received" INTEGER NOT NULL,
    "int_quantity_rejected" INTEGER NOT NULL DEFAULT 0,
    "chr_unit_of_measure" TEXT,
    "txt_rejection_reason" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_goods_receipt_item_pkey" PRIMARY KEY ("pk_chr_gri_id")
);

-- CreateTable
CREATE TABLE "tbl_invoice" (
    "pk_chr_invoice_id" TEXT NOT NULL,
    "chr_invoice_number" TEXT NOT NULL,
    "fk_chr_purchase_order_id" TEXT NOT NULL,
    "fk_chr_goods_receipt_id" TEXT,
    "fk_chr_request_id" TEXT NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "chr_status" TEXT NOT NULL DEFAULT 'PENDING',
    "flt_subtotal" DOUBLE PRECISION NOT NULL,
    "flt_tax_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "flt_total_amount" DOUBLE PRECISION NOT NULL,
    "chr_currency" TEXT NOT NULL DEFAULT 'USD',
    "dt_invoice_date" TIMESTAMP(3) NOT NULL,
    "dt_due_date" TIMESTAMP(3) NOT NULL,
    "dt_paid_at" TIMESTAMP(3),
    "txt_notes" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_invoice_pkey" PRIMARY KEY ("pk_chr_invoice_id")
);

-- CreateTable
CREATE TABLE "tbl_chat_room" (
    "pk_chr_chat_room_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT NOT NULL,
    "chr_name" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_chat_room_pkey" PRIMARY KEY ("pk_chr_chat_room_id")
);

-- CreateTable
CREATE TABLE "tbl_chat_room_member" (
    "pk_chr_chat_room_member_id" TEXT NOT NULL,
    "fk_chr_chat_room_id" TEXT NOT NULL,
    "fk_chr_user_id" TEXT,
    "fk_chr_vendor_id" TEXT,
    "chr_role" TEXT NOT NULL DEFAULT 'MEMBER',
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_chat_room_member_pkey" PRIMARY KEY ("pk_chr_chat_room_member_id")
);

-- CreateTable
CREATE TABLE "tbl_chat_message" (
    "pk_chr_chat_message_id" TEXT NOT NULL,
    "fk_chr_chat_room_id" TEXT NOT NULL,
    "fk_chr_sender_id" TEXT NOT NULL,
    "chr_sender_type" TEXT NOT NULL,
    "txt_content" TEXT NOT NULL,
    "bln_is_read" BOOLEAN NOT NULL DEFAULT false,
    "chr_attachment_url" TEXT,
    "chr_attachment_type" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_chat_message_pkey" PRIMARY KEY ("pk_chr_chat_message_id")
);

-- CreateTable
CREATE TABLE "tbl_notification" (
    "pk_chr_notification_id" TEXT NOT NULL,
    "fk_chr_notification_type_id" TEXT NOT NULL,
    "fk_chr_user_id" TEXT NOT NULL,
    "fk_chr_request_id" TEXT,
    "chr_title" TEXT NOT NULL,
    "txt_message" TEXT NOT NULL,
    "chr_channel" TEXT NOT NULL DEFAULT 'IN_APP',
    "chr_status" TEXT NOT NULL DEFAULT 'PENDING',
    "bln_is_read" BOOLEAN NOT NULL DEFAULT false,
    "tim_sent_at" TIMESTAMP(3),
    "tim_read_at" TIMESTAMP(3),
    "json_metadata" JSONB,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_notification_pkey" PRIMARY KEY ("pk_chr_notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_tenant_registry_chr_tenant_name_key" ON "tbl_tenant_registry"("chr_tenant_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_tenant_registry_chr_tenant_code_key" ON "tbl_tenant_registry"("chr_tenant_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_tenant_registry_chr_email_key" ON "tbl_tenant_registry"("chr_email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_chr_user_email_key" ON "tbl_user"("chr_user_email");

-- CreateIndex
CREATE INDEX "tbl_user_fk_chr_tenant_id_idx" ON "tbl_user"("fk_chr_tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_role_chr_role_name_key" ON "tbl_user_role"("chr_role_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_role_chr_role_code_key" ON "tbl_user_role"("chr_role_code");

-- CreateIndex
CREATE INDEX "tbl_user_role_mapping_fk_chr_user_id_idx" ON "tbl_user_role_mapping"("fk_chr_user_id");

-- CreateIndex
CREATE INDEX "tbl_user_role_mapping_fk_chr_role_id_idx" ON "tbl_user_role_mapping"("fk_chr_role_id");

-- CreateIndex
CREATE INDEX "tbl_user_role_mapping_bln_is_active_idx" ON "tbl_user_role_mapping"("bln_is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_role_mapping_fk_chr_user_id_fk_chr_role_id_key" ON "tbl_user_role_mapping"("fk_chr_user_id", "fk_chr_role_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_activations_chr_token_hash_key" ON "tbl_activations"("chr_token_hash");

-- CreateIndex
CREATE INDEX "tbl_activations_fk_chr_user_id_idx" ON "tbl_activations"("fk_chr_user_id");

-- CreateIndex
CREATE INDEX "tbl_activations_tim_expires_at_idx" ON "tbl_activations"("tim_expires_at");

-- CreateIndex
CREATE INDEX "tbl_activations_bln_is_used_idx" ON "tbl_activations"("bln_is_used");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_country_chr_country_name_key" ON "tbl_country"("chr_country_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_country_chr_country_code_key" ON "tbl_country"("chr_country_code");

-- CreateIndex
CREATE INDEX "tbl_city_fk_chr_country_id_idx" ON "tbl_city"("fk_chr_country_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_department_chr_department_name_key" ON "tbl_department"("chr_department_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_department_chr_department_code_key" ON "tbl_department"("chr_department_code");

-- CreateIndex
CREATE INDEX "tbl_category_bln_is_active_idx" ON "tbl_category"("bln_is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_priority_chr_priority_name_key" ON "tbl_priority"("chr_priority_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_priority_chr_priority_code_key" ON "tbl_priority"("chr_priority_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_status_chr_status_name_key" ON "tbl_request_status"("chr_status_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_status_chr_status_code_key" ON "tbl_request_status"("chr_status_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_phase_chr_phase_name_key" ON "tbl_request_phase"("chr_phase_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_phase_chr_phase_code_key" ON "tbl_request_phase"("chr_phase_code");

-- CreateIndex
CREATE INDEX "tbl_request_phase_int_order_idx" ON "tbl_request_phase"("int_order");

-- CreateIndex
CREATE INDEX "tbl_request_phase_bln_is_active_idx" ON "tbl_request_phase"("bln_is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_notification_type_chr_type_name_key" ON "tbl_notification_type"("chr_type_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_notification_type_chr_type_code_key" ON "tbl_notification_type"("chr_type_code");

-- CreateIndex
CREATE INDEX "tbl_notification_type_bln_is_active_idx" ON "tbl_notification_type"("bln_is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_approval_level_chr_approval_level_key" ON "tbl_approval_level"("chr_approval_level");

-- CreateIndex
CREATE INDEX "tbl_approval_level_bln_is_active_idx" ON "tbl_approval_level"("bln_is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_sla_policy_chr_policy_name_key" ON "tbl_sla_policy"("chr_policy_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_sla_policy_chr_policy_code_key" ON "tbl_sla_policy"("chr_policy_code");

-- CreateIndex
CREATE INDEX "tbl_sla_policy_fk_chr_priority_id_idx" ON "tbl_sla_policy"("fk_chr_priority_id");

-- CreateIndex
CREATE INDEX "tbl_sla_policy_bln_is_active_idx" ON "tbl_sla_policy"("bln_is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendor_chr_vendor_email_key" ON "tbl_vendor"("chr_vendor_email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_item_chr_item_code_key" ON "tbl_item"("chr_item_code");

-- CreateIndex
CREATE INDEX "tbl_item_fk_chr_category_id_idx" ON "tbl_item"("fk_chr_category_id");

-- CreateIndex
CREATE INDEX "tbl_vendor_items_fk_chr_vendor_id_idx" ON "tbl_vendor_items"("fk_chr_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_vendor_items_bln_is_active_idx" ON "tbl_vendor_items"("bln_is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_purchase_request_chr_request_number_key" ON "tbl_purchase_request"("chr_request_number");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_fk_chr_current_status_id_idx" ON "tbl_purchase_request"("fk_chr_current_status_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_fk_chr_requested_by_id_idx" ON "tbl_purchase_request"("fk_chr_requested_by_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_fk_chr_priority_id_idx" ON "tbl_purchase_request"("fk_chr_priority_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_chr_request_number_idx" ON "tbl_purchase_request"("chr_request_number");

-- CreateIndex
CREATE INDEX "tbl_approval_fk_chr_request_id_idx" ON "tbl_approval"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_approval_fk_chr_approver_id_idx" ON "tbl_approval"("fk_chr_approver_id");

-- CreateIndex
CREATE INDEX "tbl_approval_fk_chr_approval_level_id_idx" ON "tbl_approval"("fk_chr_approval_level_id");

-- CreateIndex
CREATE INDEX "tbl_approval_chr_status_idx" ON "tbl_approval"("chr_status");

-- CreateIndex
CREATE INDEX "tbl_request_history_fk_chr_request_id_idx" ON "tbl_request_history"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_request_history_tim_created_idx" ON "tbl_request_history"("tim_created");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_fk_chr_entity_id_idx" ON "tbl_request_attachment_master"("fk_chr_entity_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_chr_entity_type_idx" ON "tbl_request_attachment_master"("chr_entity_type");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_fk_chr_phase_id_idx" ON "tbl_request_attachment_master"("fk_chr_phase_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachment_master_fk_chr_uploaded_by_id_idx" ON "tbl_request_attachment_master"("fk_chr_uploaded_by_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_chr_attchment_master_id_idx" ON "tbl_request_attachments"("fk_chr_attchment_master_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_chr_request_id_idx" ON "tbl_request_attachments"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_chr_uploaded_by_id_idx" ON "tbl_request_attachments"("fk_chr_uploaded_by_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_fk_chr_phase_id_idx" ON "tbl_request_attachments"("fk_chr_phase_id");

-- CreateIndex
CREATE INDEX "tbl_request_attachments_chr_file_type_idx" ON "tbl_request_attachments"("chr_file_type");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_item_mapping_fk_chr_request_id_idx" ON "tbl_purchase_request_item_mapping"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_request_item_mapping_fk_chr_item_id_idx" ON "tbl_purchase_request_item_mapping"("fk_chr_item_id");

-- CreateIndex
CREATE INDEX "tbl_contract_fk_chr_vendor_id_idx" ON "tbl_contract"("fk_chr_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_contract_fk_chr_request_id_idx" ON "tbl_contract"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_contract_chr_status_idx" ON "tbl_contract"("chr_status");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_expression_of_interest_chr_eoi_code_key" ON "tbl_expression_of_interest"("chr_eoi_code");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_fk_chr_request_id_idx" ON "tbl_expression_of_interest"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_fk_chr_vendor_id_idx" ON "tbl_expression_of_interest"("fk_chr_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_chr_status_idx" ON "tbl_expression_of_interest"("chr_status");

-- CreateIndex
CREATE INDEX "tbl_expression_of_interest_dt_submission_deadline_idx" ON "tbl_expression_of_interest"("dt_submission_deadline");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_for_quotation_chr_rfq_code_key" ON "tbl_request_for_quotation"("chr_rfq_code");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_fk_chr_request_id_idx" ON "tbl_request_for_quotation"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_fk_chr_eoi_id_idx" ON "tbl_request_for_quotation"("fk_chr_eoi_id");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_chr_status_idx" ON "tbl_request_for_quotation"("chr_status");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_dt_submission_deadline_idx" ON "tbl_request_for_quotation"("dt_submission_deadline");

-- CreateIndex
CREATE INDEX "tbl_request_for_quotation_dt_due_date_idx" ON "tbl_request_for_quotation"("dt_due_date");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_chr_vendor_id_idx" ON "tbl_quotation"("fk_chr_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_chr_rfq_id_idx" ON "tbl_quotation"("fk_chr_rfq_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_chr_category_id_idx" ON "tbl_quotation"("fk_chr_category_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_fk_chr_buyer_id_idx" ON "tbl_quotation"("fk_chr_buyer_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_chr_status_idx" ON "tbl_quotation"("chr_status");

-- CreateIndex
CREATE INDEX "tbl_quotation_dt_due_date_idx" ON "tbl_quotation"("dt_due_date");

-- CreateIndex
CREATE INDEX "tbl_quotation_item_fk_chr_quotation_id_idx" ON "tbl_quotation_item"("fk_chr_quotation_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_item_fk_chr_item_id_idx" ON "tbl_quotation_item"("fk_chr_item_id");

-- CreateIndex
CREATE INDEX "tbl_quotation_item_fk_chr_vendor_item_id_idx" ON "tbl_quotation_item"("fk_chr_vendor_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_purchase_order_chr_po_number_key" ON "tbl_purchase_order"("chr_po_number");

-- CreateIndex
CREATE INDEX "tbl_purchase_order_fk_chr_request_id_idx" ON "tbl_purchase_order"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_order_fk_chr_vendor_id_idx" ON "tbl_purchase_order"("fk_chr_vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_goods_receipt_chr_grn_code_key" ON "tbl_goods_receipt"("chr_grn_code");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_fk_chr_purchase_order_id_idx" ON "tbl_goods_receipt"("fk_chr_purchase_order_id");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_fk_chr_request_id_idx" ON "tbl_goods_receipt"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_fk_chr_vendor_id_idx" ON "tbl_goods_receipt"("fk_chr_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_chr_status_idx" ON "tbl_goods_receipt"("chr_status");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_dt_received_at_idx" ON "tbl_goods_receipt"("dt_received_at");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_item_fk_chr_goods_receipt_id_idx" ON "tbl_goods_receipt_item"("fk_chr_goods_receipt_id");

-- CreateIndex
CREATE INDEX "tbl_goods_receipt_item_fk_chr_item_id_idx" ON "tbl_goods_receipt_item"("fk_chr_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_invoice_chr_invoice_number_key" ON "tbl_invoice"("chr_invoice_number");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_chr_purchase_order_id_idx" ON "tbl_invoice"("fk_chr_purchase_order_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_chr_goods_receipt_id_idx" ON "tbl_invoice"("fk_chr_goods_receipt_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_chr_request_id_idx" ON "tbl_invoice"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_fk_chr_vendor_id_idx" ON "tbl_invoice"("fk_chr_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_invoice_chr_status_idx" ON "tbl_invoice"("chr_status");

-- CreateIndex
CREATE INDEX "tbl_invoice_dt_due_date_idx" ON "tbl_invoice"("dt_due_date");

-- CreateIndex
CREATE INDEX "tbl_invoice_dt_paid_at_idx" ON "tbl_invoice"("dt_paid_at");

-- CreateIndex
CREATE INDEX "tbl_chat_room_fk_chr_request_id_idx" ON "tbl_chat_room"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_chat_room_member_fk_chr_chat_room_id_idx" ON "tbl_chat_room_member"("fk_chr_chat_room_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_chat_room_member_fk_chr_chat_room_id_fk_chr_user_id_key" ON "tbl_chat_room_member"("fk_chr_chat_room_id", "fk_chr_user_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_fk_chr_chat_room_id_idx" ON "tbl_chat_message"("fk_chr_chat_room_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_fk_chr_sender_id_idx" ON "tbl_chat_message"("fk_chr_sender_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_tim_created_idx" ON "tbl_chat_message"("tim_created");

-- CreateIndex
CREATE INDEX "tbl_notification_fk_chr_user_id_idx" ON "tbl_notification"("fk_chr_user_id");

-- CreateIndex
CREATE INDEX "tbl_notification_fk_chr_notification_type_id_idx" ON "tbl_notification"("fk_chr_notification_type_id");

-- CreateIndex
CREATE INDEX "tbl_notification_fk_chr_request_id_idx" ON "tbl_notification"("fk_chr_request_id");

-- CreateIndex
CREATE INDEX "tbl_notification_chr_channel_idx" ON "tbl_notification"("chr_channel");

-- CreateIndex
CREATE INDEX "tbl_notification_chr_status_idx" ON "tbl_notification"("chr_status");

-- CreateIndex
CREATE INDEX "tbl_notification_bln_is_read_idx" ON "tbl_notification"("bln_is_read");

-- CreateIndex
CREATE INDEX "tbl_notification_tim_sent_at_idx" ON "tbl_notification"("tim_sent_at");

-- CreateIndex
CREATE INDEX "tbl_notification_tim_created_idx" ON "tbl_notification"("tim_created");

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_chr_tenant_id_fkey" FOREIGN KEY ("fk_chr_tenant_id") REFERENCES "tbl_tenant_registry"("pk_chr_tenant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_chr_user_id_fkey" FOREIGN KEY ("fk_chr_user_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_chr_role_id_fkey" FOREIGN KEY ("fk_chr_role_id") REFERENCES "tbl_user_role"("pk_chr_role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_user_role_mapping" ADD CONSTRAINT "tbl_user_role_mapping_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_activations" ADD CONSTRAINT "tbl_activations_fk_chr_user_id_fkey" FOREIGN KEY ("fk_chr_user_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_activations" ADD CONSTRAINT "tbl_activations_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_activations" ADD CONSTRAINT "tbl_activations_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_country" ADD CONSTRAINT "tbl_country_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_country" ADD CONSTRAINT "tbl_country_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_city" ADD CONSTRAINT "tbl_city_fk_chr_country_id_fkey" FOREIGN KEY ("fk_chr_country_id") REFERENCES "tbl_country"("pk_chr_country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_city" ADD CONSTRAINT "tbl_city_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_city" ADD CONSTRAINT "tbl_city_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_department" ADD CONSTRAINT "tbl_department_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_department" ADD CONSTRAINT "tbl_department_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_category" ADD CONSTRAINT "tbl_category_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_category" ADD CONSTRAINT "tbl_category_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_priority" ADD CONSTRAINT "tbl_priority_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_priority" ADD CONSTRAINT "tbl_priority_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_status" ADD CONSTRAINT "tbl_request_status_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_status" ADD CONSTRAINT "tbl_request_status_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_phase" ADD CONSTRAINT "tbl_request_phase_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_phase" ADD CONSTRAINT "tbl_request_phase_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_notification_type" ADD CONSTRAINT "tbl_notification_type_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_notification_type" ADD CONSTRAINT "tbl_notification_type_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_approval_level" ADD CONSTRAINT "tbl_approval_level_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_approval_level" ADD CONSTRAINT "tbl_approval_level_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_sla_policy" ADD CONSTRAINT "tbl_sla_policy_fk_chr_priority_id_fkey" FOREIGN KEY ("fk_chr_priority_id") REFERENCES "tbl_priority"("pk_chr_priority_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_sla_policy" ADD CONSTRAINT "tbl_sla_policy_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_sla_policy" ADD CONSTRAINT "tbl_sla_policy_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_chr_country_id_fkey" FOREIGN KEY ("fk_chr_country_id") REFERENCES "tbl_country"("pk_chr_country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_chr_city_id_fkey" FOREIGN KEY ("fk_chr_city_id") REFERENCES "tbl_city"("pk_chr_city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_item" ADD CONSTRAINT "tbl_item_fk_chr_category_id_fkey" FOREIGN KEY ("fk_chr_category_id") REFERENCES "tbl_category"("pk_chr_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_item" ADD CONSTRAINT "tbl_item_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_item" ADD CONSTRAINT "tbl_item_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor_items" ADD CONSTRAINT "tbl_vendor_items_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_items" ADD CONSTRAINT "tbl_vendor_items_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor_items" ADD CONSTRAINT "tbl_vendor_items_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_chr_current_status_id_fkey" FOREIGN KEY ("fk_chr_current_status_id") REFERENCES "tbl_request_status"("pk_chr_request_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_chr_priority_id_fkey" FOREIGN KEY ("fk_chr_priority_id") REFERENCES "tbl_priority"("pk_chr_priority_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_chr_requested_by_id_fkey" FOREIGN KEY ("fk_chr_requested_by_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_chr_department_id_fkey" FOREIGN KEY ("fk_chr_department_id") REFERENCES "tbl_department"("pk_chr_department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_chr_category_id_fkey" FOREIGN KEY ("fk_chr_category_id") REFERENCES "tbl_category"("pk_chr_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request" ADD CONSTRAINT "tbl_purchase_request_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_chr_approver_id_fkey" FOREIGN KEY ("fk_chr_approver_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_chr_approval_level_id_fkey" FOREIGN KEY ("fk_chr_approval_level_id") REFERENCES "tbl_approval_level"("pk_chr_approval_level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_approval" ADD CONSTRAINT "tbl_approval_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_chr_changed_by_id_fkey" FOREIGN KEY ("fk_chr_changed_by_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_chr_from_status_id_fkey" FOREIGN KEY ("fk_chr_from_status_id") REFERENCES "tbl_request_status"("pk_chr_request_status_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_chr_to_status_id_fkey" FOREIGN KEY ("fk_chr_to_status_id") REFERENCES "tbl_request_status"("pk_chr_request_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_chr_from_phase_id_fkey" FOREIGN KEY ("fk_chr_from_phase_id") REFERENCES "tbl_request_phase"("pk_chr_request_phase_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_history" ADD CONSTRAINT "tbl_request_history_fk_chr_to_phase_id_fkey" FOREIGN KEY ("fk_chr_to_phase_id") REFERENCES "tbl_request_phase"("pk_chr_request_phase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_chr_phase_id_fkey" FOREIGN KEY ("fk_chr_phase_id") REFERENCES "tbl_request_phase"("pk_chr_request_phase_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_chr_uploaded_by_id_fkey" FOREIGN KEY ("fk_chr_uploaded_by_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_attachment_master" ADD CONSTRAINT "tbl_request_attachment_master_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_chr_attchment_master_id_fkey" FOREIGN KEY ("fk_chr_attchment_master_id") REFERENCES "tbl_request_attachment_master"("pk_chr_attchment_master_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_chr_uploaded_by_id_fkey" FOREIGN KEY ("fk_chr_uploaded_by_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_chr_phase_id_fkey" FOREIGN KEY ("fk_chr_phase_id") REFERENCES "tbl_request_phase"("pk_chr_request_phase_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_attachments" ADD CONSTRAINT "tbl_request_attachments_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_item_id_fkey" FOREIGN KEY ("fk_chr_item_id") REFERENCES "tbl_item"("pk_chr_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" ADD CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_contract" ADD CONSTRAINT "tbl_contract_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_expression_of_interest" ADD CONSTRAINT "tbl_expression_of_interest_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_chr_eoi_id_fkey" FOREIGN KEY ("fk_chr_eoi_id") REFERENCES "tbl_expression_of_interest"("pk_chr_eoi_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_request_for_quotation" ADD CONSTRAINT "tbl_request_for_quotation_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_chr_rfq_id_fkey" FOREIGN KEY ("fk_chr_rfq_id") REFERENCES "tbl_request_for_quotation"("pk_chr_rfq_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_chr_category_id_fkey" FOREIGN KEY ("fk_chr_category_id") REFERENCES "tbl_category"("pk_chr_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_chr_buyer_id_fkey" FOREIGN KEY ("fk_chr_buyer_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_quotation" ADD CONSTRAINT "tbl_quotation_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_quotation_item" ADD CONSTRAINT "tbl_quotation_item_fk_chr_quotation_id_fkey" FOREIGN KEY ("fk_chr_quotation_id") REFERENCES "tbl_quotation"("pk_chr_quotation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation_item" ADD CONSTRAINT "tbl_quotation_item_fk_chr_item_id_fkey" FOREIGN KEY ("fk_chr_item_id") REFERENCES "tbl_item"("pk_chr_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation_item" ADD CONSTRAINT "tbl_quotation_item_fk_chr_vendor_item_id_fkey" FOREIGN KEY ("fk_chr_vendor_item_id") REFERENCES "tbl_vendor_items"("pk_chr_vendor_item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_quotation_item" ADD CONSTRAINT "tbl_quotation_item_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_quotation_item" ADD CONSTRAINT "tbl_quotation_item_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_chr_purchase_order_id_fkey" FOREIGN KEY ("fk_chr_purchase_order_id") REFERENCES "tbl_purchase_order"("pk_chr_purchase_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt" ADD CONSTRAINT "tbl_goods_receipt_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_chr_goods_receipt_id_fkey" FOREIGN KEY ("fk_chr_goods_receipt_id") REFERENCES "tbl_goods_receipt"("pk_chr_goods_receipt_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_chr_item_id_fkey" FOREIGN KEY ("fk_chr_item_id") REFERENCES "tbl_item"("pk_chr_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_goods_receipt_item" ADD CONSTRAINT "tbl_goods_receipt_item_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_chr_purchase_order_id_fkey" FOREIGN KEY ("fk_chr_purchase_order_id") REFERENCES "tbl_purchase_order"("pk_chr_purchase_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_chr_goods_receipt_id_fkey" FOREIGN KEY ("fk_chr_goods_receipt_id") REFERENCES "tbl_goods_receipt"("pk_chr_goods_receipt_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_invoice" ADD CONSTRAINT "tbl_invoice_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_chat_room" ADD CONSTRAINT "tbl_chat_room_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_room" ADD CONSTRAINT "tbl_chat_room_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_chat_room" ADD CONSTRAINT "tbl_chat_room_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_chat_room_member" ADD CONSTRAINT "tbl_chat_room_member_fk_chr_chat_room_id_fkey" FOREIGN KEY ("fk_chr_chat_room_id") REFERENCES "tbl_chat_room"("pk_chr_chat_room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_room_member" ADD CONSTRAINT "tbl_chat_room_member_fk_chr_user_id_fkey" FOREIGN KEY ("fk_chr_user_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_room_member" ADD CONSTRAINT "tbl_chat_room_member_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_message" ADD CONSTRAINT "tbl_chat_message_fk_chr_chat_room_id_fkey" FOREIGN KEY ("fk_chr_chat_room_id") REFERENCES "tbl_chat_room"("pk_chr_chat_room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_chat_message" ADD CONSTRAINT "tbl_chat_message_fk_chr_sender_id_fkey" FOREIGN KEY ("fk_chr_sender_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_chr_notification_type_id_fkey" FOREIGN KEY ("fk_chr_notification_type_id") REFERENCES "tbl_notification_type"("pk_chr_notification_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_chr_user_id_fkey" FOREIGN KEY ("fk_chr_user_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_chr_request_id_fkey" FOREIGN KEY ("fk_chr_request_id") REFERENCES "tbl_purchase_request"("pk_chr_request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_notification" ADD CONSTRAINT "tbl_notification_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

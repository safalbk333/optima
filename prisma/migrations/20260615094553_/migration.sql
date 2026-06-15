/*
  Warnings:

  - The primary key for the `tbl_activations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_used` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `chr_token_hash` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_user_id` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_activation_token_id` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `tim_expires_at` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_activations` table. All the data in the column will be lost.
  - You are about to drop the column `tim_used_at` on the `tbl_activations` table. All the data in the column will be lost.
  - The primary key for the `tbl_approval` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_approval_level_id` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_approver_id` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_approval_id` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `tim_actioned_at` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_approval` table. All the data in the column will be lost.
  - You are about to drop the column `txt_comment` on the `tbl_approval` table. All the data in the column will be lost.
  - The primary key for the `tbl_approval_level` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `chr_approval_level` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `flt_from_amount` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `flt_to_amount` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `int_order` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_approval_level_id` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_approval_level` table. All the data in the column will be lost.
  - The primary key for the `tbl_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `chr_category_name` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `dt_deleted_at` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_category_id` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_category` table. All the data in the column will be lost.
  - The primary key for the `tbl_chat_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_read` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `chr_attachment_type` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `chr_attachment_url` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `chr_sender_type` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_chat_room_id` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_sender_id` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_chat_message_id` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `txt_content` on the `tbl_chat_message` table. All the data in the column will be lost.
  - The primary key for the `tbl_chat_room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `chr_name` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_chat_room_id` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_chat_room` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_chat_room` table. All the data in the column will be lost.
  - The primary key for the `tbl_chat_room_member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_chat_room_member` table. All the data in the column will be lost.
  - You are about to drop the column `chr_role` on the `tbl_chat_room_member` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_chat_room_id` on the `tbl_chat_room_member` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_user_id` on the `tbl_chat_room_member` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_vendor_id` on the `tbl_chat_room_member` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_chat_room_member_id` on the `tbl_chat_room_member` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_chat_room_member` table. All the data in the column will be lost.
  - The primary key for the `tbl_city` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `chr_city_name` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_country_id` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_city_id` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_city` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_city` table. All the data in the column will be lost.
  - The primary key for the `tbl_company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_city` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_company_address` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_company_code` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_company_email` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_company_name` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_company_phone` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_country` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_currency` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_logo_url` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_postal_code` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_state` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_tax_number` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `chr_website` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_company_id` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_company` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_company` table. All the data in the column will be lost.
  - The primary key for the `tbl_contract` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_contract_code` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `chr_title` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `dt_end_date` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `dt_start_date` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_vendor_id` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `flt_value` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_contract_id` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_contract` table. All the data in the column will be lost.
  - You are about to drop the column `txt_rendered_html` on the `tbl_contract` table. All the data in the column will be lost.
  - The primary key for the `tbl_country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `chr_country_code` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `chr_country_name` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_country_id` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_country` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_country` table. All the data in the column will be lost.
  - The primary key for the `tbl_department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `chr_department_code` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `chr_department_name` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_department_id` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_department` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_department` table. All the data in the column will be lost.
  - The primary key for the `tbl_expression_of_interest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `chr_eoi_code` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `chr_eoi_title` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `dt_submission_deadline` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `dt_submitted_at` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_vendor_id` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_eoi_id` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - You are about to drop the column `txt_notes` on the `tbl_expression_of_interest` table. All the data in the column will be lost.
  - The primary key for the `tbl_goods_receipt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_delivery_note_no` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `chr_grn_code` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `dt_received_at` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_purchase_order_id` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_goods_receipt_id` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `txt_notes` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - You are about to drop the column `txt_rendered_html` on the `tbl_goods_receipt` table. All the data in the column will be lost.
  - The primary key for the `tbl_goods_receipt_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `chr_unit_of_measure` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_goods_receipt_id` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_item_id` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `int_quantity_ordered` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `int_quantity_received` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `int_quantity_rejected` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_gri_id` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - You are about to drop the column `txt_rejection_reason` on the `tbl_goods_receipt_item` table. All the data in the column will be lost.
  - The primary key for the `tbl_invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_currency` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `chr_invoice_number` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dt_due_date` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dt_invoice_date` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dt_paid_at` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_goods_receipt_id` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_purchase_order_id` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_vendor_id` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `flt_subtotal` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `flt_tax_amount` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `flt_total_amount` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_invoice_id` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `txt_notes` on the `tbl_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `txt_rendered_html` on the `tbl_invoice` table. All the data in the column will be lost.
  - The primary key for the `tbl_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `chr_documents` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `chr_item_code` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `chr_item_name` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `chr_unit` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_category_id` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_item_id` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_item` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_item` table. All the data in the column will be lost.
  - The primary key for the `tbl_notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_read` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `chr_channel` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `chr_title` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_notification_type_id` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_user_id` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `json_metadata` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_notification_id` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `tim_read_at` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `tim_sent_at` on the `tbl_notification` table. All the data in the column will be lost.
  - You are about to drop the column `txt_message` on the `tbl_notification` table. All the data in the column will be lost.
  - The primary key for the `tbl_notification_type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `chr_type_code` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `chr_type_name` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_notification_type_id` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_notification_type` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_notification_type` table. All the data in the column will be lost.
  - The primary key for the `tbl_purchase_order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_currency` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `chr_delivery_address` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `chr_po_number` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `dt_expected_delivery` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `dt_issued_at` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_quotation_id` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_vendor_id` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `flt_total_value` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_purchase_order_id` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `txt_rendered_html` on the `tbl_purchase_order` table. All the data in the column will be lost.
  - The primary key for the `tbl_purchase_request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_currency` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `chr_request_number` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `chr_title` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_category_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_current_status_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_department_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_priority_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_requested_by_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `flt_estimated_value` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_request_id` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_purchase_request` table. All the data in the column will be lost.
  - The primary key for the `tbl_purchase_request_item_mapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `chr_item_description` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `chr_unit_of_measure` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_item_id` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `flt_estimated_unit_price` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `flt_total_price` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `int_quantity` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_pr_item_mapping_id` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_purchase_request_item_mapping` table. All the data in the column will be lost.
  - The primary key for the `tbl_quotation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_buyer_details` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `chr_currency` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `chr_seller_details` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `dt_due_date` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `dt_issue_date` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_buyer_id` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_category_id` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_rfq_id` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_vendor_id` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `flt_total_amount` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_quotation_id` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `txt_notes` on the `tbl_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `txt_rendered_html` on the `tbl_quotation` table. All the data in the column will be lost.
  - The primary key for the `tbl_request_attachment_master` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `chr_entity_type` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `chr_folder_path` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_entity_id` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_phase_id` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_uploaded_by_id` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_attchment_master_id` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_request_attachment_master` table. All the data in the column will be lost.
  - The primary key for the `tbl_request_attachments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `chr_file_name` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `chr_file_type` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `chr_file_url` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_attchment_master_id` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_phase_id` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_uploaded_by_id` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `int_file_size` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_request_attchment_id` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_request_attachments` table. All the data in the column will be lost.
  - The primary key for the `tbl_request_for_quotation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `chr_rfq_code` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `chr_rfq_title` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `dt_due_date` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `dt_issue_date` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `dt_submission_deadline` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_eoi_id` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_rfq_id` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `txt_notes` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - You are about to drop the column `txt_rendered_html` on the `tbl_request_for_quotation` table. All the data in the column will be lost.
  - The primary key for the `tbl_request_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fk_chr_changed_by_id` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_from_phase_id` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_from_status_id` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_request_id` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_to_phase_id` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_to_status_id` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `json_metadata` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_status_history_id` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_request_history` table. All the data in the column will be lost.
  - You are about to drop the column `txt_comment` on the `tbl_request_history` table. All the data in the column will be lost.
  - The primary key for the `tbl_request_phase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `chr_phase_code` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `chr_phase_name` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `int_order` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_request_phase_id` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_request_phase` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_request_phase` table. All the data in the column will be lost.
  - The primary key for the `tbl_shipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_asn_id` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `chr_documents` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `chr_logistics_provider` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `chr_notes` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `dt_delivery_date` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `dt_dispatch_date` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_tracking_no` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_vendor_id` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `int_quantity` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `int_status` on the `tbl_shipment` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_shipment_id` on the `tbl_shipment` table. All the data in the column will be lost.
  - The primary key for the `tbl_shipment_tracking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_courier_person_name` on the `tbl_shipment_tracking` table. All the data in the column will be lost.
  - You are about to drop the column `chr_courier_person_phone` on the `tbl_shipment_tracking` table. All the data in the column will be lost.
  - You are about to drop the column `chr_order_id` on the `tbl_shipment_tracking` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_shipment_tracking_id` on the `tbl_shipment_tracking` table. All the data in the column will be lost.
  - The primary key for the `tbl_sla_policy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `chr_policy_code` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `chr_policy_name` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_priority_id` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `int_escalation_time_mins` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `int_resolution_time_mins` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `int_response_time_mins` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_sla_policy_id` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_sla_policy` table. All the data in the column will be lost.
  - The primary key for the `tbl_templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_type` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `chr_template_code` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `chr_template_name` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_template_id` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_templates` table. All the data in the column will be lost.
  - You are about to drop the column `txt_html_content` on the `tbl_templates` table. All the data in the column will be lost.
  - The primary key for the `tbl_tenant_registry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `chr_email` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `chr_phone` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `chr_status` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `chr_tenant_code` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `chr_tenant_name` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_tenant_id` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_tenant_registry` table. All the data in the column will be lost.
  - The primary key for the `tbl_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `chr_user_email` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `chr_user_name` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `chr_user_phone` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_company_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_tenant_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_user_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_user` table. All the data in the column will be lost.
  - The primary key for the `tbl_user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `chr_role_code` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `chr_role_name` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_role_id` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_user_role` table. All the data in the column will be lost.
  - You are about to drop the column `txt_description` on the `tbl_user_role` table. All the data in the column will be lost.
  - The primary key for the `tbl_user_role_mapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bln_is_active` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `chr_document_status` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_role_id` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_user_id` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_user_role_mapping_id` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_user_role_mapping` table. All the data in the column will be lost.
  - The primary key for the `tbl_vendor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chr_document_status` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `chr_vendor_email` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `chr_vendor_name` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `chr_vendor_phone` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_city_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_company_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_country_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_created_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `fk_chr_modified_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `pk_chr_vendor_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `tim_created` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `tim_modified` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the `tbl_priority` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_quotation_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_request_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_rfq_item_mapping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_vendor_items` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token_hash]` on the table `tbl_activations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[approval_level]` on the table `tbl_approval_level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_chat_room_id,fk_user_id]` on the table `tbl_chat_room_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_code]` on the table `tbl_company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_email]` on the table `tbl_company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[country_name]` on the table `tbl_country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[country_code]` on the table `tbl_country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[department_name]` on the table `tbl_department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[department_code]` on the table `tbl_department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eoi_code]` on the table `tbl_expression_of_interest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[grn_code]` on the table `tbl_goods_receipt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoice_number]` on the table `tbl_invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_code]` on the table `tbl_item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type_name]` on the table `tbl_notification_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type_code]` on the table `tbl_notification_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[po_number]` on the table `tbl_purchase_order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[request_number]` on the table `tbl_purchase_request` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rfq_code]` on the table `tbl_request_for_quotation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phase_name]` on the table `tbl_request_phase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phase_code]` on the table `tbl_request_phase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[asn_id]` on the table `tbl_shipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[policy_name]` on the table `tbl_sla_policy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[policy_code]` on the table `tbl_sla_policy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[template_code]` on the table `tbl_templates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_name]` on the table `tbl_tenant_registry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenant_code]` on the table `tbl_tenant_registry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `tbl_tenant_registry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_name]` on the table `tbl_user_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_code]` on the table `tbl_user_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_user_id,fk_role_id]` on the table `tbl_user_role_mapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `tbl_vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_at` to the `tbl_activations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_user_id` to the `tbl_activations` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_activation_token_id` was added to the `tbl_activations` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `token_hash` to the `tbl_activations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_approval_level_id` to the `tbl_approval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_approver_id` to the `tbl_approval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_approval` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_approval_id` was added to the `tbl_approval` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `approval_level` to the `tbl_approval_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from_amount` to the `tbl_approval_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `tbl_approval_level` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_approval_level_id` was added to the `tbl_approval_level` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `to_amount` to the `tbl_approval_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_name` to the `tbl_category` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_category_id` was added to the `tbl_category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `content` to the `tbl_chat_message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_chat_room_id` to the `tbl_chat_message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_sender_id` to the `tbl_chat_message` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_chat_message_id` was added to the `tbl_chat_message` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `sender_type` to the `tbl_chat_message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_chat_room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tbl_chat_room` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_chat_room_id` was added to the `tbl_chat_room` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `fk_chat_room_id` to the `tbl_chat_room_member` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_chat_room_member_id` was added to the `tbl_chat_room_member` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `city_name` to the `tbl_city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_country_id` to the `tbl_city` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_city_id` was added to the `tbl_city` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `company_code` to the `tbl_company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_email` to the `tbl_company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `tbl_company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_phone` to the `tbl_company` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_company_id` was added to the `tbl_company` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `end_date` to the `tbl_contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_vendor_id` to the `tbl_contract` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_contract_id` was added to the `tbl_contract` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `start_date` to the `tbl_contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `tbl_contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `tbl_contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_code` to the `tbl_country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_name` to the `tbl_country` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_country_id` was added to the `tbl_country` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `department_code` to the `tbl_department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_name` to the `tbl_department` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_department_id` was added to the `tbl_department` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `eoi_code` to the `tbl_expression_of_interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eoi_title` to the `tbl_expression_of_interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_expression_of_interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_vendor_id` to the `tbl_expression_of_interest` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_eoi_id` was added to the `tbl_expression_of_interest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `submission_deadline` to the `tbl_expression_of_interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_purchase_order_id` to the `tbl_goods_receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grn_code` to the `tbl_goods_receipt` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_goods_receipt_id` was added to the `tbl_goods_receipt` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `received_at` to the `tbl_goods_receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_goods_receipt_id` to the `tbl_goods_receipt_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_item_id` to the `tbl_goods_receipt_item` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_gri_id` was added to the `tbl_goods_receipt_item` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `quantity_ordered` to the `tbl_goods_receipt_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_received` to the `tbl_goods_receipt_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_purchase_order_id` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_vendor_id` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_date` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_number` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_invoice_id` was added to the `tbl_invoice` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `subtotal` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `tbl_invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_category_id` to the `tbl_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_code` to the `tbl_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_name` to the `tbl_item` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_item_id` was added to the `tbl_item` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `fk_notification_type_id` to the `tbl_notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_user_id` to the `tbl_notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `tbl_notification` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_notification_id` was added to the `tbl_notification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `tbl_notification` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_notification_type_id` was added to the `tbl_notification_type` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `type_code` to the `tbl_notification_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_name` to the `tbl_notification_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_quotation_id` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_vendor_id` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_purchase_order_id` was added to the `tbl_purchase_order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `po_number` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `po_title` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_value` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_requested_by_id` to the `tbl_purchase_request` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_request_id` was added to the `tbl_purchase_request` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `request_number` to the `tbl_purchase_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `tbl_purchase_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `tbl_purchase_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_item_id` to the `tbl_purchase_request_item_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_purchase_request_item_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_description` to the `tbl_purchase_request_item_mapping` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_pr_item_mapping_id` was added to the `tbl_purchase_request_item_mapping` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `quantity` to the `tbl_purchase_request_item_mapping` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_quotation_id` was added to the `tbl_quotation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `entity_type` to the `tbl_request_attachment_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_entity_id` to the `tbl_request_attachment_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_uploaded_by_id` to the `tbl_request_attachment_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder_path` to the `tbl_request_attachment_master` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_attchment_master_id` was added to the `tbl_request_attachment_master` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `file_name` to the `tbl_request_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_type` to the `tbl_request_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_url` to the `tbl_request_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_attchment_master_id` to the `tbl_request_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_request_attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_uploaded_by_id` to the `tbl_request_attachments` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_request_attchment_id` was added to the `tbl_request_attachments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `due_date` to the `tbl_request_for_quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_request_for_quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue_date` to the `tbl_request_for_quotation` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_rfq_id` was added to the `tbl_request_for_quotation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `rfq_code` to the `tbl_request_for_quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rfq_title` to the `tbl_request_for_quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submission_deadline` to the `tbl_request_for_quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_changed_by_id` to the `tbl_request_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_request_id` to the `tbl_request_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_to_phase_id` to the `tbl_request_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_to_status` to the `tbl_request_history` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_status_history_id` was added to the `tbl_request_history` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `order` to the `tbl_request_phase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phase_code` to the `tbl_request_phase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phase_name` to the `tbl_request_phase` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_request_phase_id` was added to the `tbl_request_phase` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `asn_id` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_date` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dispatch_date` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_tracking_no` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_vendor_id` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logistics_provider` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_shipment_id` was added to the `tbl_shipment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `quantity` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `tbl_shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_person_name` to the `tbl_shipment_tracking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_person_phone` to the `tbl_shipment_tracking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `tbl_shipment_tracking` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_shipment_tracking_id` was added to the `tbl_shipment_tracking` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `escalation_time_mins` to the `tbl_sla_policy` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_sla_policy_id` was added to the `tbl_sla_policy` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `policy_code` to the `tbl_sla_policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policy_name` to the `tbl_sla_policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolution_time_mins` to the `tbl_sla_policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response_time_mins` to the `tbl_sla_policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type` to the `tbl_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `html_content` to the `tbl_templates` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_template_id` was added to the `tbl_templates` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `template_code` to the `tbl_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `template_name` to the `tbl_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `tbl_tenant_registry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `tbl_tenant_registry` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_tenant_id` was added to the `tbl_tenant_registry` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `tenant_code` to the `tbl_tenant_registry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_name` to the `tbl_tenant_registry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_tenant_id` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_user_id` was added to the `tbl_user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_email` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_phone` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_role_id` was added to the `tbl_user_role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `role_code` to the `tbl_user_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_name` to the `tbl_user_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_role_id` to the `tbl_user_role_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_user_id` to the `tbl_user_role_mapping` table without a default value. This is not possible if the table is not empty.
  - The required column `pk_user_role_mapping_id` was added to the `tbl_user_role_mapping` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `pk_vendor_id` was added to the `tbl_vendor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" DROP CONSTRAINT "_tbl_goods_receiptTotbl_shipment_A_fkey";

-- DropForeignKey
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" DROP CONSTRAINT "_tbl_goods_receiptTotbl_shipment_B_fkey";

-- DropForeignKey
ALTER TABLE "tbl_activations" DROP CONSTRAINT "tbl_activations_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_activations" DROP CONSTRAINT "tbl_activations_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_activations" DROP CONSTRAINT "tbl_activations_fk_chr_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_approval" DROP CONSTRAINT "tbl_approval_fk_chr_approval_level_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_approval" DROP CONSTRAINT "tbl_approval_fk_chr_approver_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_approval" DROP CONSTRAINT "tbl_approval_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_approval" DROP CONSTRAINT "tbl_approval_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_approval" DROP CONSTRAINT "tbl_approval_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_approval_level" DROP CONSTRAINT "tbl_approval_level_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_approval_level" DROP CONSTRAINT "tbl_approval_level_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_category" DROP CONSTRAINT "tbl_category_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_category" DROP CONSTRAINT "tbl_category_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_message" DROP CONSTRAINT "tbl_chat_message_fk_chr_chat_room_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_message" DROP CONSTRAINT "tbl_chat_message_fk_chr_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_room" DROP CONSTRAINT "tbl_chat_room_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_room" DROP CONSTRAINT "tbl_chat_room_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_room" DROP CONSTRAINT "tbl_chat_room_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_room_member" DROP CONSTRAINT "tbl_chat_room_member_fk_chr_chat_room_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_room_member" DROP CONSTRAINT "tbl_chat_room_member_fk_chr_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_chat_room_member" DROP CONSTRAINT "tbl_chat_room_member_fk_chr_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_city" DROP CONSTRAINT "tbl_city_fk_chr_country_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_city" DROP CONSTRAINT "tbl_city_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_city" DROP CONSTRAINT "tbl_city_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_contract" DROP CONSTRAINT "tbl_contract_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_contract" DROP CONSTRAINT "tbl_contract_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_contract" DROP CONSTRAINT "tbl_contract_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_contract" DROP CONSTRAINT "tbl_contract_fk_chr_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_country" DROP CONSTRAINT "tbl_country_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_country" DROP CONSTRAINT "tbl_country_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_department" DROP CONSTRAINT "tbl_department_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_department" DROP CONSTRAINT "tbl_department_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_expression_of_interest" DROP CONSTRAINT "tbl_expression_of_interest_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_expression_of_interest" DROP CONSTRAINT "tbl_expression_of_interest_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_expression_of_interest" DROP CONSTRAINT "tbl_expression_of_interest_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_expression_of_interest" DROP CONSTRAINT "tbl_expression_of_interest_fk_chr_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt" DROP CONSTRAINT "tbl_goods_receipt_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt" DROP CONSTRAINT "tbl_goods_receipt_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt" DROP CONSTRAINT "tbl_goods_receipt_fk_chr_purchase_order_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt_item" DROP CONSTRAINT "tbl_goods_receipt_item_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt_item" DROP CONSTRAINT "tbl_goods_receipt_item_fk_chr_goods_receipt_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt_item" DROP CONSTRAINT "tbl_goods_receipt_item_fk_chr_item_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt_item" DROP CONSTRAINT "tbl_goods_receipt_item_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_invoice" DROP CONSTRAINT "tbl_invoice_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_invoice" DROP CONSTRAINT "tbl_invoice_fk_chr_goods_receipt_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_invoice" DROP CONSTRAINT "tbl_invoice_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_invoice" DROP CONSTRAINT "tbl_invoice_fk_chr_purchase_order_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_invoice" DROP CONSTRAINT "tbl_invoice_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_invoice" DROP CONSTRAINT "tbl_invoice_fk_chr_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_item" DROP CONSTRAINT "tbl_item_fk_chr_category_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_item" DROP CONSTRAINT "tbl_item_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_item" DROP CONSTRAINT "tbl_item_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_notification" DROP CONSTRAINT "tbl_notification_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_notification" DROP CONSTRAINT "tbl_notification_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_notification" DROP CONSTRAINT "tbl_notification_fk_chr_notification_type_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_notification" DROP CONSTRAINT "tbl_notification_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_notification" DROP CONSTRAINT "tbl_notification_fk_chr_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_notification_type" DROP CONSTRAINT "tbl_notification_type_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_notification_type" DROP CONSTRAINT "tbl_notification_type_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_priority" DROP CONSTRAINT "tbl_priority_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_priority" DROP CONSTRAINT "tbl_priority_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_order" DROP CONSTRAINT "tbl_purchase_order_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_order" DROP CONSTRAINT "tbl_purchase_order_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_order" DROP CONSTRAINT "tbl_purchase_order_fk_chr_quotation_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_order" DROP CONSTRAINT "tbl_purchase_order_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_order" DROP CONSTRAINT "tbl_purchase_order_fk_chr_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_fk_chr_category_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_fk_chr_current_status_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_fk_chr_department_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_fk_chr_priority_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_fk_chr_requested_by_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" DROP CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" DROP CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_item_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" DROP CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_purchase_request_item_mapping" DROP CONSTRAINT "tbl_purchase_request_item_mapping_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation" DROP CONSTRAINT "tbl_quotation_fk_chr_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation" DROP CONSTRAINT "tbl_quotation_fk_chr_category_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation" DROP CONSTRAINT "tbl_quotation_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation" DROP CONSTRAINT "tbl_quotation_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation" DROP CONSTRAINT "tbl_quotation_fk_chr_rfq_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation" DROP CONSTRAINT "tbl_quotation_fk_chr_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation_item" DROP CONSTRAINT "tbl_quotation_item_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation_item" DROP CONSTRAINT "tbl_quotation_item_fk_chr_item_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation_item" DROP CONSTRAINT "tbl_quotation_item_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_quotation_item" DROP CONSTRAINT "tbl_quotation_item_fk_chr_quotation_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachment_master" DROP CONSTRAINT "tbl_request_attachment_master_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachment_master" DROP CONSTRAINT "tbl_request_attachment_master_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachment_master" DROP CONSTRAINT "tbl_request_attachment_master_fk_chr_phase_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachment_master" DROP CONSTRAINT "tbl_request_attachment_master_fk_chr_uploaded_by_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachments" DROP CONSTRAINT "tbl_request_attachments_fk_chr_attchment_master_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachments" DROP CONSTRAINT "tbl_request_attachments_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachments" DROP CONSTRAINT "tbl_request_attachments_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachments" DROP CONSTRAINT "tbl_request_attachments_fk_chr_phase_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachments" DROP CONSTRAINT "tbl_request_attachments_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_attachments" DROP CONSTRAINT "tbl_request_attachments_fk_chr_uploaded_by_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_for_quotation" DROP CONSTRAINT "tbl_request_for_quotation_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_for_quotation" DROP CONSTRAINT "tbl_request_for_quotation_fk_chr_eoi_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_for_quotation" DROP CONSTRAINT "tbl_request_for_quotation_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_for_quotation" DROP CONSTRAINT "tbl_request_for_quotation_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_history" DROP CONSTRAINT "tbl_request_history_fk_chr_changed_by_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_history" DROP CONSTRAINT "tbl_request_history_fk_chr_from_phase_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_history" DROP CONSTRAINT "tbl_request_history_fk_chr_from_status_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_history" DROP CONSTRAINT "tbl_request_history_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_history" DROP CONSTRAINT "tbl_request_history_fk_chr_to_phase_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_history" DROP CONSTRAINT "tbl_request_history_fk_chr_to_status_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_phase" DROP CONSTRAINT "tbl_request_phase_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_phase" DROP CONSTRAINT "tbl_request_phase_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_status" DROP CONSTRAINT "tbl_request_status_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_request_status" DROP CONSTRAINT "tbl_request_status_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_rfq_item_mapping" DROP CONSTRAINT "tbl_rfq_item_mapping_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_rfq_item_mapping" DROP CONSTRAINT "tbl_rfq_item_mapping_fk_chr_item_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_rfq_item_mapping" DROP CONSTRAINT "tbl_rfq_item_mapping_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_rfq_item_mapping" DROP CONSTRAINT "tbl_rfq_item_mapping_fk_chr_rfq_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_shipment" DROP CONSTRAINT "tbl_shipment_fk_chr_tracking_no_fkey";

-- DropForeignKey
ALTER TABLE "tbl_shipment" DROP CONSTRAINT "tbl_shipment_fk_chr_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_sla_policy" DROP CONSTRAINT "tbl_sla_policy_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_sla_policy" DROP CONSTRAINT "tbl_sla_policy_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_sla_policy" DROP CONSTRAINT "tbl_sla_policy_fk_chr_priority_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_fk_chr_company_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_fk_chr_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role" DROP CONSTRAINT "tbl_user_role_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role" DROP CONSTRAINT "tbl_user_role_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_chr_role_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_chr_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_fk_chr_city_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_fk_chr_company_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_fk_chr_country_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor_items" DROP CONSTRAINT "tbl_vendor_items_fk_chr_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor_items" DROP CONSTRAINT "tbl_vendor_items_fk_chr_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor_items" DROP CONSTRAINT "tbl_vendor_items_fk_chr_vendor_id_fkey";

-- DropIndex
DROP INDEX "tbl_activations_bln_is_used_idx";

-- DropIndex
DROP INDEX "tbl_activations_chr_token_hash_key";

-- DropIndex
DROP INDEX "tbl_activations_fk_chr_user_id_idx";

-- DropIndex
DROP INDEX "tbl_activations_tim_expires_at_idx";

-- DropIndex
DROP INDEX "tbl_approval_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_approval_fk_chr_approval_level_id_idx";

-- DropIndex
DROP INDEX "tbl_approval_fk_chr_approver_id_idx";

-- DropIndex
DROP INDEX "tbl_approval_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_approval_level_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_approval_level_chr_approval_level_key";

-- DropIndex
DROP INDEX "tbl_category_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_chat_message_fk_chr_chat_room_id_idx";

-- DropIndex
DROP INDEX "tbl_chat_message_fk_chr_sender_id_idx";

-- DropIndex
DROP INDEX "tbl_chat_message_tim_created_idx";

-- DropIndex
DROP INDEX "tbl_chat_room_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_chat_room_member_fk_chr_chat_room_id_fk_chr_user_id_key";

-- DropIndex
DROP INDEX "tbl_chat_room_member_fk_chr_chat_room_id_idx";

-- DropIndex
DROP INDEX "tbl_city_fk_chr_country_id_idx";

-- DropIndex
DROP INDEX "tbl_company_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_company_chr_company_code_idx";

-- DropIndex
DROP INDEX "tbl_company_chr_company_code_key";

-- DropIndex
DROP INDEX "tbl_company_chr_company_email_key";

-- DropIndex
DROP INDEX "tbl_contract_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_contract_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_contract_fk_chr_vendor_id_idx";

-- DropIndex
DROP INDEX "tbl_country_chr_country_code_key";

-- DropIndex
DROP INDEX "tbl_country_chr_country_name_key";

-- DropIndex
DROP INDEX "tbl_department_chr_department_code_key";

-- DropIndex
DROP INDEX "tbl_department_chr_department_name_key";

-- DropIndex
DROP INDEX "tbl_expression_of_interest_chr_eoi_code_key";

-- DropIndex
DROP INDEX "tbl_expression_of_interest_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_expression_of_interest_dt_submission_deadline_idx";

-- DropIndex
DROP INDEX "tbl_expression_of_interest_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_expression_of_interest_fk_chr_vendor_id_idx";

-- DropIndex
DROP INDEX "tbl_goods_receipt_chr_grn_code_key";

-- DropIndex
DROP INDEX "tbl_goods_receipt_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_goods_receipt_dt_received_at_idx";

-- DropIndex
DROP INDEX "tbl_goods_receipt_fk_chr_purchase_order_id_idx";

-- DropIndex
DROP INDEX "tbl_goods_receipt_item_fk_chr_goods_receipt_id_idx";

-- DropIndex
DROP INDEX "tbl_goods_receipt_item_fk_chr_item_id_idx";

-- DropIndex
DROP INDEX "tbl_invoice_chr_invoice_number_key";

-- DropIndex
DROP INDEX "tbl_invoice_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_invoice_dt_due_date_idx";

-- DropIndex
DROP INDEX "tbl_invoice_dt_paid_at_idx";

-- DropIndex
DROP INDEX "tbl_invoice_fk_chr_goods_receipt_id_idx";

-- DropIndex
DROP INDEX "tbl_invoice_fk_chr_purchase_order_id_idx";

-- DropIndex
DROP INDEX "tbl_invoice_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_invoice_fk_chr_vendor_id_idx";

-- DropIndex
DROP INDEX "tbl_item_chr_item_code_key";

-- DropIndex
DROP INDEX "tbl_item_fk_chr_category_id_idx";

-- DropIndex
DROP INDEX "tbl_notification_bln_is_read_idx";

-- DropIndex
DROP INDEX "tbl_notification_chr_channel_idx";

-- DropIndex
DROP INDEX "tbl_notification_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_notification_fk_chr_notification_type_id_idx";

-- DropIndex
DROP INDEX "tbl_notification_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_notification_fk_chr_user_id_idx";

-- DropIndex
DROP INDEX "tbl_notification_tim_created_idx";

-- DropIndex
DROP INDEX "tbl_notification_tim_sent_at_idx";

-- DropIndex
DROP INDEX "tbl_notification_type_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_notification_type_chr_type_code_key";

-- DropIndex
DROP INDEX "tbl_notification_type_chr_type_name_key";

-- DropIndex
DROP INDEX "tbl_purchase_order_chr_po_number_key";

-- DropIndex
DROP INDEX "tbl_purchase_order_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_purchase_order_fk_chr_vendor_id_idx";

-- DropIndex
DROP INDEX "tbl_purchase_request_chr_request_number_idx";

-- DropIndex
DROP INDEX "tbl_purchase_request_chr_request_number_key";

-- DropIndex
DROP INDEX "tbl_purchase_request_fk_chr_current_status_id_idx";

-- DropIndex
DROP INDEX "tbl_purchase_request_fk_chr_priority_id_idx";

-- DropIndex
DROP INDEX "tbl_purchase_request_fk_chr_requested_by_id_idx";

-- DropIndex
DROP INDEX "tbl_purchase_request_item_mapping_fk_chr_item_id_idx";

-- DropIndex
DROP INDEX "tbl_purchase_request_item_mapping_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_quotation_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_quotation_dt_due_date_idx";

-- DropIndex
DROP INDEX "tbl_quotation_fk_chr_buyer_id_idx";

-- DropIndex
DROP INDEX "tbl_quotation_fk_chr_category_id_idx";

-- DropIndex
DROP INDEX "tbl_quotation_fk_chr_rfq_id_idx";

-- DropIndex
DROP INDEX "tbl_quotation_fk_chr_vendor_id_idx";

-- DropIndex
DROP INDEX "tbl_request_attachment_master_chr_entity_type_idx";

-- DropIndex
DROP INDEX "tbl_request_attachment_master_fk_chr_entity_id_idx";

-- DropIndex
DROP INDEX "tbl_request_attachment_master_fk_chr_phase_id_idx";

-- DropIndex
DROP INDEX "tbl_request_attachment_master_fk_chr_uploaded_by_id_idx";

-- DropIndex
DROP INDEX "tbl_request_attachments_chr_file_type_idx";

-- DropIndex
DROP INDEX "tbl_request_attachments_fk_chr_attchment_master_id_idx";

-- DropIndex
DROP INDEX "tbl_request_attachments_fk_chr_phase_id_idx";

-- DropIndex
DROP INDEX "tbl_request_attachments_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_request_attachments_fk_chr_uploaded_by_id_idx";

-- DropIndex
DROP INDEX "tbl_request_for_quotation_chr_rfq_code_key";

-- DropIndex
DROP INDEX "tbl_request_for_quotation_chr_status_idx";

-- DropIndex
DROP INDEX "tbl_request_for_quotation_dt_due_date_idx";

-- DropIndex
DROP INDEX "tbl_request_for_quotation_dt_submission_deadline_idx";

-- DropIndex
DROP INDEX "tbl_request_for_quotation_fk_chr_eoi_id_idx";

-- DropIndex
DROP INDEX "tbl_request_for_quotation_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_request_history_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX "tbl_request_history_tim_created_idx";

-- DropIndex
DROP INDEX "tbl_request_phase_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_request_phase_chr_phase_code_key";

-- DropIndex
DROP INDEX "tbl_request_phase_chr_phase_name_key";

-- DropIndex
DROP INDEX "tbl_request_phase_int_order_idx";

-- DropIndex
DROP INDEX "tbl_shipment_chr_asn_id_key";

-- DropIndex
DROP INDEX "tbl_sla_policy_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_sla_policy_chr_policy_code_key";

-- DropIndex
DROP INDEX "tbl_sla_policy_chr_policy_name_key";

-- DropIndex
DROP INDEX "tbl_sla_policy_fk_chr_priority_id_idx";

-- DropIndex
DROP INDEX "tbl_templates_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_templates_chr_document_type_idx";

-- DropIndex
DROP INDEX "tbl_templates_chr_template_code_idx";

-- DropIndex
DROP INDEX "tbl_templates_chr_template_code_key";

-- DropIndex
DROP INDEX "tbl_tenant_registry_chr_email_key";

-- DropIndex
DROP INDEX "tbl_tenant_registry_chr_tenant_code_key";

-- DropIndex
DROP INDEX "tbl_tenant_registry_chr_tenant_name_key";

-- DropIndex
DROP INDEX "tbl_user_chr_user_email_key";

-- DropIndex
DROP INDEX "tbl_user_fk_chr_tenant_id_idx";

-- DropIndex
DROP INDEX "tbl_user_role_chr_role_code_key";

-- DropIndex
DROP INDEX "tbl_user_role_chr_role_name_key";

-- DropIndex
DROP INDEX "tbl_user_role_mapping_bln_is_active_idx";

-- DropIndex
DROP INDEX "tbl_user_role_mapping_fk_chr_role_id_idx";

-- DropIndex
DROP INDEX "tbl_user_role_mapping_fk_chr_user_id_fk_chr_role_id_key";

-- DropIndex
DROP INDEX "tbl_user_role_mapping_fk_chr_user_id_idx";

-- DropIndex
DROP INDEX "tbl_vendor_chr_vendor_email_key";

-- AlterTable
ALTER TABLE "tbl_activations" DROP CONSTRAINT "tbl_activations_pkey",
DROP COLUMN "bln_is_used",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_token_hash",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_user_id",
DROP COLUMN "pk_chr_activation_token_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_expires_at",
DROP COLUMN "tim_modified",
DROP COLUMN "tim_used_at",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_user_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_activation_token_id" TEXT NOT NULL,
ADD COLUMN     "token_hash" TEXT NOT NULL,
ADD COLUMN     "used_at" TIMESTAMP(3),
ADD CONSTRAINT "tbl_activations_pkey" PRIMARY KEY ("pk_activation_token_id");

-- AlterTable
ALTER TABLE "tbl_approval" DROP CONSTRAINT "tbl_approval_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_status",
DROP COLUMN "fk_chr_approval_level_id",
DROP COLUMN "fk_chr_approver_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "pk_chr_approval_id",
DROP COLUMN "tim_actioned_at",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_comment",
ADD COLUMN     "actioned_at" TIMESTAMP(3),
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_approval_level_id" TEXT NOT NULL,
ADD COLUMN     "fk_approver_id" TEXT NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_approval_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD CONSTRAINT "tbl_approval_pkey" PRIMARY KEY ("pk_approval_id");

-- AlterTable
ALTER TABLE "tbl_approval_level" DROP CONSTRAINT "tbl_approval_level_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_approval_level",
DROP COLUMN "chr_document_status",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "flt_from_amount",
DROP COLUMN "flt_to_amount",
DROP COLUMN "int_order",
DROP COLUMN "pk_chr_approval_level_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "approval_level" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "from_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "pk_approval_level_id" TEXT NOT NULL,
ADD COLUMN     "to_amount" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "tbl_approval_level_pkey" PRIMARY KEY ("pk_approval_level_id");

-- AlterTable
ALTER TABLE "tbl_category" DROP CONSTRAINT "tbl_category_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_category_name",
DROP COLUMN "chr_document_status",
DROP COLUMN "dt_deleted_at",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_category_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "category_name" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_category_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_category_pkey" PRIMARY KEY ("pk_category_id");

-- AlterTable
ALTER TABLE "tbl_chat_message" DROP CONSTRAINT "tbl_chat_message_pkey",
DROP COLUMN "bln_is_read",
DROP COLUMN "chr_attachment_type",
DROP COLUMN "chr_attachment_url",
DROP COLUMN "chr_sender_type",
DROP COLUMN "fk_chr_chat_room_id",
DROP COLUMN "fk_chr_sender_id",
DROP COLUMN "pk_chr_chat_message_id",
DROP COLUMN "tim_created",
DROP COLUMN "txt_content",
ADD COLUMN     "attachment_type" TEXT,
ADD COLUMN     "attachment_url" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_chat_room_id" TEXT NOT NULL,
ADD COLUMN     "fk_sender_id" TEXT NOT NULL,
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pk_chat_message_id" TEXT NOT NULL,
ADD COLUMN     "sender_type" TEXT NOT NULL,
ADD CONSTRAINT "tbl_chat_message_pkey" PRIMARY KEY ("pk_chat_message_id");

-- AlterTable
ALTER TABLE "tbl_chat_room" DROP CONSTRAINT "tbl_chat_room_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_name",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "pk_chr_chat_room_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pk_chat_room_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_chat_room_pkey" PRIMARY KEY ("pk_chat_room_id");

-- AlterTable
ALTER TABLE "tbl_chat_room_member" DROP CONSTRAINT "tbl_chat_room_member_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_role",
DROP COLUMN "fk_chr_chat_room_id",
DROP COLUMN "fk_chr_user_id",
DROP COLUMN "fk_chr_vendor_id",
DROP COLUMN "pk_chr_chat_room_member_id",
DROP COLUMN "tim_created",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_chat_room_id" TEXT NOT NULL,
ADD COLUMN     "fk_user_id" TEXT,
ADD COLUMN     "fk_vendor_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pk_chat_room_member_id" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'MEMBER',
ADD CONSTRAINT "tbl_chat_room_member_pkey" PRIMARY KEY ("pk_chat_room_member_id");

-- AlterTable
ALTER TABLE "tbl_city" DROP CONSTRAINT "tbl_city_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_city_name",
DROP COLUMN "chr_document_status",
DROP COLUMN "fk_chr_country_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_city_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "city_name" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_country_id" TEXT NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_city_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_city_pkey" PRIMARY KEY ("pk_city_id");

-- AlterTable
ALTER TABLE "tbl_company" DROP CONSTRAINT "tbl_company_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_city",
DROP COLUMN "chr_company_address",
DROP COLUMN "chr_company_code",
DROP COLUMN "chr_company_email",
DROP COLUMN "chr_company_name",
DROP COLUMN "chr_company_phone",
DROP COLUMN "chr_country",
DROP COLUMN "chr_currency",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_logo_url",
DROP COLUMN "chr_postal_code",
DROP COLUMN "chr_state",
DROP COLUMN "chr_tax_number",
DROP COLUMN "chr_website",
DROP COLUMN "pk_chr_company_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "company_address" TEXT,
ADD COLUMN     "company_code" TEXT NOT NULL,
ADD COLUMN     "company_email" TEXT NOT NULL,
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "company_phone" TEXT NOT NULL,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_company_id" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "tax_number" TEXT,
ADD COLUMN     "website" TEXT,
ADD CONSTRAINT "tbl_company_pkey" PRIMARY KEY ("pk_company_id");

-- AlterTable
ALTER TABLE "tbl_contract" DROP CONSTRAINT "tbl_contract_pkey",
DROP COLUMN "chr_contract_code",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_status",
DROP COLUMN "chr_title",
DROP COLUMN "dt_end_date",
DROP COLUMN "dt_start_date",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "fk_chr_vendor_id",
DROP COLUMN "flt_value",
DROP COLUMN "pk_chr_contract_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
DROP COLUMN "txt_rendered_html",
ADD COLUMN     "contract_code" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT,
ADD COLUMN     "fk_vendor_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_contract_id" TEXT NOT NULL,
ADD COLUMN     "rendered_html" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "tbl_contract_pkey" PRIMARY KEY ("pk_contract_id");

-- AlterTable
ALTER TABLE "tbl_country" DROP CONSTRAINT "tbl_country_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_country_code",
DROP COLUMN "chr_country_name",
DROP COLUMN "chr_document_status",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_country_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "country_code" TEXT NOT NULL,
ADD COLUMN     "country_name" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_country_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_country_pkey" PRIMARY KEY ("pk_country_id");

-- AlterTable
ALTER TABLE "tbl_department" DROP CONSTRAINT "tbl_department_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_department_code",
DROP COLUMN "chr_department_name",
DROP COLUMN "chr_document_status",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_department_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department_code" TEXT NOT NULL,
ADD COLUMN     "department_name" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_department_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_department_pkey" PRIMARY KEY ("pk_department_id");

-- AlterTable
ALTER TABLE "tbl_expression_of_interest" DROP CONSTRAINT "tbl_expression_of_interest_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_eoi_code",
DROP COLUMN "chr_eoi_title",
DROP COLUMN "chr_status",
DROP COLUMN "dt_submission_deadline",
DROP COLUMN "dt_submitted_at",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "fk_chr_vendor_id",
DROP COLUMN "pk_chr_eoi_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_notes",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eoi_code" TEXT NOT NULL,
ADD COLUMN     "eoi_title" TEXT NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "fk_vendor_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pk_eoi_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "submission_deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "submitted_at" TIMESTAMP(3),
ADD CONSTRAINT "tbl_expression_of_interest_pkey" PRIMARY KEY ("pk_eoi_id");

-- AlterTable
ALTER TABLE "tbl_goods_receipt" DROP CONSTRAINT "tbl_goods_receipt_pkey",
DROP COLUMN "chr_delivery_note_no",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_grn_code",
DROP COLUMN "chr_status",
DROP COLUMN "dt_received_at",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_purchase_order_id",
DROP COLUMN "pk_chr_goods_receipt_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_notes",
DROP COLUMN "txt_rendered_html",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delivery_note_no" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_purchase_order_id" TEXT NOT NULL,
ADD COLUMN     "grn_code" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pk_goods_receipt_id" TEXT NOT NULL,
ADD COLUMN     "received_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rendered_html" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD CONSTRAINT "tbl_goods_receipt_pkey" PRIMARY KEY ("pk_goods_receipt_id");

-- AlterTable
ALTER TABLE "tbl_goods_receipt_item" DROP CONSTRAINT "tbl_goods_receipt_item_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_unit_of_measure",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_goods_receipt_id",
DROP COLUMN "fk_chr_item_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "int_quantity_ordered",
DROP COLUMN "int_quantity_received",
DROP COLUMN "int_quantity_rejected",
DROP COLUMN "pk_chr_gri_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_rejection_reason",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_goods_receipt_id" TEXT NOT NULL,
ADD COLUMN     "fk_item_id" TEXT NOT NULL,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_gri_id" TEXT NOT NULL,
ADD COLUMN     "quantity_ordered" INTEGER NOT NULL,
ADD COLUMN     "quantity_received" INTEGER NOT NULL,
ADD COLUMN     "quantity_rejected" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rejection_reason" TEXT,
ADD COLUMN     "unit_of_measure" TEXT,
ADD CONSTRAINT "tbl_goods_receipt_item_pkey" PRIMARY KEY ("pk_gri_id");

-- AlterTable
ALTER TABLE "tbl_invoice" DROP CONSTRAINT "tbl_invoice_pkey",
DROP COLUMN "chr_currency",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_invoice_number",
DROP COLUMN "chr_status",
DROP COLUMN "dt_due_date",
DROP COLUMN "dt_invoice_date",
DROP COLUMN "dt_paid_at",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_goods_receipt_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_purchase_order_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "fk_chr_vendor_id",
DROP COLUMN "flt_subtotal",
DROP COLUMN "flt_tax_amount",
DROP COLUMN "flt_total_amount",
DROP COLUMN "pk_chr_invoice_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_notes",
DROP COLUMN "txt_rendered_html",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_goods_receipt_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_purchase_order_id" TEXT NOT NULL,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "fk_vendor_id" TEXT NOT NULL,
ADD COLUMN     "invoice_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "invoice_number" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "pk_invoice_id" TEXT NOT NULL,
ADD COLUMN     "rendered_html" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "total_amount" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "tbl_invoice_pkey" PRIMARY KEY ("pk_invoice_id");

-- AlterTable
ALTER TABLE "tbl_item" DROP CONSTRAINT "tbl_item_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_documents",
DROP COLUMN "chr_item_code",
DROP COLUMN "chr_item_name",
DROP COLUMN "chr_unit",
DROP COLUMN "fk_chr_category_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_item_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "documents" TEXT,
ADD COLUMN     "fk_category_id" TEXT NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "item_code" TEXT NOT NULL,
ADD COLUMN     "item_name" TEXT NOT NULL,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_item_id" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT,
ADD CONSTRAINT "tbl_item_pkey" PRIMARY KEY ("pk_item_id");

-- AlterTable
ALTER TABLE "tbl_notification" DROP CONSTRAINT "tbl_notification_pkey",
DROP COLUMN "bln_is_read",
DROP COLUMN "chr_channel",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_status",
DROP COLUMN "chr_title",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_notification_type_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "fk_chr_user_id",
DROP COLUMN "json_metadata",
DROP COLUMN "pk_chr_notification_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "tim_read_at",
DROP COLUMN "tim_sent_at",
DROP COLUMN "txt_message",
ADD COLUMN     "channel" TEXT NOT NULL DEFAULT 'IN_APP',
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_notification_type_id" TEXT NOT NULL,
ADD COLUMN     "fk_request_id" TEXT,
ADD COLUMN     "fk_user_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_notification_id" TEXT NOT NULL,
ADD COLUMN     "read_at" TIMESTAMP(3),
ADD COLUMN     "sent_at" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "tbl_notification_pkey" PRIMARY KEY ("pk_notification_id");

-- AlterTable
ALTER TABLE "tbl_notification_type" DROP CONSTRAINT "tbl_notification_type_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_type_code",
DROP COLUMN "chr_type_name",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_notification_type_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_notification_type_id" TEXT NOT NULL,
ADD COLUMN     "type_code" TEXT NOT NULL,
ADD COLUMN     "type_name" TEXT NOT NULL,
ADD CONSTRAINT "tbl_notification_type_pkey" PRIMARY KEY ("pk_notification_type_id");

-- AlterTable
ALTER TABLE "tbl_purchase_order" DROP CONSTRAINT "tbl_purchase_order_pkey",
DROP COLUMN "chr_currency",
DROP COLUMN "chr_delivery_address",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_po_number",
DROP COLUMN "dt_expected_delivery",
DROP COLUMN "dt_issued_at",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_quotation_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "fk_chr_vendor_id",
DROP COLUMN "flt_total_value",
DROP COLUMN "pk_chr_purchase_order_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_rendered_html",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "delivery_address" TEXT,
ADD COLUMN     "expected_delivery" TIMESTAMP(3),
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_quotation_id" TEXT NOT NULL,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "fk_vendor_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "issued_at" TIMESTAMP(3),
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_purchase_order_id" TEXT NOT NULL,
ADD COLUMN     "po_number" TEXT NOT NULL,
ADD COLUMN     "po_title" TEXT NOT NULL,
ADD COLUMN     "rendered_html" TEXT,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "total_value" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "tbl_purchase_order_pkey" PRIMARY KEY ("pk_purchase_order_id");

-- AlterTable
ALTER TABLE "tbl_purchase_request" DROP CONSTRAINT "tbl_purchase_request_pkey",
DROP COLUMN "chr_currency",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_request_number",
DROP COLUMN "chr_title",
DROP COLUMN "fk_chr_category_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_current_status_id",
DROP COLUMN "fk_chr_department_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_priority_id",
DROP COLUMN "fk_chr_requested_by_id",
DROP COLUMN "flt_estimated_value",
DROP COLUMN "pk_chr_request_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "estimated_value" DOUBLE PRECISION,
ADD COLUMN     "fk_category_id" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_department_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_requested_by_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_request_id" TEXT NOT NULL,
ADD COLUMN     "request_number" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "tbl_purchase_request_pkey" PRIMARY KEY ("pk_request_id");

-- AlterTable
ALTER TABLE "tbl_purchase_request_item_mapping" DROP CONSTRAINT "tbl_purchase_request_item_mapping_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_item_description",
DROP COLUMN "chr_unit_of_measure",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_item_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "flt_estimated_unit_price",
DROP COLUMN "flt_total_price",
DROP COLUMN "int_quantity",
DROP COLUMN "pk_chr_pr_item_mapping_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "estimated_unit_price" DOUBLE PRECISION,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_item_id" TEXT NOT NULL,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "item_description" TEXT NOT NULL,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_pr_item_mapping_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION,
ADD COLUMN     "unit_of_measure" TEXT,
ADD CONSTRAINT "tbl_purchase_request_item_mapping_pkey" PRIMARY KEY ("pk_pr_item_mapping_id");

-- AlterTable
ALTER TABLE "tbl_quotation" DROP CONSTRAINT "tbl_quotation_pkey",
DROP COLUMN "chr_buyer_details",
DROP COLUMN "chr_currency",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_seller_details",
DROP COLUMN "chr_status",
DROP COLUMN "dt_due_date",
DROP COLUMN "dt_issue_date",
DROP COLUMN "fk_chr_buyer_id",
DROP COLUMN "fk_chr_category_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_rfq_id",
DROP COLUMN "fk_chr_vendor_id",
DROP COLUMN "flt_total_amount",
DROP COLUMN "pk_chr_quotation_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_notes",
DROP COLUMN "txt_rendered_html",
ADD COLUMN     "buyer_details" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT DEFAULT 'USD',
ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "fk_buyer_id" TEXT,
ADD COLUMN     "fk_category_id" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT,
ADD COLUMN     "fk_rfq_id" TEXT,
ADD COLUMN     "fk_vendor_id" TEXT,
ADD COLUMN     "is_delete" BOOLEAN DEFAULT false,
ADD COLUMN     "issue_date" TIMESTAMP(3),
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pk_quotation_id" TEXT NOT NULL,
ADD COLUMN     "rendered_html" TEXT,
ADD COLUMN     "seller_details" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'PENDING',
ADD COLUMN     "title" TEXT,
ADD COLUMN     "total_amount" DOUBLE PRECISION,
ADD CONSTRAINT "tbl_quotation_pkey" PRIMARY KEY ("pk_quotation_id");

-- AlterTable
ALTER TABLE "tbl_request_attachment_master" DROP CONSTRAINT "tbl_request_attachment_master_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_entity_type",
DROP COLUMN "chr_folder_path",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_entity_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_phase_id",
DROP COLUMN "fk_chr_uploaded_by_id",
DROP COLUMN "pk_chr_attchment_master_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "entity_type" TEXT NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_entity_id" TEXT NOT NULL,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_phase_id" TEXT,
ADD COLUMN     "fk_uploaded_by_id" TEXT NOT NULL,
ADD COLUMN     "folder_path" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_attchment_master_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_request_attachment_master_pkey" PRIMARY KEY ("pk_attchment_master_id");

-- AlterTable
ALTER TABLE "tbl_request_attachments" DROP CONSTRAINT "tbl_request_attachments_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_file_name",
DROP COLUMN "chr_file_type",
DROP COLUMN "chr_file_url",
DROP COLUMN "fk_chr_attchment_master_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_phase_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "fk_chr_uploaded_by_id",
DROP COLUMN "int_file_size",
DROP COLUMN "pk_chr_request_attchment_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "file_name" TEXT NOT NULL,
ADD COLUMN     "file_size" INTEGER,
ADD COLUMN     "file_type" TEXT NOT NULL,
ADD COLUMN     "file_url" TEXT NOT NULL,
ADD COLUMN     "fk_attchment_master_id" TEXT NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_phase_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "fk_uploaded_by_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_request_attchment_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_request_attachments_pkey" PRIMARY KEY ("pk_request_attchment_id");

-- AlterTable
ALTER TABLE "tbl_request_for_quotation" DROP CONSTRAINT "tbl_request_for_quotation_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_rfq_code",
DROP COLUMN "chr_rfq_title",
DROP COLUMN "chr_status",
DROP COLUMN "dt_due_date",
DROP COLUMN "dt_issue_date",
DROP COLUMN "dt_submission_deadline",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_eoi_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "pk_chr_rfq_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_notes",
DROP COLUMN "txt_rendered_html",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_eoi_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "issue_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pk_rfq_id" TEXT NOT NULL,
ADD COLUMN     "rendered_html" TEXT,
ADD COLUMN     "rfq_code" TEXT NOT NULL,
ADD COLUMN     "rfq_title" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "submission_deadline" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "tbl_request_for_quotation_pkey" PRIMARY KEY ("pk_rfq_id");

-- AlterTable
ALTER TABLE "tbl_request_history" DROP CONSTRAINT "tbl_request_history_pkey",
DROP COLUMN "fk_chr_changed_by_id",
DROP COLUMN "fk_chr_from_phase_id",
DROP COLUMN "fk_chr_from_status_id",
DROP COLUMN "fk_chr_request_id",
DROP COLUMN "fk_chr_to_phase_id",
DROP COLUMN "fk_chr_to_status_id",
DROP COLUMN "json_metadata",
DROP COLUMN "pk_chr_status_history_id",
DROP COLUMN "tim_created",
DROP COLUMN "txt_comment",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_changed_by_id" TEXT NOT NULL,
ADD COLUMN     "fk_from_phase_id" TEXT,
ADD COLUMN     "fk_from_status" TEXT,
ADD COLUMN     "fk_request_id" TEXT NOT NULL,
ADD COLUMN     "fk_to_phase_id" TEXT NOT NULL,
ADD COLUMN     "fk_to_status" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "pk_status_history_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_request_history_pkey" PRIMARY KEY ("pk_status_history_id");

-- AlterTable
ALTER TABLE "tbl_request_phase" DROP CONSTRAINT "tbl_request_phase_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_phase_code",
DROP COLUMN "chr_phase_name",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "int_order",
DROP COLUMN "pk_chr_request_phase_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "phase_code" TEXT NOT NULL,
ADD COLUMN     "phase_name" TEXT NOT NULL,
ADD COLUMN     "pk_request_phase_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_request_phase_pkey" PRIMARY KEY ("pk_request_phase_id");

-- AlterTable
ALTER TABLE "tbl_shipment" DROP CONSTRAINT "tbl_shipment_pkey",
DROP COLUMN "chr_asn_id",
DROP COLUMN "chr_documents",
DROP COLUMN "chr_logistics_provider",
DROP COLUMN "chr_notes",
DROP COLUMN "dt_delivery_date",
DROP COLUMN "dt_dispatch_date",
DROP COLUMN "fk_chr_tracking_no",
DROP COLUMN "fk_chr_vendor_id",
DROP COLUMN "int_quantity",
DROP COLUMN "int_status",
DROP COLUMN "pk_chr_shipment_id",
ADD COLUMN     "asn_id" TEXT NOT NULL,
ADD COLUMN     "delivery_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dispatch_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "documents" TEXT,
ADD COLUMN     "fk_tracking_no" TEXT NOT NULL,
ADD COLUMN     "fk_vendor_id" TEXT NOT NULL,
ADD COLUMN     "logistics_provider" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pk_shipment_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL,
ADD CONSTRAINT "tbl_shipment_pkey" PRIMARY KEY ("pk_shipment_id");

-- AlterTable
ALTER TABLE "tbl_shipment_tracking" DROP CONSTRAINT "tbl_shipment_tracking_pkey",
DROP COLUMN "chr_courier_person_name",
DROP COLUMN "chr_courier_person_phone",
DROP COLUMN "chr_order_id",
DROP COLUMN "pk_chr_shipment_tracking_id",
ADD COLUMN     "courier_person_name" TEXT NOT NULL,
ADD COLUMN     "courier_person_phone" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "pk_shipment_tracking_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_shipment_tracking_pkey" PRIMARY KEY ("pk_shipment_tracking_id");

-- AlterTable
ALTER TABLE "tbl_sla_policy" DROP CONSTRAINT "tbl_sla_policy_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_policy_code",
DROP COLUMN "chr_policy_name",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_priority_id",
DROP COLUMN "int_escalation_time_mins",
DROP COLUMN "int_resolution_time_mins",
DROP COLUMN "int_response_time_mins",
DROP COLUMN "pk_chr_sla_policy_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "escalation_time_mins" INTEGER NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_sla_policy_id" TEXT NOT NULL,
ADD COLUMN     "policy_code" TEXT NOT NULL,
ADD COLUMN     "policy_name" TEXT NOT NULL,
ADD COLUMN     "resolution_time_mins" INTEGER NOT NULL,
ADD COLUMN     "response_time_mins" INTEGER NOT NULL,
ADD CONSTRAINT "tbl_sla_policy_pkey" PRIMARY KEY ("pk_sla_policy_id");

-- AlterTable
ALTER TABLE "tbl_templates" DROP CONSTRAINT "tbl_templates_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_document_type",
DROP COLUMN "chr_template_code",
DROP COLUMN "chr_template_name",
DROP COLUMN "pk_chr_template_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_html_content",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "document_type" TEXT NOT NULL,
ADD COLUMN     "html_content" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_template_id" TEXT NOT NULL,
ADD COLUMN     "template_code" TEXT NOT NULL,
ADD COLUMN     "template_name" TEXT NOT NULL,
ADD CONSTRAINT "tbl_templates_pkey" PRIMARY KEY ("pk_template_id");

-- AlterTable
ALTER TABLE "tbl_tenant_registry" DROP CONSTRAINT "tbl_tenant_registry_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_email",
DROP COLUMN "chr_phone",
DROP COLUMN "chr_status",
DROP COLUMN "chr_tenant_code",
DROP COLUMN "chr_tenant_name",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_tenant_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pk_tenant_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "tenant_code" TEXT NOT NULL,
ADD COLUMN     "tenant_name" TEXT NOT NULL,
ADD CONSTRAINT "tbl_tenant_registry_pkey" PRIMARY KEY ("pk_tenant_id");

-- AlterTable
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_user_email",
DROP COLUMN "chr_user_name",
DROP COLUMN "chr_user_phone",
DROP COLUMN "fk_chr_company_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_tenant_id",
DROP COLUMN "pk_chr_user_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_company_id" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_tenant_id" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_user_id" TEXT NOT NULL,
ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_phone" TEXT NOT NULL,
ADD CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("pk_user_id");

-- AlterTable
ALTER TABLE "tbl_user_role" DROP CONSTRAINT "tbl_user_role_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_role_code",
DROP COLUMN "chr_role_name",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_role_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
DROP COLUMN "txt_description",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_role_id" TEXT NOT NULL,
ADD COLUMN     "role_code" TEXT NOT NULL,
ADD COLUMN     "role_name" TEXT NOT NULL,
ADD CONSTRAINT "tbl_user_role_pkey" PRIMARY KEY ("pk_role_id");

-- AlterTable
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_pkey",
DROP COLUMN "bln_is_active",
DROP COLUMN "chr_document_status",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "fk_chr_role_id",
DROP COLUMN "fk_chr_user_id",
DROP COLUMN "pk_chr_user_role_mapping_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "fk_role_id" TEXT NOT NULL,
ADD COLUMN     "fk_user_id" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "pk_user_role_mapping_id" TEXT NOT NULL,
ADD CONSTRAINT "tbl_user_role_mapping_pkey" PRIMARY KEY ("pk_user_role_mapping_id");

-- AlterTable
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_pkey",
DROP COLUMN "chr_document_status",
DROP COLUMN "chr_vendor_email",
DROP COLUMN "chr_vendor_name",
DROP COLUMN "chr_vendor_phone",
DROP COLUMN "fk_chr_city_id",
DROP COLUMN "fk_chr_company_id",
DROP COLUMN "fk_chr_country_id",
DROP COLUMN "fk_chr_created_id",
DROP COLUMN "fk_chr_modified_id",
DROP COLUMN "pk_chr_vendor_id",
DROP COLUMN "tim_created",
DROP COLUMN "tim_modified",
ADD COLUMN     "GST_number" TEXT,
ADD COLUMN     "MSME_status" TEXT,
ADD COLUMN     "PAN_number" TEXT,
ADD COLUMN     "categories_of_supply" TEXT,
ADD COLUMN     "company_legal_name" TEXT,
ADD COLUMN     "company_type" TEXT,
ADD COLUMN     "contact_person" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fk_city_id" TEXT,
ADD COLUMN     "fk_company_id" TEXT,
ADD COLUMN     "fk_country_id" TEXT,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN,
ADD COLUMN     "is_delete" BOOLEAN DEFAULT false,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "nature_of_business" TEXT,
ADD COLUMN     "office_address" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "pk_vendor_id" TEXT NOT NULL,
ADD COLUMN     "trading_name" TEXT,
ADD COLUMN     "year_of_establishment" TIMESTAMP(3),
ADD CONSTRAINT "tbl_vendor_pkey" PRIMARY KEY ("pk_vendor_id");

-- DropTable
DROP TABLE "tbl_priority";

-- DropTable
DROP TABLE "tbl_quotation_item";

-- DropTable
DROP TABLE "tbl_request_status";

-- DropTable
DROP TABLE "tbl_rfq_item_mapping";

-- DropTable
DROP TABLE "tbl_vendor_items";

-- CreateIndex
CREATE UNIQUE INDEX "tbl_activations_token_hash_key" ON "tbl_activations"("token_hash");

-- CreateIndex
CREATE INDEX "tbl_activations_fk_user_id_idx" ON "tbl_activations"("fk_user_id");

-- CreateIndex
CREATE INDEX "tbl_activations_expires_at_idx" ON "tbl_activations"("expires_at");

-- CreateIndex
CREATE INDEX "tbl_activations_is_used_idx" ON "tbl_activations"("is_used");

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
CREATE INDEX "tbl_category_is_active_idx" ON "tbl_category"("is_active");

-- CreateIndex
CREATE INDEX "tbl_chat_message_fk_chat_room_id_idx" ON "tbl_chat_message"("fk_chat_room_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_fk_sender_id_idx" ON "tbl_chat_message"("fk_sender_id");

-- CreateIndex
CREATE INDEX "tbl_chat_message_created_idx" ON "tbl_chat_message"("created");

-- CreateIndex
CREATE INDEX "tbl_chat_room_fk_request_id_idx" ON "tbl_chat_room"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_chat_room_member_fk_chat_room_id_idx" ON "tbl_chat_room_member"("fk_chat_room_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_chat_room_member_fk_chat_room_id_fk_user_id_key" ON "tbl_chat_room_member"("fk_chat_room_id", "fk_user_id");

-- CreateIndex
CREATE INDEX "tbl_city_fk_country_id_idx" ON "tbl_city"("fk_country_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_company_company_code_key" ON "tbl_company"("company_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_company_company_email_key" ON "tbl_company"("company_email");

-- CreateIndex
CREATE INDEX "tbl_company_company_code_idx" ON "tbl_company"("company_code");

-- CreateIndex
CREATE INDEX "tbl_company_is_active_idx" ON "tbl_company"("is_active");

-- CreateIndex
CREATE INDEX "tbl_contract_fk_vendor_id_idx" ON "tbl_contract"("fk_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_contract_fk_request_id_idx" ON "tbl_contract"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_contract_status_idx" ON "tbl_contract"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_country_country_name_key" ON "tbl_country"("country_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_country_country_code_key" ON "tbl_country"("country_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_department_department_name_key" ON "tbl_department"("department_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_department_department_code_key" ON "tbl_department"("department_code");

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
CREATE UNIQUE INDEX "tbl_item_item_code_key" ON "tbl_item"("item_code");

-- CreateIndex
CREATE INDEX "tbl_item_fk_category_id_idx" ON "tbl_item"("fk_category_id");

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
CREATE UNIQUE INDEX "tbl_notification_type_type_name_key" ON "tbl_notification_type"("type_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_notification_type_type_code_key" ON "tbl_notification_type"("type_code");

-- CreateIndex
CREATE INDEX "tbl_notification_type_is_active_idx" ON "tbl_notification_type"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_purchase_order_po_number_key" ON "tbl_purchase_order"("po_number");

-- CreateIndex
CREATE INDEX "tbl_purchase_order_fk_request_id_idx" ON "tbl_purchase_order"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_purchase_order_fk_vendor_id_idx" ON "tbl_purchase_order"("fk_vendor_id");

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
CREATE INDEX "tbl_request_history_fk_request_id_idx" ON "tbl_request_history"("fk_request_id");

-- CreateIndex
CREATE INDEX "tbl_request_history_created_idx" ON "tbl_request_history"("created");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_phase_phase_name_key" ON "tbl_request_phase"("phase_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_request_phase_phase_code_key" ON "tbl_request_phase"("phase_code");

-- CreateIndex
CREATE INDEX "tbl_request_phase_order_idx" ON "tbl_request_phase"("order");

-- CreateIndex
CREATE INDEX "tbl_request_phase_is_active_idx" ON "tbl_request_phase"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_shipment_asn_id_key" ON "tbl_shipment"("asn_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_sla_policy_policy_name_key" ON "tbl_sla_policy"("policy_name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_sla_policy_policy_code_key" ON "tbl_sla_policy"("policy_code");

-- CreateIndex
CREATE INDEX "tbl_sla_policy_is_active_idx" ON "tbl_sla_policy"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_templates_template_code_key" ON "tbl_templates"("template_code");

-- CreateIndex
CREATE INDEX "tbl_templates_template_code_idx" ON "tbl_templates"("template_code");

-- CreateIndex
CREATE INDEX "tbl_templates_document_type_idx" ON "tbl_templates"("document_type");

-- CreateIndex
CREATE INDEX "tbl_templates_is_active_idx" ON "tbl_templates"("is_active");

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
CREATE UNIQUE INDEX "tbl_vendor_email_key" ON "tbl_vendor"("email");

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
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_city_id_fkey" FOREIGN KEY ("fk_city_id") REFERENCES "tbl_city"("pk_city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_country_id_fkey" FOREIGN KEY ("fk_country_id") REFERENCES "tbl_country"("pk_country_id") ON DELETE SET NULL ON UPDATE CASCADE;

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

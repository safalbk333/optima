export enum RequestType {
  JD_APPROVAL = 'jd_approval',
  BUDGET_APPROVAL = 'budget_approval',
  VACANCY_APPROVAL = 'vacancy_approval',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum VacancyRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  AUTO_APPROVED = 'AUTO APPROVED',
  AUTO_REJECTED = 'AUTO REJECTED',
  FREEZED = 'FREEZED',
  UNFREEZED = 'UNFREEZED',
  TRANSFER = 'TRANSFER',
}

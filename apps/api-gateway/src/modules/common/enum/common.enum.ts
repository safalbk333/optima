export enum ProcessMode {
  MANUAL = 'Manual',
  AUTO = 'Auto',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  DECLINE_TO_DECLARE = 'Decline to declare',
}

export enum DocumentEvaluationState {
  PENDING = 'PENDING',
  EVALUATED = 'EVALUATED',
}

export const FILE_LIMITS = {
  MAX_BGV_REPORT_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_PROFILE_PICTURE_SIZE: 2 * 1024 * 1024, // 2MB
  MAX_CAMPUS_UPLOAD_SIZE: 100 * 1024 * 1024, // 100MB
};

export enum YesNo {
  YES = 'Yes',
  NO = 'No',
}

export enum YN {
  Y = 'Y',
  N = 'N',
}

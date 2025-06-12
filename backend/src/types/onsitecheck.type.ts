export interface OnSiteCheckQuery {
  participationId?: string;
  canDonate?: boolean;
}

export interface CreateOnSiteCheckDto {
  participationId: string;
  pulseRate?: number;
  bloodPressure?: string;
  hemoglobinLevel?: number;
  bodyTemperature?: number;
  weight?: number;
  canDonate?: boolean;
  checkedAt?: Date;
}

export interface UpdateOnSiteCheckDto {
  pulseRate?: number;
  bloodPressure?: string;
  hemoglobinLevel?: number;
  bodyTemperature?: number;
  weight?: number;
  canDonate?: boolean;
  checkedAt?: Date;
} 
export interface QueryI<TConditions = unknown> {
  page?: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  conditions?: TConditions;
}

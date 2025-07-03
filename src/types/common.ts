export interface PaginatedReq {
  pageNo: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  pageNo: number;
  pageSize: number;
}
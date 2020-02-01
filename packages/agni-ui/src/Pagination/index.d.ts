export type PaginationProps = {
  totalData?: number;
  page?: number;
  defaultPage?: number;
  perPage?: number;
  defaultPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onPerPageChange?: (newPerPage: number) => void;
  isShowStat?: boolean;
  isShowGoTo?: boolean;
  isShowButton?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xs';
};

export const Pagination: React.ForwardRefExoticComponent<PaginationProps>;

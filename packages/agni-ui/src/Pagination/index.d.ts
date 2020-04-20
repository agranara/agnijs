type PaginationChangeProp = {
  page: number;
  perPage: number;
}

export type PaginationProps = {
  /**
   * Total data used to generate page buttons and stat display
   */
  totalData?: number;
  /**
   * Current page
   */
  page?: number;
  /**
   * Uncontrolled default page
   */
  defaultPage?: number;
  /**
   * Maximum item shown
   */
  perPage?: number;
  /**
   * Uncontrolled maximum item shown
   */
  defaultPerPage?: number;
  /**
   * On page change handler
   * Triggered when pressing page button, arrow, or input number page
   */
  onPageChange?: (newPage: number) => void;
  /**
   * On maximum item shown change handler
   */
  onPerPageChange?: (newPerPage: number) => void;
  /**
   * On pagination change.
   * listen to change both page and maximum item shown change
   */
  onPaginationChange?: (prop: PaginationChangeProp) => void;
  /**
   * Is stat shown? Default: true
   */
  isShowStat?: boolean;
  /**
   * Is input numeric page shown? Default: true
   */
  isShowGoTo?: boolean;
  /**
   * Is pagination button shown? Default: true
   */
  isShowButton?: boolean;
  /**
   * Is maximum item changer shown? Default: true
   */
  isShowPerPage?: boolean;
  /**
   * Variant size of pagination
   */
  size?: 'lg' | 'md' | 'sm' | 'xs';
  /**
   * Maximum item options to supplied through select options
   */
  perPageOptions?: []
  /**
   * Maximum item option label key
   */
  perPageOptionLabel?: string;
  /**
   * Maximum item option value key
   */
  perPageOptionValue?: string;
};

export const Pagination: React.ForwardRefExoticComponent<PaginationProps>;

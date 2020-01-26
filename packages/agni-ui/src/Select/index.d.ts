type ISelectProps<T> = {
  id?: string;
  name?: string;
  value?: T | T[];
  options?: T[];
  onChange?: (val: T) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  notFoundText?: string;
  labelKey?: string;
  valueKey?: string;
  isMulti?: boolean;
  isCreatable?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isInitialOpen?: boolean;
  dropdownHeight?: number;
  dropdownWidth?: number;
  maxItemShow?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

type SelectComponent<T = any> = React.FC<ISelectProps<T>>;

export const Select: SelectComponent;

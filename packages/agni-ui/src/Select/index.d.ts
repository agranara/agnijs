interface ISelectProps {
  id?: string;
  name?: string;
  defaultValue?: any;
  value?: any | any[];
  options?: any[];
  onChange?: (val: any) => void;
  disabled?: boolean;
  placeholder?: string;
  notFoundText?: string;
  labelKey?: string;
  valueKey?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  dropdownHeight?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

declare const Select: React.FC<ISelectProps>;

export default Select;

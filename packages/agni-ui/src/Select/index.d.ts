import { PositionerProps } from '../Positioner';

type ISelectProps<T> = {
  /**
   * ID for select
   */
  id?: string;
  /**
   * Name attribute for select container
   */
  name?: string;
  /**
   * Controlled value for select, will be used if value is not undefined
   */
  value?: T | T[];
  /**
   * Select options. Default: []
   */
  options?: T[];
  /**
   * Handler on change value. Including onClear event
   */
  onChange?: (val: T) => void;
  /**
   * Is select disabled. Default: false
   */
  disabled?: boolean;
  /**
   * Is select readOnly. Default: false
   */
  readOnly?: boolean;
  /**
   * Placeholder for select input
   */
  placeholder?: string;
  /**
   * When search or empty options, this text will be triggered
   */
  notFoundText?: string;
  /**
   * Key used from provided options for showing label inside options.
   * Default: 'label'
   */
  labelKey?: string;
  /**
   * Key used from provided options to return value result.
   * Default: 'value'
   */
  valueKey?: string;
  /**
   * Is select for multiple results. Default: false
   */
  isMulti?: boolean;
  /**
   * Is select make new values by typing. Default: false
   */
  isCreatable?: boolean;
  /**
   * Is clear button shown. Default: true
   */
  isClearable?: boolean;
  /**
   * Is select provide search input. Default: true
   */
  isSearchable?: boolean;
  /**
   * Is list options shown initially. Default: false
   */
  isInitialOpen?: boolean;
  /**
   * Predefined list options portal height in pixel
   */
  dropdownHeight?: number;
  /**
   * Predefined list options portal width in pixel.
   * Default: Input select width
   */
  dropdownWidth?: number;
  /**
   * Maximum item shown inside list options before scroll
   * Default: 8
   */
  maxItemShow?: number;
  /**
   * Input size className. Default: 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional classname for select options container
   */
  className?: string;
  /**
   * Positioner properties. Extending 'Positioner' props
   */
  positionerProps?: PositionerProps;
};

type SelectComponent<T = any> = React.FC<ISelectProps<T>>;

export const Select: SelectComponent;

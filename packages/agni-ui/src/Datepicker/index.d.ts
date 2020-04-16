import { InputTextProps } from '../InputText';
import { Dayjs, ConfigType, OptionType } from 'dayjs';

type DatepickerModeType = 'date' | 'year' | 'week' | 'month';

type DatepickerParserType = (date?: ConfigType, option?: OptionType, locale?: string) => Dayjs;

interface IDatepickerProps {
  /**
   * Datepicker value formatter, used during `onChange`
   */
  valueFormat?: string;
  /**
   * Day.js compatible format for value shown inside textbox
   */
  visualFormat?: string;
  /**
   * Close picker on clear clicked. Default: true
   */
  closeOnClear?: boolean;
  /**
   * Close picker on date selected. Default: true
   */
  closeOnSelect?: boolean;
  /**
   * Dayjs locale setup. Default: 'id'
   */
  locale?: string;
  /**
   * Is input readonly
   */
  isReadOnly?: boolean;
  /**
   * Is input disabled
   */
  isDisabled?: boolean;
  /**
   * Is clear button shown. Default: true
   */
  isClearable?: boolean;
  /**
   * Is picker opened initially. Default false
   */
  initialOpenPicker?: boolean;
  /**
   * Datepicker mode. Default: 'date'
   */
  mode?: DatepickerModeType;
  /**
   * Datepicker custom parser from value (string) to dayjs format
   * Using this function should consider `valueFormat` that has been set
   */
  customParser?: (parser: DatepickerParserType, value?: any) => Dayjs;
}

type DatepickerProps = IDatepickerProps & InputTextProps;

export const Datepicker: React.ForwardRefExoticComponent<DatepickerProps>;

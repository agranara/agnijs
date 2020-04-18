import { InputTextProps } from '../InputText';
import { Dayjs, ConfigType, OptionType } from 'dayjs';
import { PseudoBoxProps } from '../PseudoBox';

type DatepickerModeType = 'date' | 'year' | 'week' | 'month';

type DatepickerParserType = (date?: ConfigType, option?: OptionType, locale?: string) => Dayjs;

type DatepickerCustomDateType = ((cellDate: Dayjs) => boolean) | string[];

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
   * Datepicker custom parser value from props (string) to dayjs format
   * Using this function should consider `valueFormat` that has been set
   * 
   * @example
   * <Datepicker
   *    customParser={(parser, value) => parser(year, 'YYYY').week(week)}
   * />
   */
  customParser?: (parser: Dayjs, value?: string | null) => Dayjs;
  /**
   * Custom date render
   * 
   * @example
   * <Datepicker
   *    dateRender={(cellDate, cellValue, boxProps) => (
   *      <PseudoBox {...boxProps} bg={cellDate.isSame('2020-04-10') && 'info.primary'}>
   *        {cellValue}
   *      </PseudoBox>
   *    )}
   * />
   */
  dateRender?: (cellDate: Dayjs, cellValue: string, boxProps: PseudoBoxProps) => JSX.Element;
  /**
   * Highlighted date using preset style
   * If it not sufficient enough, try `dateRender` property
   * 
   * @example
   * // With array, should be dayjs compatible format
   * // used dayjs(highlightedDates[index]) internally
   * <Datepicker
   *    highlightedDates={['2020-04-19']}
   * />
   * 
   * // Or using function, must return boolean when highlighted 
   * <Datepicker
   *    highlightedDates={current => {
   *      return current.isSame('2020-04-19');
   *    }}
   * />
   */
  highlightedDates?: DatepickerCustomDateType;
  /**
   * Disabling date based on rendered cell date
   * Disabled cell will remove click handler
   * When returned result is true, cell will be disabled
   * 
   * @example
   * // With array, should be dayjs compatible format
   * // used dayjs(disabledDates[index]) internally
   * <Datepicker
   *    disabledDates={['2020-04-19']}
   * />
   * 
   * // Or using function, must return boolean when highlighted 
   * <Datepicker
   *    disabledDates={current => {
   *      return current.isSame('2020-04-19');
   *    }}
   * />
   */
  disabledDates?: DatepickerCustomDateType;
}

type DatepickerProps = IDatepickerProps & InputTextProps;

export const Datepicker: React.ForwardRefExoticComponent<DatepickerProps>;

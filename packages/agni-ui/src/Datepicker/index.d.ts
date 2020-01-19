import { InputTextProps } from '../Input';

interface IDatepickerProps {
  valueFormat?: string;
  visualFormat?: string;
  closeOnClear?: boolean;
  closeOnSelect?: boolean;
  locale?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  initialOpenPicker?: boolean;
}

type DatepickerProps = IDatepickerProps & InputTextProps;

declare const Datepicker: React.ForwardRefExoticComponent<DatepickerProps>;

export default Datepicker;

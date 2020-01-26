import { InputTextProps } from '../InputText';

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

export const Datepicker: React.ForwardRefExoticComponent<DatepickerProps>;

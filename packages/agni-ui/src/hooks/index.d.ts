type UseDropdownProps = {
  ref: React.Ref<any>;
  initialOpen?: boolean;
  isFixed?: boolean;
};

type UseDropdownResult = {
  Dropdown: React.ReactElement;
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

type UseOnClickOutsideRefs = React.Ref<any> | React.Ref<any>[];
type UseOnClickOutsideHandler = () => void;

export const useDropdown: (inputProps: UseDropdownProps) => UseDropdownResult;

export const useOnClickOutside: (
  refs: UseOnClickOutsideRefs,
  onClickOutside: UseOnClickOutsideHandler,
  events: DocumentAndElementEventHandlersEventMap[]
) => void;

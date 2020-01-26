type UseDropdownProps = {
  ref: React.Ref<any>;
  initialOpen?: boolean;
  isFixed?: boolean;
  onOpen?: (ev?: Event) => void;
  onClose?: (ev?: Event) => void;
};

type UseDropdownResult = {
  Dropdown: React.ReactElement;
  isOpen: boolean;
  toggle: () => void;
  open: (event?: Event) => void;
  close: (event?: Event) => void;
  isEventOutsideRefs: (event?: Event) => boolean;
  reposition: () => void;
};

type UseOnClickOutsideRefs = React.Ref<any> | React.Ref<any>[];
type UseOnClickOutsideHandler = () => void;

export const useDropdown: (inputProps: UseDropdownProps) => UseDropdownResult;

export const useOnClickOutside: (
  refs: UseOnClickOutsideRefs,
  onClickOutside: UseOnClickOutsideHandler,
  events: DocumentAndElementEventHandlersEventMap[]
) => void;

export const useAutoId: (fallback?: string | null) => string | undefined;

type UseImagePropType = {
  src?: string;
  onLoad?: (ev: Event) => any;
  onError?: (ev: Event | string) => any;
};

export const useHasImageLoaded: (prop: UseImagePropType) => boolean;

interface UseDebounceOption {
  delay: number;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

interface UseDebounceValueProp<T> extends UseDebounceOption {
  value: T;
  equalityFn?: (prev: T, next: T) => boolean;
}

type UseDebounceResult<T> = [T, () => void, () => void];

export function useDebounceValue<T>(prop: UseDebounceValueProp<T>): UseDebounceResult<T>;

interface UseDebounceCbProp<T> extends UseDebounceOption {
  callback: T;
}

export function useDebounceCallback<T>(prop: UseDebounceCbProp<T>): UseDebounceResult<T>;

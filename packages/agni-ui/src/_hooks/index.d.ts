// eslint-disable-next-line import/no-unresolved
import { noOp } from '../common';

export const useAutoId: (fallback?: string | null) => string | undefined;

////////////////////////////////////////////

type UseDebounceResult<T> = [T, () => void, () => void];

interface UseDebounceOption {
  delay: number;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

interface UseDebounceCbProp<T> extends UseDebounceOption {
  callback: T;
}
export function useDebounceCallback<T>(prop: UseDebounceCbProp<T>): UseDebounceResult<T>;

////////////////////////////////////////////

interface UseDebounceValueProp<T> extends UseDebounceOption {
  value: T;
  equalityFn?: (prev: T, next: T) => boolean;
}

export function useDebounceValue<T>(prop: UseDebounceValueProp<T>): UseDebounceResult<T>;

////////////////////////////////////////////

type UseDropdownProps = {
  ref: React.Ref<any>;
  initialOpen?: boolean;
  isFixed?: boolean;
  isRight?: boolean;
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

export const useDropdown: (inputProps: UseDropdownProps) => UseDropdownResult;

////////////////////////////////////////////

export const useEnhancedEffect: (effect: React.EffectCallback, deps?: React.DependencyList) => void;

////////////////////////////////////////////

export function useForkedRef(...refs: React.Ref<any>[]): (node: any) => void;

////////////////////////////////////////////

type UseImagePropType = {
  src?: string;
  onLoad?: (ev: Event) => any;
  onError?: (ev: Event | string) => any;
};

export const useHasImageLoaded: (prop: UseImagePropType) => boolean;

////////////////////////////////////////////

export function useHover(): [React.Ref<any>, boolean];

////////////////////////////////////////////

type UseLongPressResult = {
  onTouchStart?: () => void;
  onMouseDown?: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchEnd: () => void;
};

export const useLongPress: (callback: noOp, speed: number) => UseLongPressResult;

////////////////////////////////////////////

export function usePrevious<T>(value: T): React.MutableRefObject<T>;

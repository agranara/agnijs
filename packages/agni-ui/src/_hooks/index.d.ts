// eslint-disable-next-line import/no-unresolved
import { noOp } from '../common';

export const useAutoId: (fallback?: string | null) => string | undefined;

////////////////////////////////////////////

type ComponentSizeResultType = {
  width?: number;
  height?: number;
};

export function useComponentSize(ref: React.Ref<any>): ComponentSizeResultType;

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

export function useInteval(callback: Function, delay: number): void;

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

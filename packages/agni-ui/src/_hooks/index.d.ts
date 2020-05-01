// eslint-disable-next-line import/no-unresolved
import { noOp } from '../common';

export const useAutoId: (fallback?: string | null) => string | undefined;

////////////////////////////////////////////

/**
 * Use component size to get width and height
 */
type ComponentSizeType = { width?: number; height?: number };
export function useComponentSize<T extends HTMLElement = HTMLElement>(
  args: HTMLElement | (() => HTMLElement) | null
): [ComponentSizeType];
export function useComponentSize<T extends HTMLElement = HTMLElement>(): [
  ComponentSizeType,
  React.RefObject<T>
];

////////////////////////////////////////////

interface UseDebounceOption {
  delay: number;
}

interface UseDebounceOptionProps {
  maxWait?: number;
  trailing?: boolean;
  leading?: boolean;
}

interface UseDebounceValueOptionProps extends UseDebounceOptionProps {
  equalityFn?: (left: any, right: any) => boolean;
}

interface UseDebounceCbProp<T> extends UseDebounceOption {
  callback: T;
  options?: UseDebounceOptionProps;
}

type DebounceCancel = () => void;
export function useDebounceCallback<T>(prop: UseDebounceCbProp<T>): [T, DebounceCancel];

////////////////////////////////////////////

interface UseDebounceValueProp<T> extends UseDebounceOption {
  value: T;
  options?: UseDebounceValueOptionProps;
}

export function useDebounceValue<T>(prop: UseDebounceValueProp<T>): [T];

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

type HandleEvent = (ev: Event) => void;

type noOp = () => any;

export function uniqueId(prefix?: string): string;

export const wrapEvent: (
  theirHandler?: HandleEvent,
  ourHandler?: HandleEvent
) => (ev: Event) => void;

export const addEvent: (obj: Element, ...args: any) => void;

export const removeEvent: (obj: Element, ...ags: any) => void;

export function useForkedRef(...refs: React.Ref<any>[]): (node: any) => void;

export function usePrevious(value: any): any;

export function useUpdateEffect(effect: noOp, deps: React.DependencyList): void;

export function useStateWithCallback<T>(
  initialState: T,
  callback: noOp
): [T, React.SetStateAction<T>];

export function useStateWithCallbackInstant<T>(
  initialState: T,
  callback: noOp
): [T, React.SetStateAction<T>];

export function useRefState<T>(initialValue: T): [T, React.SetStateAction<T>];

type UseLongPressResult = {
  onTouchStart?: () => void;
  onMouseDown?: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchEnd: () => void;
};

export const useLongPress: (callback: noOp, speed: number) => UseLongPressResult;

export const useEnhancedEffect: (effect: React.EffectCallback, deps?: React.DependencyList) => void;

export const mergeRefs: (...refs: React.Ref<any>[]) => (ref: React.Ref<any>) => void;

export const assignRef: (ref: React.Ref<any>, value: any) => void;

export const setRef: (ref: React.Ref<any>, value: any) => void;

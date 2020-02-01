import { useLayoutEffect, useEffect } from 'react';

/**
 * Enhanced effect hooks, when ssr (server side rendering)
 * or csr (client side rendering)
 */
const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export { useEnhancedEffect };

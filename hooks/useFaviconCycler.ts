/**
 * useFaviconCycler Hook
 * Manages dynamic favicon color cycling
 */

import React, { useEffect } from 'react';
import { TIMING, ANIMATION } from '@/utils/constants';

interface UseFaviconCyclerOptions {
  intervalMs?: number;
  colors?: string[];
  enabled?: boolean;
  onColorChange?: (color: string) => void;
}

export const useFaviconCycler = (options: UseFaviconCyclerOptions = {}) => {
  const {
    intervalMs = TIMING.FAVICON_UPDATE_INTERVAL_MS,
    colors = ANIMATION.FAVICON_COLORS as unknown as string[],
    enabled = true,
    onColorChange,
  } = options;

  useEffect(() => {
    if (!enabled) return;

    // Cache DOM elements
    let faviconElement: HTMLLinkElement | null = null;
    let themeColorMeta: HTMLMetaElement | null = null;
    let colorIndex = 0;

    // Initialize on first run
    const initializeFavicon = () => {
      faviconElement = document.getElementById('favicon') as HTMLLinkElement | null;
      themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;

      if (!faviconElement) {
        console.warn('Favicon element with id="favicon" not found');
      }
      if (!themeColorMeta) {
        console.warn('Meta tag with name="theme-color" not found');
      }
    };

    initializeFavicon();

    // Generate SVG favicon data URI
    const generateFaviconDataUri = (color: string): string => {
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 40 25 L 15 50 L 40 75" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 60 25 L 85 50 L 60 75" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 55 15 L 45 85" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" />
</svg>`;
      return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    };

    // Update favicon and theme color
    const updateFavicon = (color: string) => {
      if (faviconElement) {
        faviconElement.href = generateFaviconDataUri(color);
      }
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', color);
      }
      onColorChange?.(color);
    };

    // Start cycling
    const interval = setInterval(() => {
      if (faviconElement || themeColorMeta) {
        const color = colors[colorIndex];
        updateFavicon(color);
        colorIndex = (colorIndex + 1) % colors.length;
      }
    }, intervalMs);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [intervalMs, colors, enabled, onColorChange]);

  return {
    isRunning: enabled,
    colorCount: colors.length,
  };
};

/**
 * Alternative hook that returns current color
 */
export const useFaviconCyclerWithState = (options: UseFaviconCyclerOptions = {}) => {
  const [currentColor, setCurrentColor] = React.useState(
    (options.colors ?? ANIMATION.FAVICON_COLORS as unknown as string[])[0]
  );

  useFaviconCycler({
    ...options,
    onColorChange: setCurrentColor,
  });

  return { currentColor };
};

// Export for direct use
export default useFaviconCycler;
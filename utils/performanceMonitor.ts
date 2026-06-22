/**
 * Performance Monitoring Utilities
 * Track and report performance metrics
 */

import { PERFORMANCE, LOGGING } from './constants';
import type { PerformanceMetric } from '@/types';

interface PerformanceObserverOptions {
  threshold?: number;
  onSlow?: (label: string, duration: number) => void;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private marks: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  /**
   * Measure execution time of a function
   */
  measureFunction = <T extends unknown[], R>(
    fn: (...args: T) => R,
    label: string,
    options?: PerformanceObserverOptions
  ) => {
    const wrappedFn = (...args: T): R => {
      const start = performance.now();
      try {
        const result = fn(...args);
        const duration = performance.now() - start;
        this.recordMetric(label, duration, options);
        return result;
      } catch (error) {
        const duration = performance.now() - start;
        this.recordMetric(`${label} (error)`, duration, options);
        throw error;
      }
    };
    return wrappedFn;
  };

  /**
   * Measure async function execution
   */
  measureAsync = <T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
    label: string,
    options?: PerformanceObserverOptions
  ) => {
    const wrappedFn = async (...args: T): Promise<R> => {
      const start = performance.now();
      try {
        const result = await fn(...args);
        const duration = performance.now() - start;
        this.recordMetric(label, duration, options);
        return result;
      } catch (error) {
        const duration = performance.now() - start;
        this.recordMetric(`${label} (error)`, duration, options);
        throw error;
      }
    };
    return wrappedFn;
  };

  /**
   * Start a performance mark
   */
  mark(label: string): void {
    this.marks.set(label, performance.now());
  }

  /**
   * End a performance mark and record the measurement
   */
  measure(label: string, options?: PerformanceObserverOptions): number {
    const startTime = this.marks.get(label);
    if (!startTime) {
      console.warn(`Performance mark "${label}" not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.recordMetric(label, duration, options);
    this.marks.delete(label);

    return duration;
  }

  /**
   * Record a performance metric
   */
  private recordMetric(
    label: string,
    duration: number,
    options?: PerformanceObserverOptions
  ): void {
    const threshold = options?.threshold ?? PERFORMANCE.RENDER_TIME_THRESHOLD_MS;

    // Store metric
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    this.metrics.get(label)!.push({
      name: label,
      duration,
      timestamp: Date.now(),
    });

    // Log if exceeds threshold
    if (duration > threshold) {
      if (LOGGING.CURRENT_LEVEL <= LOGGING.LEVELS.WARN) {
        console.warn(`⚠️ [Performance] "${label}" took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
      }
      options?.onSlow?.(label, duration);
    } else if (LOGGING.CURRENT_LEVEL <= LOGGING.LEVELS.DEBUG) {
      console.debug(`✓ [Performance] "${label}" took ${duration.toFixed(2)}ms`);
    }
  }

  /**
   * Get metrics for a specific label
   */
  getMetrics(label: string): PerformanceMetric[] {
    return this.metrics.get(label) ?? [];
  }

  /**
   * Get average duration for a label
   */
  getAverageDuration(label: string): number {
    const metrics = this.getMetrics(label);
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, m) => acc + m.duration, 0);
    return sum / metrics.length;
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): Record<string, PerformanceMetric[]> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Clear metrics
   */
  clear(): void {
    this.metrics.clear();
    this.marks.clear();
  }

  /**
   * Clear specific label metrics
   */
  clearLabel(label: string): void {
    this.metrics.delete(label);
    this.marks.delete(label);
  }

  /**
   * Report summary of all metrics
   */
  report(): void {
    console.group('📊 Performance Report');

    const allMetrics = this.getAllMetrics();
    const entries = Object.entries(allMetrics)
      .map(([label, metrics]) => ({
        label,
        count: metrics.length,
        avg: metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length,
        min: Math.min(...metrics.map(m => m.duration)),
        max: Math.max(...metrics.map(m => m.duration)),
      }))
      .sort((a, b) => b.avg - a.avg);

    console.table(entries.map(e => ({
      'Metric': e.label,
      'Calls': e.count,
      'Avg (ms)': e.avg.toFixed(2),
      'Min (ms)': e.min.toFixed(2),
      'Max (ms)': e.max.toFixed(2),
    })));

    console.groupEnd();
  }

  /**
   * Observe Core Web Vitals
   */
  observeWebVitals(callback?: (vitals: {
    cls: number;
    fid: number;
    lcp: number;
  }) => void): void {
    if (!('PerformanceObserver' in window)) return;

    const vitals = { cls: 0, fid: 0, lcp: 0 };

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'], buffered: true });
      this.observers.push(lcpObserver);
    } catch (e) {
      // LCP not supported
    }

    // Cumulative Layout Shift
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ((entry as any).hadRecentInput) continue;
          vitals.cls += (entry as any).value;
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'], buffered: true });
      this.observers.push(clsObserver);
    } catch (e) {
      // CLS not supported
    }

    // First Input Delay (deprecated, use INP instead)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          vitals.fid = Math.max(vitals.fid, (entry as any).processingDuration);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'], buffered: true });
      this.observers.push(fidObserver);
    } catch (e) {
      // FID not supported
    }

    callback?.(vitals);

    return () => {
      this.observers.forEach(observer => observer.disconnect());
      this.observers = [];
    };
  }

  /**
   * Disconnect all observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * React Hook for component performance monitoring
 */
export function usePerformanceMonitor(componentName: string) {
  return {
    mark: (label: string) => performanceMonitor.mark(`${componentName}:${label}`),
    measure: (label: string, options?: PerformanceObserverOptions) =>
      performanceMonitor.measure(`${componentName}:${label}`, options),
  };
}

/**
 * Utility to measure React component render time
 */
export function measureRenderTime(componentName: string) {
  const label = `render:${componentName}`;
  performanceMonitor.mark(label);

  return () => {
    const duration = performanceMonitor.measure(label, {
      threshold: PERFORMANCE.RENDER_TIME_THRESHOLD_MS,
    });
    return duration;
  };
}

/**
 * Get performance summary
 */
export function getPerformanceSummary() {
  const metrics = performanceMonitor.getAllMetrics();
  return {
    totalMetrics: Object.keys(metrics).length,
    totalMeasurements: Object.values(metrics).reduce((sum, m) => sum + m.length, 0),
    slowestMetrics: Object.entries(metrics)
      .map(([label, ms]) => ({
        label,
        duration: Math.max(...ms.map(m => m.duration)),
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5),
  };
}

export default performanceMonitor;

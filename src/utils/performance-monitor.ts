export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  gpuMemory?: number;
}

export interface QualitySettings {
  shadows: boolean;
  postProcessing: boolean;
  pixelRatio: number;
  antialias: boolean;
  shadowMapSize: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private frameCount = 0;
  private lastTime = 0;
  private frameTime = 0;
  private fps = 0;
  private fpsHistory: number[] = [];
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];
  private isRunning = false;

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.updateMetrics();
  }

  stop(): void {
    this.isRunning = false;
  }

  private updateMetrics(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    this.frameTime = currentTime - this.lastTime;
    this.frameCount++;

    // Calculate FPS every 60 frames
    if (this.frameCount >= 60) {
      this.fps = Math.round(1000 / (this.frameTime / this.frameCount));
      this.fpsHistory.push(this.fps);
      
      // Keep only last 30 readings (30 seconds at 1 reading per second)
      if (this.fpsHistory.length > 30) {
        this.fpsHistory.shift();
      }

      const metrics: PerformanceMetrics = {
        fps: this.fps,
        frameTime: this.frameTime / this.frameCount,
        memoryUsage: this.getMemoryUsage(),
        gpuMemory: this.getGPUMemoryUsage(),
      };

      this.callbacks.forEach(callback => callback(metrics));
      this.frameCount = 0;
    }

    this.lastTime = currentTime;
    requestAnimationFrame(() => this.updateMetrics());
  }

  private getMemoryUsage(): number | undefined {
    // @ts-ignore - performance.memory is not in all browsers
    return performance.memory?.usedJSHeapSize;
  }

  private getGPUMemoryUsage(): number | undefined {
    // @ts-ignore - webkitGetUserMedia is not standard
    return performance.memory?.totalJSHeapSize;
  }

  getAverageFPS(): number {
    if (this.fpsHistory.length === 0) return 0;
    return Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length);
  }

  getMinFPS(): number {
    return this.fpsHistory.length > 0 ? Math.min(...this.fpsHistory) : 0;
  }

  onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }
}

export class QualityManager {
  private static instance: QualityManager;
  private currentSettings: QualitySettings;
  private monitor: PerformanceMonitor;
  private autoAdjustEnabled = true;
  private lastAdjustTime = 0;
  private callbacks: ((settings: QualitySettings) => void)[] = [];

  private constructor() {
    this.monitor = PerformanceMonitor.getInstance();
    this.currentSettings = this.getDefaultSettings();
    this.setupAutoAdjustment();
  }

  static getInstance(): QualityManager {
    if (!QualityManager.instance) {
      QualityManager.instance = new QualityManager();
    }
    return QualityManager.instance;
  }

  private getDefaultSettings(): QualitySettings {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return {
      shadows: !isMobile,
      postProcessing: !isMobile,
      pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
      antialias: !isMobile,
      shadowMapSize: isMobile ? 512 : 1024,
    };
  }

  private setupAutoAdjustment(): void {
    this.monitor.onMetricsUpdate((metrics) => {
      if (this.autoAdjustEnabled && this.shouldAdjustQuality(metrics)) {
        this.adjustQuality(metrics);
      }
    });
  }

  private shouldAdjustQuality(_metrics: PerformanceMetrics): boolean {
    const now = performance.now();
    // Only adjust every 5 seconds
    if (now - this.lastAdjustTime < 5000) return false;
    
    // Adjust if FPS is consistently low or high
    const avgFPS = this.monitor.getAverageFPS();
    return avgFPS < 45 || avgFPS > 75;
  }

  private adjustQuality(_metrics: PerformanceMetrics): void {
    const avgFPS = this.monitor.getAverageFPS();
    const newSettings = { ...this.currentSettings };
    let changed = false;

    if (avgFPS < 45) {
      // Reduce quality
      if (newSettings.postProcessing) {
        newSettings.postProcessing = false;
        changed = true;
      } else if (newSettings.shadows) {
        newSettings.shadows = false;
        changed = true;
      } else if (newSettings.pixelRatio > 1) {
        newSettings.pixelRatio = Math.max(1, newSettings.pixelRatio - 0.5);
        changed = true;
      } else if (newSettings.shadowMapSize > 256) {
        newSettings.shadowMapSize = Math.max(256, newSettings.shadowMapSize / 2);
        changed = true;
      }
    } else if (avgFPS > 75) {
      // Increase quality
      if (!newSettings.shadows) {
        newSettings.shadows = true;
        changed = true;
      } else if (!newSettings.postProcessing) {
        newSettings.postProcessing = true;
        changed = true;
      } else if (newSettings.pixelRatio < 2) {
        newSettings.pixelRatio = Math.min(2, newSettings.pixelRatio + 0.5);
        changed = true;
      } else if (newSettings.shadowMapSize < 1024) {
        newSettings.shadowMapSize = Math.min(1024, newSettings.shadowMapSize * 2);
        changed = true;
      }
    }

    if (changed) {
      this.currentSettings = newSettings;
      this.lastAdjustTime = performance.now();
      this.callbacks.forEach(callback => callback(newSettings));
      console.log('Quality adjusted:', newSettings, 'FPS:', avgFPS);
    }
  }

  getSettings(): QualitySettings {
    return { ...this.currentSettings };
  }

  setSettings(settings: Partial<QualitySettings>): void {
    this.currentSettings = { ...this.currentSettings, ...settings };
    this.callbacks.forEach(callback => callback(this.currentSettings));
  }

  enableAutoAdjust(enabled: boolean): void {
    this.autoAdjustEnabled = enabled;
  }

  onSettingsChange(callback: (settings: QualitySettings) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }
}
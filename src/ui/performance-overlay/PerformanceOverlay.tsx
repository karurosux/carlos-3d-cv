import {useEffect, useState} from 'react';
import {
  PerformanceMonitor,
  PerformanceMetrics,
  QualityManager,
  QualitySettings,
} from '../../utils/performance-monitor';

export function PerformanceOverlay() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
  });
  const [settings, setSettings] = useState<QualitySettings | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [monitor] = useState(() => PerformanceMonitor.getInstance());
  const [qualityManager] = useState(() => QualityManager.getInstance());

  useEffect(() => {
    // Start monitoring
    monitor.start();

    const unsubscribeMetrics = monitor.onMetricsUpdate(setMetrics);
    const unsubscribeSettings = qualityManager.onSettingsChange(setSettings);

    // Initial settings
    setSettings(qualityManager.getSettings());

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      monitor.stop();
      unsubscribeMetrics();
      unsubscribeSettings();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [monitor, qualityManager]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <div className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          FPS: {metrics.fps}
        </div>
      </div>
    );
  }

  const formatBytes = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const toggleSetting = (key: keyof QualitySettings) => {
    if (!settings) return;

    const newValue =
      key === 'pixelRatio' || key === 'shadowMapSize'
        ? settings[key]
        : !settings[key];

    qualityManager.setSettings({[key]: newValue});
  };

  const adjustPixelRatio = (delta: number) => {
    if (!settings) return;
    const newRatio = Math.max(0.5, Math.min(3, settings.pixelRatio + delta));
    qualityManager.setSettings({pixelRatio: newRatio});
  };

  const adjustShadowMapSize = (delta: number) => {
    if (!settings) return;
    const newSize = Math.max(
      256,
      Math.min(2048, settings.shadowMapSize * delta)
    );
    qualityManager.setSettings({shadowMapSize: newSize});
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono max-w-xs">
      <div className="mb-3">
        <div className="text-green-400 font-bold mb-1">Performance Monitor</div>
        <div>
          FPS:{' '}
          <span
            className={
              metrics.fps < 30
                ? 'text-red-400'
                : metrics.fps < 50
                ? 'text-yellow-400'
                : 'text-green-400'
            }
          >
            {metrics.fps}
          </span>
        </div>
        <div>Frame Time: {metrics.frameTime.toFixed(2)}ms</div>
        <div>Avg FPS: {monitor.getAverageFPS()}</div>
        <div>Min FPS: {monitor.getMinFPS()}</div>
        <div>Memory: {formatBytes(metrics.memoryUsage)}</div>
      </div>

      {settings && (
        <div className="mb-3">
          <div className="text-blue-400 font-bold mb-1">Quality Settings</div>

          <div className="flex items-center justify-between mb-1">
            <span>Shadows:</span>
            <button
              onClick={() => toggleSetting('shadows')}
              className={`px-2 py-1 rounded text-xs ${
                settings.shadows ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {settings.shadows ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between mb-1">
            <span>Post Processing:</span>
            <button
              onClick={() => toggleSetting('postProcessing')}
              className={`px-2 py-1 rounded text-xs ${
                settings.postProcessing ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {settings.postProcessing ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between mb-1">
            <span>Antialias:</span>
            <button
              onClick={() => toggleSetting('antialias')}
              className={`px-2 py-1 rounded text-xs ${
                settings.antialias ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {settings.antialias ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between mb-1">
            <span>Pixel Ratio:</span>
            <div className="flex gap-1">
              <button
                onClick={() => adjustPixelRatio(-0.5)}
                className="px-1 py-1 bg-gray-600 rounded text-xs"
              >
                -
              </button>
              <span className="px-2">{settings.pixelRatio.toFixed(1)}</span>
              <button
                onClick={() => adjustPixelRatio(0.5)}
                className="px-1 py-1 bg-gray-600 rounded text-xs"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-1">
            <span>Shadow Map:</span>
            <div className="flex gap-1">
              <button
                onClick={() => adjustShadowMapSize(0.5)}
                className="px-1 py-1 bg-gray-600 rounded text-xs"
              >
                -
              </button>
              <span className="px-2">{settings.shadowMapSize}</span>
              <button
                onClick={() => adjustShadowMapSize(2)}
                className="px-1 py-1 bg-gray-600 rounded text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-gray-400 text-xs">Press Ctrl+Shift+P to toggle</div>
    </div>
  );
}


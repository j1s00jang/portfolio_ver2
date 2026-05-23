import { useEffect, useState } from "react";
import type { LucideProps } from "lucide-react";
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "lucide-react";

const VANCOUVER_LAT = 49.2827;
const VANCOUVER_LON = -123.1207;

type WeatherData = {
  max: number;
  min: number;
  code: number;
};

function iconForWmoCode(code: number) {
  const p: LucideProps = {
    className: "h-3.5 w-3.5 shrink-0 text-accent",
    strokeWidth: 1.5,
  };
  if (code === 0) return <Sun {...p} aria-hidden />;
  if (code === 1) return <CloudSun {...p} aria-hidden />;
  if (code === 2) return <CloudSun {...p} aria-hidden />;
  if (code === 3) return <Cloud {...p} aria-hidden />;
  if (code === 45 || code === 48) return <CloudFog {...p} aria-hidden />;
  if (code >= 51 && code <= 67) return <CloudRain {...p} aria-hidden />;
  if (code >= 71 && code <= 77) return <CloudSnow {...p} aria-hidden />;
  if (code >= 80 && code <= 82) return <CloudRain {...p} aria-hidden />;
  if (code >= 95) return <CloudLightning {...p} aria-hidden />;
  return <Cloud {...p} aria-hidden />;
}

export function VancouverWeather() {
  const [data, setData] = useState<WeatherData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const url = new URL("https://api.open-meteo.com/v1/forecast");
        url.searchParams.set("latitude", String(VANCOUVER_LAT));
        url.searchParams.set("longitude", String(VANCOUVER_LON));
        url.searchParams.set("current", "weather_code");
        url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
        url.searchParams.set("timezone", "America/Vancouver");
        url.searchParams.set("forecast_days", "1");

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("weather");
        const json = (await res.json()) as {
          current: { weather_code: number };
          daily: { temperature_2m_max: number[]; temperature_2m_min: number[] };
        };
        if (cancelled) return;
        setData({
          max: json.daily.temperature_2m_max[0],
          min: json.daily.temperature_2m_min[0],
          code: json.current.weather_code,
        });
      } catch {
        if (!cancelled) setData(null);
      }
    }

    load();
    const interval = window.setInterval(load, 30 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  if (data === undefined) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-foreground opacity-50"
        aria-hidden
      >
        <Cloud className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.5} />
        <span className="tabular-nums">—</span>
      </span>
    );
  }

  if (data === null) {
    return null;
  }

  const hi = Math.round(data.max);
  const lo = Math.round(data.min);

  return (
    <span
      className="inline-flex items-center gap-1.5 text-foreground"
      title={`Vancouver today: high ${hi}°C, low ${lo}°C`}
    >
      <span className="sr-only">
        Vancouver weather today: high {hi} degrees Celsius, low {lo} degrees
        Celsius.
      </span>
      {iconForWmoCode(data.code)}
      <span className="tabular-nums tracking-normal normal-case" aria-hidden>
        {hi}° <span className="text-accent">/</span> {lo}°
      </span>
    </span>
  );
}

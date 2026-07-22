// useFetchData obtiene datos de Open-Meteo y devuelve un objeto con tres estados:
// 1) data: la respuesta de la API (o null si todavía no llegó)
// 2) loading: si la petición está en curso
// 3) error: mensaje de error si la petición falla
// El hook cambia la petición cuando cambia la opción seleccionada.

import { useState, useEffect } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  quito: { latitude: -0.180653, longitude: -78.467834 },
  manta: { latitude: -0.967383, longitude: -80.716109 },
  cuenca: { latitude: -2.90055, longitude: -79.00427 },
};

export interface UseFetchDataResult {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function useFetchData(selectedOption: string | null): UseFetchDataResult {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const option = selectedOption != null ? selectedOption : 'guayaquil';
    const cityConfig = CITY_COORDS[option] ?? CITY_COORDS.guayaquil;
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=America%2FGuayaquil`;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const jsonData: OpenMeteoResponse = await response.json();
        setData(jsonData);
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          if (fetchError.name === 'AbortError') {
            return;
          }
          setError(fetchError.message);
        } else {
          setError('Error desconocido al obtener los datos.');
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [selectedOption]);

  return { data, loading, error };
}

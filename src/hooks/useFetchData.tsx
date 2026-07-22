// useFetchData obtiene datos de Open-Meteo y devuelve un objeto con tres estados:
// 1) data: la respuesta de la API (o null si todavía no llegó)
// 2) loading: si la petición está en curso
// 3) error: mensaje de error si la petición falla

import { useState, useEffect } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export interface UseFetchDataResult {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function useFetchData(): UseFetchDataResult {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.8953&longitude=-78.9963&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=America%2FChicago';

    useEffect(() => {
        // AbortController evita actualizar estado cuando el componente se desmonta
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
                    // Ignorar el abort manual de la petición, ya que ocurre
                    // cuando el componente se desmonta o el modo dev recarga HMR.
                    if (fetchError.name === 'AbortError') {
                        return;
                    }
                    setError(fetchError.message);
                } else {
                    setError('Error desconocido al obtener los datos.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, []);  // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };
}
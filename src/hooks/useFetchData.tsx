{/*
    Importe los hooks useState y useEffect de React.

Importe la interfaz como tipos de datos (type) OpenMeteoResponse del archivo ../types/DashboardTypes.tsx.

Declare que el componente useFetchData retorna un objeto del tipo OpenMeteoResponse.

Dentro de useFetchData:

Declare la constante de estado data y la función de actualización setData del tipo OpenMeteoResponse (o null). El valor predeterminado es de tipo null.

Defina la constante URL con el endpoint de los datos de Open-Meteo.

Agregue el hook useEffect para que reaccione únicamente después del primer renderizado del DOM.

Retorne data al final del componente

Dentro del función flecha del useEffect, realice un requerimiento asíncrono con la URL del endpoint. Al completarse la petición, actualice el estado data con la respuesta en formato JSON.


    */}

import { useState, useEffect } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(): OpenMeteoResponse | null {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);

    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);  // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;
}
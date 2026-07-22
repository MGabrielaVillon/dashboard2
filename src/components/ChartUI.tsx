import { LineChart } from '@mui/x-charts/LineChart';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type Hourly } from '../types/DashboardTypes';

interface ChartUIProps {
  hourly: Hourly | null;
  loading: boolean;
  error: string | null;
}

// ChartUI usa los datos horarios de Open-Meteo para mostrar un gráfico lineal.
// Si la API aún carga o hay un error, se muestra el estado correspondiente.

export default function ChartUI({ hourly, loading, error }: ChartUIProps) {
  const maxPoints = 24;
  const labels = hourly?.time.slice(0, maxPoints) ?? [];
  const temperatureData = hourly?.temperature_2m.slice(0, maxPoints) ?? [];
  const windSpeedData = hourly?.wind_speed_10m.slice(0, maxPoints) ?? [];

  return (
    <Box>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Temperatura y viento horario
      </Typography>

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : loading ? (
        <Typography>Cargando datos del gráfico...</Typography>
      ) : hourly && labels.length > 0 ? (
        <LineChart
          height={320}
          series={[
            { data: temperatureData, label: 'Temperatura 2m (°C)' },
            { data: windSpeedData, label: 'Viento 10m (m/s)' },
          ]}
          xAxis={[{ scaleType: 'point', data: labels, label: 'Hora' }]}
        />
      ) : (
        <Typography>No hay datos suficientes para generar el gráfico.</Typography>
      )}
    </Box>
  );
}

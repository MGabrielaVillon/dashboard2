import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type Hourly } from '../types/DashboardTypes';

interface TableUIProps {
  hourly: Hourly | null;
  loading: boolean;
  error: string | null;
}

// TableUI recibe los datos horarios de Open-Meteo y los convierte en filas para DataGrid.
// También muestra mensajes de error y mantiente el spinner de carga mientras se obtienen datos.

interface TableRow {
  id: number;
  time: string;
  temperature: number;
  windSpeed: number;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'time', headerName: 'Hora', width: 220 },
  { field: 'temperature', headerName: 'Temperatura (°C)', width: 170, type: 'number' },
  { field: 'windSpeed', headerName: 'Viento (m/s)', width: 180, type: 'number' },
];

function buildRows(hourly: Hourly): TableRow[] {
  const count = Math.min(hourly.time.length, hourly.temperature_2m.length, hourly.wind_speed_10m.length, 24);

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    time: hourly.time[index],
    temperature: hourly.temperature_2m[index],
    windSpeed: hourly.wind_speed_10m[index],
  }));
}

export default function TableUI({ hourly, loading, error }: TableUIProps) {
  const rows = hourly ? buildRows(hourly) : [];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Datos horarios de Open-Meteo
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

      {!loading && !error && rows.length === 0 && (
        <Typography sx={{ mt: 2 }}>No hay datos de Open-Meteo disponibles en este momento.</Typography>
      )}
    </Box>
  );
}

import './App.css'

import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import { Grid } from '@mui/material';

function App() {
   return (
      <Grid container spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>

         {/* Encabezado */}
         <Grid size={{ xs: 12}}>
            <HeaderUI />
            {/* Antes decía Elemento: Encabezado y no <HeaderUI /> */}
         </Grid>

         {/* Alertas */}
         <Grid size={{ xs: 12 }} container sx={{ justifyContent: "flex-end", alignItems: "center"}}>
            <AlertUI description="No se preveen lluvias" />
         </Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3 }}>
            <SelectorUI />
         </Grid>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>Elemento: Gráfico</Grid>

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
   );
}

export default App;


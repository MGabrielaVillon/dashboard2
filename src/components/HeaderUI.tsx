{/* HeaderUI component 
Agregue el contenido al componente HeaderUI, con:

Importe el componente Typography de la librería @mui/material/Typography

En el JSX, use el componente Typography con las siguientes propiedades:

Estilo tipográfico (variant) de un encabezado de nivel 2 (h2),

Renderización (component) como un encabezado de nivel 1 (h1), y

Estilo en línea (sx) para que el texto se muestre en negrita (fontWeight: “bold”).

El texto del componente Typography es «Dashboard del Clima».
    
    
    */}

import Typography from '@mui/material/Typography';

export default function HeaderUI() {
    return (
        <Typography 
            variant="h2" 
            component="h1" 
            sx={{ fontWeight: "bold" }}>
            Dashboard del Clima
        </Typography>
    );
}
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SelectorUI() {
   const [cityInput, setCityInput] = useState('');

   const handleChange = (event: SelectChangeEvent<string>) => {
      setCityInput(event.target.value);
   };

   const formatCity = (city: string) => {
      return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
   };

   return (
      <FormControl fullWidth>
         <InputLabel id="city-select-label">Ciudad</InputLabel>
         <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            value={cityInput}
            onChange={handleChange}
         >
            <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
            <MenuItem value={"Guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"Quito"}>Quito</MenuItem>
            <MenuItem value={"Manta"}>Manta</MenuItem>
            <MenuItem value={"Cuenca"}>Cuenca</MenuItem>
         </Select>
         {cityInput && (
            <p>
               Información del clima en <strong>{formatCity(cityInput)}</strong>
            </p>
         )}
      </FormControl>
   );
}
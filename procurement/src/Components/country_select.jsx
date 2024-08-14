import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useCountry } from '../contexts/CountryContext.jsx';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CountrySelect = () => {
    const countryData = useCountry();

    const [selectedCountries, setSelectedCountries] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCountries(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(selectedCountries)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: '100%' }}>
                <InputLabel id="country-multiple-checkbox-label">Select Country</InputLabel>
                <Select
                    labelId="country-multiple-checkbox-label"
                    id="country-multiple-checkbox"
                    multiple
                    value={selectedCountries}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Country" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {countryData.map((country) => (
                        <MenuItem key={country.countryCode} value={country.countryName}>
                            <Checkbox checked={selectedCountries.indexOf(country.countryName) > -1} />
                            <ListItemText
                                primary={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <ReactCountryFlag
                                            countryCode={country.countryCode}
                                            svg
                                            style={{
                                                width: '2em',
                                                height: '2em',
                                                marginRight: '8px',
                                            }}
                                            title={country.countryName}
                                        />
                                        {country.countryName}
                                    </div>
                                }
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default CountrySelect;

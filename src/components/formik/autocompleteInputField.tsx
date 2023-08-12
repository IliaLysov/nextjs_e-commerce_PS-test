'use client'

import {TextField, Autocomplete, Chip} from '@mui/material'
// import Chip from '@mui/material'

export default function AutocompleteInputField({value, setFieldValue, options, label, name, touched, errors, ...rest}: any) {
    return (
        <Autocomplete
            {...rest}
            size="small"
            value={value}
            onChange={(_, newValue) => setFieldValue(name, newValue)}
            options={options}
            isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
            renderOption={(props, option: any) => <li {...props} key={option.value}>{option.label}</li>}
            renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option: any, index) => (
                  <Chip {...getTagProps({ index })} key={option.value} label={option.label} />
                ))
              }}
            renderInput={(params) => <TextField {...params} 
                label={label}
                error={touched[name] && errors[name]}
                helperText={touched[name] && errors[name]}
            />}
        />
    )
}
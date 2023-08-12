'use client'

import { Field } from 'formik'
import {TextField} from '@mui/material'
import { useEffect, useState } from 'react'

export default function InputField({name, setFieldValue, value, ...rest}: any) {
    const [newValue, setNewValue] = useState<string>(value)

    useEffect(() => {
        setNewValue(value)
    }, [value])

    const handleKeyPress = (e: any) => {e.key === 'Enter' && handleChange()}

    const handleChange = () => {setFieldValue(name, newValue)}

    return (
        <Field type='text' name={name}>
            {({field, form}: any) => {

                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"

                        value={newValue}
                        onChange={(e: any) => setNewValue(e.target.value)}
                        onBlur={() => handleChange()}
                        onKeyDown={handleKeyPress}

                        error={form.touched[name] && form.errors[name]}
                        helperText={form.touched[name] && form.errors[name]}

                        {...rest}
                    />
                )

            }}
        </Field>
        
    ) 
}
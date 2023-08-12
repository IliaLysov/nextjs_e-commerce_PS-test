'use client'

import { PriceInterface, FiltersInterface, FiltersType } from '@/types/filter'
import styles from './styles.module.scss'
import { Slider } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface CurrentInterface {
    min: number | string,
    max: number | string
}

// interface CurrantValueInterface {
//     min: number,
//     max: number
// }

export default function CustomSlider({title, min, max, label, value, setNewFilters}: {title: string, min: number, max: number, label: string, value: FiltersType, setNewFilters: Dispatch<SetStateAction<FiltersInterface | null>>}) {
    const [currentSliderVal, setCurrentSliderVal] = useState<number[]>([value.min, value.max])
    const [currentVal, setCurrentVal] = useState<CurrentInterface>(value)

    useEffect(() => {
        setCurrentSliderVal([value.min, value.max])
        setCurrentVal(value)
    }, [value])

    const setValue = (newValue: CurrentInterface) => {
        setNewFilters((prev: FiltersInterface | null) => {
            if (prev) {
                return {...prev, [label]: newValue}
            }
            return null
        })
    }


    const handleChangeSlider = (event: any, newValue: any, activeThumb: any) => {
        // setValue({min: newValue[0], max: newValue[1]})
        setCurrentSliderVal(newValue)
        setCurrentVal({min: newValue[0], max: newValue[1]})
    }

    const handleChangeCommitedSlider = () => {
        setValue({min: currentSliderVal[0], max: currentSliderVal[1]})
    }

    const handleChange = (name: string, iValue: number) => {
        switch (name) {
            case 'min': 
                const minMin: number = iValue >= max ? max-1: iValue < min ? min : iValue
                const minMax: number = value.max <= iValue ? minMin + 1 : value.max
                setValue({min: minMin, max: minMax})
                // setCurrentVal({min: minMin, max: minMax})
                break
            case 'max':
                const maxMax: number = iValue <= min ? min+1 : iValue > max ? max : iValue
                const maxMin: number = value.min >= iValue ? maxMax - 1 : value.min
                setValue({min: maxMin, max: maxMax})
                // setCurrentVal({min: maxMin, max: maxMax})
                break
            default:
        }
    }

    const handlekeyPress = (e: any) => {
        if (e.key === 'Enter') {
            e.target.name === 'min' && handleChange(e.target.name, Number(currentVal.min))
            e.target.name === 'max' && handleChange(e.target.name, Number(currentVal.max))
        }
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>{title}</h3>
            <Slider min={min} max={max} getAriaLabel={() => label} value={currentSliderVal} onChange={handleChangeSlider} onChangeCommitted={handleChangeCommitedSlider}/>
            <div className={styles.counts}>
                <input className={styles.input} type="number" name="min" id="min" value={currentVal.min} onChange={e => setCurrentVal(prev => {return {min: e.target.value, max: prev.max}})} onBlur={() => handleChange('min', Number(currentVal.min))} onKeyDown={handlekeyPress}/>
                <input className={styles.input} type="number" name="max" id="max" value={currentVal.max} onChange={e => setCurrentVal(prev => {return {min: prev.min, max: e.target.value}})} onBlur={() => handleChange('max', Number(currentVal.max))} onKeyDown={handlekeyPress}/>
            </div>
        </div>
    )
}
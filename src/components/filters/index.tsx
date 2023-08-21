import styles from './styles.module.scss'
import CustomSlider from '../filter/slider'
import { Dispatch, SetStateAction, useState } from 'react'
import { FiltersInterface, PriceInterface } from '@/types/filter'
import { FiltersNameEnum } from '@/types/filter'
import { compareObjects } from '@/utils/compare'

export default function Filters({filters, newFilters, setNewFilters, update, appliedFilters, resetFilters}: {filters: FiltersInterface | null, newFilters: FiltersInterface | null, setNewFilters: Dispatch<SetStateAction<FiltersInterface | null>>, update: any, appliedFilters: FiltersInterface | null, resetFilters: any}) {

    const newFilterComparison = compareObjects(newFilters, appliedFilters)
    const filterComparison = compareObjects(filters, appliedFilters)

    // console.log('filters', filters)
    // console.log('appliedFilters', appliedFilters)

    // console.log('newFilterComparison', newFilterComparison)
    // console.log('filterComparison', filterComparison)
    // console.log('newFilters', newFilters)
    // console.log('appliedFilters', appliedFilters)
    // console.log('filters', filters)


    return (
        <div className={styles.container}>
            {filters && newFilters ?
            <>
                {newFilters.price && <CustomSlider title='Цена' min={filters.price.min} max={filters.price.max} label={FiltersNameEnum.price} value={newFilters.price} setNewFilters={setNewFilters} />}

                {/* {!newFilterComparison && <button className={[styles.filterBtn, !newFilterComparison && styles.active].join(' ')} onClick={() => update()}>Применить фильтр</button>}
                {!filterComparison && <button className={[styles.filterBtn, !filterComparison && styles.active].join(' ')} onClick={() => resetFilters()}>Сбросить фильтр</button>} */}
                <button className={[styles.filterBtn, !newFilterComparison && styles.active].join(' ')} onClick={() => !newFilterComparison && update()}>Применить фильтр</button>
                <button className={[styles.filterBtn, styles.resetBtn, !filterComparison && styles.active].join(' ')} onClick={() => !filterComparison && resetFilters()}>Сбросить фильтр</button>
            </>
            :
                <p className={styles.message}>Нет фильтров</p>
            }
        </div>
        // <div className={[styles.wrapper, filterTab && styles.active].join(' ')}>
        // </div>
    )
}
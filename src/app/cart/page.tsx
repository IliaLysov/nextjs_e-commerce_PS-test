import styles from './page.module.scss'
import { Items } from '@/components'
import { PlantOwnerTypeEnum } from '@/types/product'

export default function Cart() {

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <Items type={PlantOwnerTypeEnum.Cart}/>
        </div>
    )
}
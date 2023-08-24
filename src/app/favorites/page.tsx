import styles from './page.module.scss'
import { CatalogItems } from '@/components'
import { PlantOwnerTypeEnum } from '@/types/product'

export default function Favorites() {

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <CatalogItems type={PlantOwnerTypeEnum.Favorites}/>
        </div>
    )
}
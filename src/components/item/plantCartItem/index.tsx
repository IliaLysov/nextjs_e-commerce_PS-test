import styles from './styles.module.scss'


import RemoveFromCartSVG from '@/icons/RemoveFromCart.svg'
import LikeSVG from '@/icons/Like.svg'
import TreeSVG from '@/icons/Tree.svg'
import { PlantInterface } from '@/types/product'


export default function PlantCartItem({item, linkTo}: {item: PlantInterface, linkTo: (id: string) => null}) {

    return (
        <div className={styles.wrapper}>
            {item.images ? <img src={item.images[0].location} alt="plant" className={styles.image} onClick={() => linkTo(item._id)}/> : <TreeSVG className={styles.imagePlaceholder} />}
            <div className={styles.content}>
                <div className={styles.name} onClick={() => linkTo(item._id)}>{item.name}</div>
                <div className={styles.latinName}>{item.latinName}</div>
                <div className={styles.companyName}>{item.companyInfo.latinName}</div>
            </div>
            <div className={styles.side}>
                <div className={styles.topSide}>
                    <RemoveFromCartSVG className={styles.removeFromCart}/>
                    <LikeSVG className={styles.like}/>
                </div>
                <div className={styles.topSide}>
                    <div className={styles.count}>
                        
                    </div>
                    <div className={styles.price}></div>
                </div>
            </div>
        </div>
    )
}
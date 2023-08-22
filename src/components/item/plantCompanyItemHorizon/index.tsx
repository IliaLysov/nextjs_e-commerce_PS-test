import styles from './styles.module.scss'

export default function PlantCompanyItemHorizon({item, profile, linkTo}: {item: any, profile: any, linkTo: any}) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.orderInfo}>
                <div className={styles.price}>{`${item.price} ₽`}</div>
            </div>
            <div className={styles.side}>
                <div className={styles.imageWrapper}>
                    <img src={item.images[0].location} alt="plant" className={styles.image} onClick={() => linkTo(item)}/>
                    <div className={styles.companyLogoWrapper}>
                        <img src={item.companyInfo.logo} alt="comapny" className={styles.companyLogo} onClick={() => profile(item.companyInfo.latinName)}/>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.plantNames}>
                        <h2 className={styles.name} onClick={() => linkTo(item)}>{item.name}</h2>
                        <div className={styles.latinName}>{item.latinName}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
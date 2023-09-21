'use client'

import { useAppDispatch, useAppSelector } from '@/app/store'
import styles from './page.module.scss'
import { cartSelector, getOrderData, orderItemsSelector, pendingSelector } from '@/modules'
import { useEffect, useRef, useState } from 'react'
import { CartDBItemInterface, OrderItemInterface } from '@/types/cart'
import ArrowSVG from '@/icons/Arrow.svg'


export default function Order() {
    const dispatch = useAppDispatch()

    const pending = useAppSelector(pendingSelector)

    const orderItems = useAppSelector(orderItemsSelector)
    const cart = useAppSelector(cartSelector)

    useEffect(() => {
        if (cart.length > 0 && !pending) {    
            const isNotActual = cart.map((obj: CartDBItemInterface) => {
                const boolArr = orderItems.map((item: OrderItemInterface) => obj.productId === item.productId && obj.count === item.count)
                return !boolArr.includes(true)
            })
            const refresh = isNotActual.includes(true) || cart.length !== orderItems.length
            refresh && console.log('get if items')
            refresh && dispatch(getOrderData())
        }
    }, [cart])

    const [companies, setCompanies] = useState<string[]>([])
    
    
    useEffect(() => {
        if (orderItems.length !== 0) {
            const existCompanies = orderItems.map(item => item.companyName)
            setCompanies([...new Set(existCompanies)])
        }
    }, [orderItems])

    const tableRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeTable, setActiveTable] = useState<boolean[]>([])
    
    useEffect(() => {
        const newActiveTable = tableRefs.current.map(() => false)
        setActiveTable([...newActiveTable])

    }, [tableRefs])


    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <h1 className={styles.title}>Оформление заказа</h1>
            <p className={styles.description}>Заявки на покупку растений будут отправлены отдельно каждому питомнику. Их статус можно будет простмотреть в отделе заявок вашего профиля</p>
                {companies.map((company, index) => {
                    const companyItems = orderItems.filter(item => item.companyName === company)
                    const companyPrice = companyItems.reduce((acc, item) => {
                        return acc + item.price
                    }, 0)
                    return (
                        <div className={styles.tableWrapper} key={index}>
                            <div className={styles.tableTitle} onClick={() => {
                                const newActiveTable = activeTable;
                                newActiveTable[index] = !newActiveTable[index]
                                setActiveTable([...newActiveTable])
                            }}>
                                <ArrowSVG className={[styles.tableTitleArrow, activeTable[index] && styles.active].join(' ')} />
                                <div className={styles.tableTitleContainer}>
                                    <h2 className={styles.tableTitleText}>{company}</h2>
                                    <div className={styles.tableTitlePrice}>{`${companyPrice} ₽`}</div>
                                </div>
                            </div>
                            <div className={[styles.orderTableContainer, activeTable[index] && styles.active].join(' ')} style={activeTable[index] ? {height: tableRefs.current[index]?.offsetHeight} : {height: 0}}>
                                <table className={styles.orderTable} ref={(el) => (tableRefs.current[index] = el)}>
                                    <thead className={styles.orderTableHead}>
                                        <tr className={styles.orderTableHeadRow}>
                                            <th className={[styles.orderTableHeadItem, styles.orderTableName].join(' ')}>Имя</th>
                                            <th className={[styles.orderTableHeadItem, styles.orderTableCount].join(' ')}>Кол-во</th>
                                            <th className={[styles.orderTableHeadItem, styles.orderTablePrice].join(' ')}>Цена</th>
                                        </tr>
                                    </thead>
                                    <tbody className={styles.orderTableBody}>
                                        {companyItems.map((item, index) => {
                                            return (
                                                <tr key={index} className={styles.orderTableBodyRow}>
                                                    <td className={[styles.orderTableBodyItem, styles.orderTableBodyName].join(' ')}>{item.name}</td>
                                                    <td className={[styles.orderTableBodyItem, styles.orderTableBodyCount].join(' ')}>{item.count}</td>
                                                    <td className={[styles.orderTableBodyItem, styles.orderTableBodyPrice].join(' ')}>{`${item.price} ₽`}</td>
                                                </tr>
                                            )}
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}
            <button className={styles.sendBtn}>Отправить</button>
            <p className={styles.agreement}>Нажимая на кнопку отправить, вы соглашаетесь на передачу ваших контактных данныых третьим лицам</p>
        </div>
    )
}
'use client'

import styles from './page.module.scss'
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from '@/app/store'
import { CustomerOrdersSelector, TotalCustomerOrdersSelector, getCustomerOrders, getMoreCustomerOrders } from '@/modules'
import { OrderInterface, OrderStatusEnum, OrderStatusType } from '@/types/order'

import ArrowSVG from '@/icons/Arrow.svg'

export default function CompanyOrders() {
    const dispatch = useAppDispatch()

    const newOrders = useAppSelector(CustomerOrdersSelector)
    const total = useAppSelector(TotalCustomerOrdersSelector)

    const [status, setStatus] = useState<string>(OrderStatusEnum.pending)
    const [skip, setSkip] = useState<{[key: string]: number}>({
        [OrderStatusEnum.pending]: 0,
        [OrderStatusEnum.rejected]: 0,
        [OrderStatusEnum.resolved]: 0,
        [OrderStatusEnum.faked]: 0,
    })
    const [orders, setOrders] = useState<{[key: string]: OrderInterface[]}>({
        [OrderStatusEnum.pending]: [],
        [OrderStatusEnum.rejected]: [],
        [OrderStatusEnum.resolved]: [],
        [OrderStatusEnum.faked]: [],
    })
    
    useEffect(() => {
        dispatch(getCustomerOrders(status))
        const newSkip = skip
        newSkip[status] = 0
        setSkip(newSkip)
    }, [status])
    
    const [itemsStatus, setItemsStatus] = useState<{[key: string]: boolean[]}>({})
    const tableRefs = useRef<{[key: string]: (HTMLDivElement | null)[]}>({
        [OrderStatusEnum.pending]: [],
        [OrderStatusEnum.rejected]: [],
        [OrderStatusEnum.resolved]: [],
        [OrderStatusEnum.faked]: [],
    })

    useEffect(() => {
        if (newOrders[status].length > 0) {
            const itemsStatus = newOrders[status].map(() => false)
            setItemsStatus({[status]: itemsStatus})
        }
        setOrders({...orders, [status]: newOrders[status]})
    }, [newOrders[status]])

    const getMore = () => {
        const newSkip = skip
        newSkip[status] += 20
        dispatch(getMoreCustomerOrders({status, skip: newSkip[status]}))
        setSkip(newSkip)
    }

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <h1 className={styles.title}>Ваши заявки</h1>
            <div className={styles.tabs}>
                <div className={styles.tabContainer}>
                    <div className={[styles.tab, status === OrderStatusEnum.pending && styles.active].join(' ')} onClick={() => {
                        setStatus(OrderStatusEnum.pending)
                    }}>В ожидании</div>
                    <div className={[styles.tab, status === OrderStatusEnum.rejected && styles.active].join(' ')} onClick={() => {
                        setStatus(OrderStatusEnum.rejected)
                    }}>Отклоненные</div>
                </div>
                <div className={styles.tabContainer}>
                    <div className={[styles.tab, status === OrderStatusEnum.resolved && styles.active].join(' ')} onClick={() => {
                        setStatus(OrderStatusEnum.resolved)
                    }}>Выполненные</div>
                    <div className={[styles.tab, status === OrderStatusEnum.faked && styles.active].join(' ')} onClick={() => {
                        setStatus(OrderStatusEnum.faked)
                    }}>Фейковые</div>
                </div>
            </div>
            <div className={styles.tables}>
                {
                    itemsStatus[status] && orders[status].map((order, idx) => {
                        const date = new Date(order.createdAt)
                        return (
                            <div className={styles.tableWrapper} key={idx}>
                                <div className={styles.tableTitle} onClick={() => {
                                    const newItemsStatus = itemsStatus
                                    newItemsStatus[status][idx] = !newItemsStatus[status][idx]
                                    setItemsStatus({...newItemsStatus})
                                }}>
                                    <ArrowSVG className={[styles.tableTitleArrow, itemsStatus[status][idx] && styles.active].join(' ')} />
                                    <div className={styles.tableTitleContainer}>
                                        <div className={styles.tableTitleTextContainer}>
                                            <h2 className={styles.tableTitleText}>{order.companyName}</h2>
                                            <div className={styles.tableTitleDate}>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes()}`}</div>
                                        </div>
                                        <div className={styles.tableTitlePrice}>{`${order.totalPrice} ₽`}</div>
                                    </div>
                                </div>
                                <div className={[styles.orderTableContainer, itemsStatus[status][idx] && styles.active].join(' ')} style={itemsStatus[status][idx] ? {height: tableRefs.current[status][idx]?.offsetHeight} : {height: 0}}>
                                    <table className={styles.orderTable} ref={(el) => (tableRefs.current[status][idx] = el)}>
                                        <thead className={styles.orderTableHead}>
                                            <tr className={styles.orderTableHeadRow}>
                                                <th className={[styles.orderTableHeadItem, styles.orderTableName].join(' ')}>Имя</th>
                                                <th className={[styles.orderTableHeadItem, styles.orderTableCount].join(' ')}>Кол-во</th>
                                                <th className={[styles.orderTableHeadItem, styles.orderTablePrice].join(' ')}>Цена</th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.orderTableBody}>
                                            {orders[status][idx].products.map((item, idx) => {
                                                return (
                                                    <tr className={styles.orderTableBodyRow} key={idx}>
                                                        <td className={[styles.orderTableBodyItem, styles.orderTableBodyName].join(' ')}>{item.name}</td>
                                                        <td className={[styles.orderTableBodyItem, styles.orderTableBodyCount].join(' ')}>{item.count}</td>
                                                        <td className={[styles.orderTableBodyItem, styles.orderTableBodyPrice].join(' ')}>{item.price}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {orders[status].length === 0 && <div className={styles.empty}>Заявок нет</div>}
            {orders[status].length !== total[status] && <div className={styles.loadMore} onClick={() => getMore()}>Загрузить ещё</div>}
            {orders[status].length > 0 && <div className={styles.total}>Всего заявок: {total[status]}, отображается {orders[status].length}</div>}
        </div>
    )
}
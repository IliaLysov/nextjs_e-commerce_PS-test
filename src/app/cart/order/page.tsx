'use client'

import { useAppDispatch, useAppSelector } from '@/app/store'
import styles from './page.module.scss'
import { cartSelector, getOrderData, orderItemsSelector, orderStatusSelector, pendingSelector, sendOrder, setOrderItems, setOrderStatus } from '@/modules'
import { useEffect, useRef, useState } from 'react'
import { CartDBItemInterface, OrderItemInterface } from '@/types/cart'
import ArrowSVG from '@/icons/Arrow.svg'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputField } from '@/components/formik'
import { useRouter } from 'next/navigation'

export default function Order() {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const pending = useAppSelector(pendingSelector)

    const orderItems = useAppSelector(orderItemsSelector)
    const cart = useAppSelector(cartSelector)
    const orderStatus = useAppSelector(orderStatusSelector)
    
    const [companies, setCompanies] = useState<string[]>([])

    useEffect(() => {
        const isNotActual = cart.map((obj: CartDBItemInterface) => {
            const boolArr = orderItems.map((item: OrderItemInterface) => obj.productId === item.productId && obj.count === item.count)
            return !boolArr.includes(true)
        })
        const refresh = isNotActual.includes(true) || cart.length !== orderItems.length
        if (!pending) {
            cart.length === 0 && orderStatus === 'not started' && router.push('/cart')
            if (refresh) {
                dispatch(setOrderStatus('not started'))
                if (cart.length > 0) {
                    refresh && console.log('get if items')
                    refresh && dispatch(getOrderData())
                } else {
                    dispatch(setOrderItems([]))
                }
            }
        }
    }, [cart])

    
    useEffect(() => {
        if (orderItems.length !== 0) {
            const existCompanies = orderItems.map(item => item.companyName)
            setCompanies([...new Set(existCompanies)])
        } else {
            setCompanies([])
        }
    }, [orderItems])

    const tableRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeTable, setActiveTable] = useState<boolean[]>([])
    
    useEffect(() => {
        const newActiveTable = tableRefs.current.map(() => false)
        setActiveTable([...newActiveTable])

    }, [tableRefs])

    const handleOrder = (data: any) => {
        dispatch(sendOrder(data))
    }

    const contactsSchema = Yup.object().shape({
        address: Yup.string()
            .min(1, 'Слишком короткий адрес')
            .max(60, 'Слишком длинный адрес'),
        phone: Yup.string()
            .min(1, 'Слишком короткий номер')
            .max(40, 'Слишком длинный номер'),
        whatsapp: Yup.string()
            .min(1, 'Слишком короткий номер')
            .max(40, 'Слишком длинный номер'),
        telegram: Yup.string()
            .min(1, 'Слишком короткий никнейм')
    })


    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <h1 className={styles.title}>Оформление заказа</h1>
            {
                orderStatus === 'not started'
                ?
                <>
                    <p className={styles.description}>Заявки на покупку растений будут отправлены отдельно каждому питомнику. Их статус можно будет просмотреть в отделе заявок вашего профиля.</p>
                    <div className={styles.tables}>
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
                    </div>
                    <Formik
                        onSubmit={(handleOrder)}
                        initialValues={{
                            address: '',
                            phone: '',
                            whatsapp: '',
                            telegram: ''
                        }}
                        validationSchema={contactsSchema}
                    >
                        {({handleSubmit, setFieldValue, values}) => {
                            return (
                                <Form onSubmit={handleSubmit} className={styles.form}>
                                    <h3 className={styles.formTitle}>Контактные данные</h3>
                                    <p className={styles.contactDescription}>В данной форме вы можете оставить свои дополнительные контактные данные по которым менеджер питомника сможет с вами звязаться. Email будет отправлен автоматически.</p>
                                    <div className={styles.formContainer}>
                                        <div className={styles.formInputHorizon}>
                                            <InputField name='phone' label='Телефон' type='text' value={values.phone} setFieldValue={setFieldValue} />
                                            <InputField name='whatsapp' label='WhatsApp' type='text' value={values.whatsapp} setFieldValue={setFieldValue} />
                                            <InputField name='telegram' label='Telegram' type='text' value={values.telegram} setFieldValue={setFieldValue} />
                                        </div>
                                        <InputField name='address' label='Адрес доставки' type='text' value={values.address} setFieldValue={setFieldValue} multiline rows={2}/>
                                    </div>
                                    <button className={styles.sendBtn} type='submit'>Отправить заказ</button>
                                    <p className={styles.contactDescription}>Нажимая на кнопку отправить, вы соглашаетесь на передачу ваших контактных данных третьим лицам.</p>
                                </Form>
                            )
                        }}
                    </Formik>
                </>
                :
                orderStatus === 'pending'
                ?
                <p className={styles.success}>Отправка</p>
                :
                orderStatus === 'success'
                ?
                <p className={styles.success}>Заказ успешно отправлен</p>
                :
                orderStatus === 'error'
                &&
                <p className={styles.success}>Произошла ошибка отправки</p>
            }
        </div>
    )
}
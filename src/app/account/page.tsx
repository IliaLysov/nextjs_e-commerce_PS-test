'use client'

import styles from './page.module.scss'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import { useAppDispatch, useAppSelector } from "../store"
import { setModal } from "@/modules"

import Link from 'next/link'
import { ModalTypeEnum } from '@/types/modal'


export default function Account() {
    const dispatch = useAppDispatch()
    const {data: session} = useSession()

    const ownCompany = session?.company

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <div className={styles.items}>
                {!ownCompany?.approved && <div className={[styles.item, ownCompany && styles.blocked].join(' ')} onClick={() => !ownCompany && dispatch(setModal({type: ModalTypeEnum.CompanyRegistration}))}>
                    <h3 className={styles.itemTitle}>Регистрация питомника</h3>
                    <p className={styles.itemDescripton}>Выкладывать растения на продажу в каталог возможно только через профиль питомника</p>
                    {ownCompany && <p className={[styles.itemDescripton, styles.blocked].join(' ')}>{`Ваша заявка на регистрацию питомника ${ownCompany?.name} находится на рассмотрении`}</p>}
                </div>}
                {ownCompany && <Link href={ownCompany.approved ? '/account/company/products' : {}} className={[styles.item, !ownCompany.approved && styles.blocked].join(' ')}>
                    <h3 className={styles.itemTitle}>{`Растения питомника ${ownCompany.name}`}</h3>
                    <p className={styles.itemDescripton}>Добавление, редакирование, удаление товаров</p>
                    {!ownCompany.approved && <p className={[styles.itemDescripton, styles.blocked].join(' ')}>{`Доступ откроется после завершения регистрации питомника ${ownCompany?.name}`}</p>}
                </Link>}
                {ownCompany && <Link href={ownCompany.approved ? '/account/company' : {}} className={[styles.item, !ownCompany.approved && styles.blocked].join(' ')}>
                    <h3 className={styles.itemTitle}>{`Профиль питомника ${ownCompany.name}`}</h3>
                    <p className={styles.itemDescripton}>Редактирование информации о питомнике</p>
                    {!ownCompany.approved && <p className={[styles.itemDescripton, styles.blocked].join(' ')}>{`Доступ откроется после завершения регистрации питомника ${ownCompany?.name}`}</p>}
                </Link>}
            </div>
        </div>
    )
}
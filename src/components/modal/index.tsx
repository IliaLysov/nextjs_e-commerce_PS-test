'use client'

import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from "@/app/store"
import { modalSelector, setModal } from "@/modules"
import { ModalTypeEnum } from "@/types/modal"
import { useEffect } from 'react'
import CompanyForm from './companyForm'
import PlantForm from './plantForm'
import CrossSVG from '@/icons/Cross.svg'


export default function ModalWindow() {
    const dispatch = useAppDispatch()
    const modal = useAppSelector(modalSelector)

    const modalHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modal?.type !== ModalTypeEnum.Loading) {
            dispatch(setModal(null))
        }
    }


    const content = () => {
        switch (modal?.type) {
            case ModalTypeEnum.Loading:
                return <div>Загрузка...</div>
            case ModalTypeEnum.CompanyRegistration:
                return <CompanyForm/>
            case ModalTypeEnum.PlantForm:
                return <PlantForm currentItem={modal.data}/>
            default:
                return null
        }
    }

    useEffect(() => {
        const html = document.querySelector('html')
        if (modal) {
          html && (html.style.overflow = 'hidden')
        } else {
          html && (html.style.overflow = '')
        }
      }, [modal])

    return (modal &&
        <div className={styles.wrapper} onClick={modalHandler}>
            <div className={styles.content} onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}>
                <CrossSVG className={styles.cross} onClick={modalHandler}/>
                {content()}
            </div>
        </div>
    )
}
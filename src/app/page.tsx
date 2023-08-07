'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useAppSelector } from './store'
import { companySelector } from '@/modules'

export default function Home() {

  const company = useAppSelector(companySelector)

  console.log('company', company)

  return (
    <div>Главная страница</div>
  )
}

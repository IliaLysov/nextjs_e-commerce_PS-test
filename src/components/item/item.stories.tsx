import { Meta, StoryObj } from "@storybook/react";
// import useState from 'storybook-addon-state'
import '@/app/font.scss'
import '@/app/globals.scss'
import {useState} from 'react'

import {PlantCatalogItemTile, PlantCatalogItemHorizon, PlantCompanyItemTile, PlantCompanyItemHorizon} from "."

const meta: Meta<typeof PlantCatalogItemTile> = {
    title: 'Item',
    component: PlantCatalogItemTile
}

export default meta

const item = {
    name: 'Стрелеция Николая',
    latinName: 'Strelecia Nicolay',
    price: 4530,
    onSale: true,
    companyId: 'asjldkfj324lk2j3aklsdjf',
    companyInfo: {
        latinName: 'Gardener',
        logo: 'https://plant-store.storage.yandexcloud.net/companyLogo/da6b7e38-4c60-48fe-b085-dac22d79c29b.jpg'
    },
    images: [
        {
            location: 'https://plant-store.storage.yandexcloud.net/plantsImages/69c3d0eb-6c33-48f0-95f6-c229e0a0f543.jpg',
            key: 'plantsImages/69c3d0eb-6c33-48f0-95f6-c229e0a0f543.jpg'
        }
    ]
}

export const catalogItemTile = () => {
    const [inCart, setInCart] = useState(false)
    const [isFavirite, setFavorite] = useState(false)

    return (
        <PlantCatalogItemTile item={item} profile={() => null} handleCart={(item: any) => setInCart(prev => !prev)} inCart={inCart} handleFavorite={(item: any) => setFavorite(prev => !prev)} inFavorite={isFavirite} linkTo={false}/>
    )
}

export const catalogItemHorizon = () => {
    const [inCart, setInCart] = useState(false)
    const [isFavirite, setFavorite] = useState(false)

    return (
        <PlantCatalogItemHorizon item={item} profile={() => null} handleCart={(item: any) => setInCart(prev => !prev)} inCart={inCart} handleFavorite={(item: any) => setFavorite(prev => !prev)} inFavorite={isFavirite} linkTo={false}/>
    )
}

export const companyItemTile = () => {

    return (
        <PlantCompanyItemHorizon item={item} profile={() => null} linkTo={null}/>
    )
}

export const companyItemHorizon = () => {

    return (
        <PlantCompanyItemTile item={item} profile={() => null} linkTo={null}/>
    )
}
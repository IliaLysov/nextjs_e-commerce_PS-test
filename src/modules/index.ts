import { combineReducers } from "redux"
import company from './company'
import ui from './ui'
import product from './product'
import cart from './cart'
import favorites from './favorites'
import catalog from './catalog'
import orders from './orders'

export * from './company'
export * from './ui'
export * from './product'
export * from './cart'
export * from './favorites'
export * from './catalog'
export * from './orders'

export default combineReducers({
    company,
    ui,
    product,
    cart,
    favorites,
    catalog,
    orders,
})
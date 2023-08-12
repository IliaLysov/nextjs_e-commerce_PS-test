import { combineReducers } from "redux"
import company from './company'
import ui from './ui'
import product from './product'
import cart from './cart'
import favorites from './favorites'

export * from './company'
export * from './ui'
export * from './product'
export * from './cart'
export * from './favorites'

export default combineReducers({
    company,
    ui,
    product,
    cart,
    favorites
})
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { homeReducer } from './home/reducer'
import { catalogReducer } from './catalog/reducer'
import { userReducer } from './user/reducer'
import { bookReducer } from './book/reducer'
import { ordersReducer } from './order/reducer'
import { cartReducer } from './cart/reducer'
import { searchReducer } from './search/reducer'

export const createRootReducer = history =>
    combineReducers({
        home: homeReducer,
        catalog: catalogReducer,
        user: userReducer,
        book: bookReducer,
        orders: ordersReducer,
        cart: cartReducer,
        search: searchReducer,
        router: connectRouter(history),
    })

import { initialState as home } from './home/reducer'
import { initialState as catalog } from './catalog/reducer'
import { initialState as user } from './user/reducer'
import { initialState as book } from './book/reducer'
import { initialState as orders } from './order/reducer'
import { initialState as cart } from './cart/reducer'
import { initialState as search } from './search/reducer'

export const getInitialState = (pathname = '/') => {
    return {
        home,
        catalog,
        user,
        book,
        orders,
        cart,
        search,
        router: {
            location: { pathname, search: '', hash: '', key: '' },
            action: 'POP',
        },
    }
}

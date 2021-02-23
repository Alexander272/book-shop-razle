import { fork, all } from 'redux-saga/effects'

import { homeSaga } from './home/saga'
import { catalogSaga } from './catalog/saga'
import { userSaga } from './user/saga'
import { bookSaga } from './book/saga'
import { ordersSaga } from './order/saga'
import { cartSaga } from './cart/saga'
import { searchSaga } from './search/saga'

export default function* rootSaga() {
    yield all([
        fork(homeSaga),
        fork(catalogSaga),
        fork(userSaga),
        fork(bookSaga),
        fork(ordersSaga),
        fork(cartSaga),
        fork(searchSaga),
    ])
}

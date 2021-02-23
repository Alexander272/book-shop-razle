import { fetchBooks } from './store/catalog/actions'
import { fetchBook } from './store/book/actions'
import { fetchOrders } from './store/order/actions'
import { fetchAllBooks } from './store/home/actions'

import HomePage from './pages/home'
import CatalogPage from './pages/catalog'
import SearchPage from './pages/seacrh'
import AuthPage from './pages/auth'
import ResetPage from './pages/reset'
import BookPage from './pages/book/index'
import ContactPage from './pages/contacts'
import ProfilePage from './pages/profile'
import OrdersPage from './pages/orders'
import CartPage from './pages/cart'
import NotFoundPage from './pages/404'

import AdminStatistics from './pages/admin/index'
import AdminAddBooks from './pages/admin/add/index'
import AdminBooks from './pages/admin/edit/index'
import AdminEditBook from './pages/admin/edit/edit'
import AdminGenres from './pages/admin/genres/index'
import AdminAddGenre from './pages/admin/genres/add'
import AdminEditGenre from './pages/admin/genres/edit'
import AdminUser from './pages/admin/users/index'
import AdminAllUser from './pages/admin/users/all'
import AdminAddUser from './pages/admin/users/add'
import AdminEditUser from './pages/admin/users/edit'

const routes = [
    {
        path: '/',
        component: HomePage,
        exact: true,
        fetchData({ dispatch }) {
            dispatch(fetchAllBooks())
        },
    },
    {
        path: '/books/:slug',
        component: CatalogPage,
        exact: true,
        fetchData({ dispatch, match }) {
            dispatch(fetchBooks(match.params.slug))
        },
    },
    {
        path: '/search',
        component: SearchPage,
        exact: true,
    },
    {
        path: '/auth',
        component: AuthPage,
        exact: true,
    },
    {
        path: '/auth/reset',
        component: ResetPage,
        exact: true,
    },
    {
        path: '/auth/reset/:reset',
        component: ResetPage,
    },
    {
        path: '/book/:id',
        component: BookPage,
        fetchData({ dispatch, match }) {
            dispatch(fetchBook(match.params.id))
        },
    },
    {
        path: '/contacts',
        component: ContactPage,
        exact: true,
    },
    {
        path: '/cart',
        component: CartPage,
        exact: true,
    },
    {
        path: '*',
        component: NotFoundPage,
        exact: true,
    },
]

const authRoutes = [
    {
        path: '/orders',
        component: OrdersPage,
        exact: true,
        fetchData({ dispatch }) {
            dispatch(fetchOrders())
        },
    },
    {
        path: '/profile',
        component: ProfilePage,
        exact: true,
    },
]

const adminRoutes = [
    {
        path: '/admin/users',
        component: AdminUser,
        exact: true,
    },
    {
        path: '/admin/users/all',
        component: AdminAllUser,
        exact: true,
    },
    {
        path: '/admin/users/add',
        component: AdminAddUser,
        exact: true,
    },
    {
        path: '/admin/users/:id',
        component: AdminEditUser,
        exact: true,
    },
]

const editorRoutes = [
    {
        path: '/admin',
        component: AdminStatistics,
        exact: true,
    },
    {
        path: '/admin/add',
        component: AdminAddBooks,
        exact: true,
    },
    {
        path: '/admin/edit',
        component: AdminBooks,
        exact: true,
    },
    {
        path: '/admin/edit/:id',
        component: AdminEditBook,
        exact: true,
    },
    {
        path: '/admin/genres',
        component: AdminGenres,
        exact: true,
    },
    {
        path: '/admin/genres/add',
        component: AdminAddGenre,
        exact: true,
    },
    {
        path: '/admin/genres/:id',
        component: AdminEditGenre,
        exact: true,
    },
]

export function useRoutes(role) {
    let resultRoutes = routes
    if (role === 'user') {
        resultRoutes = authRoutes.concat(routes)
    } else if (role === 'editor') {
        resultRoutes = [...editorRoutes, ...authRoutes, ...routes]
    } else if (role === 'admin' || role === 'owner') {
        resultRoutes = [...adminRoutes, ...editorRoutes, ...authRoutes, ...routes]
    }
    return resultRoutes
}

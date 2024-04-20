import AdminPage from "../pages/AdminPage/AdminPage";
import Homepage from "../pages/Homepage/Homepage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/Orderpage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";

import Productspage from "../pages/Productspage/Productspage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import PriceProductPage from "../pages/PriceProductPage/PriceProductPage";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import GenderProductPage from "../pages/GenderProductPage/GenderProductPage";
import FashionProductPage from "../pages/FashionProductPage/FashionProductPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import MyLovePro from "../pages/MyLovePro/MyLovePro";


export const routes = [
    {
        path: '/',
        page: Homepage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: '/products',
        page: Productspage,
        isShowHeader: true

    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true

    },
    {
        path: '/product-price/:fprice',
        page: PriceProductPage,
        isShowHeader: true

    },
    {
        path: '/product-gender/:gender',
        page: GenderProductPage,
        isShowHeader: true

    },
    {
        path: '/product-fashion/:fashion',
        page: FashionProductPage,
        isShowHeader: true

    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false

    },
    {
        path: '/forgot-password',
        page: ForgotPassword,
        isShowHeader: false

    },
    {
        path: '/change-password',
        page: ChangePassword,
        isShowHeader: false

    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false

    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true

    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true

    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true

    },
    {
        path: '/contact',
        page: ContactPage,
        isShowHeader: true,

    },
    {
        path: '/my-lovePro',
        page: MyLovePro,
        isShowHeader: true,

    },
    {
        path: '*',
        page: NotFoundPage

    }
]
import { Route, Routes } from 'react-router-dom';
import Cart from './cart_main/Cart';
import CartPayment from './cart_payment/CartPayment';
import CartCreditCard from './cart_creditCard/CartCreditCard';
import CartNonepay from './cart_nonepay/CartNonepay';
import CartPaymentLinepayCheck from './cart_payment_linepayCheck/CartPaymentLinepayCheck';
import CartSuccess from './cart_success/CartSuccess';

function CartMain() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Cart />} />
                <Route path="/payment" element={<CartPayment />} />
                <Route path="/creditcard" element={<CartCreditCard />} />
                <Route path="/nonepay" element={<CartNonepay />} />
                <Route
                    path="/linepaycheck"
                    element={<CartPaymentLinepayCheck />}
                />
                <Route path="/success" element={<CartSuccess />} />
            </Routes>
        </>
    );
}

export default CartMain;

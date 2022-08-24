import CartCountContextProvider from './component/ben/cart_count/CartCountContextProvider';
import AuthContextProvider from './component/bob/component/authContextProvider';

function ProviderContainer({ children }) {
    return (
        <AuthContextProvider>
            <CartCountContextProvider>{children}</CartCountContextProvider>
        </AuthContextProvider>
    );
}

export default ProviderContainer;

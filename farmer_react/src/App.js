import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
// import Nav from './component/Navbar/Nav';
import Navbar from './page/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Container from './Container';
import MyMap from './component/pin/Company_map/MyMap';
import ProviderContainer from './ProviderContainer';
import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';
import ProductList from './page/ProductList';
import store from './store';
import Product from './page/Product';
import Member from './component/bob/App';
import FarmerFirstPage from './component/kawa/FarmerFirstPage/FarmerFirstPage';
import CustomerComment from './component/kawa/CustomerComment/CustomerComment';
import CreateComment from './component/kawa/CustomerComment/CreateComment/CreateComment';
import CustomizedLunch from './component/xin/Customized_lunch/CustomizedLunch';
import ChatMain from './component/xin/Customized_service/ChatMain';

import RecipeMain from './component/hsieh/App';
import Eachrecipe from './component/hsieh/Eachrecipe/Eachrecipe';
import Createrecipe from './component/hsieh/Createrecipe/Createrecipe';
import Updaterecipe from './component/hsieh/Createrecipe/Updaterecipe';
import GameMain from './component/po/game/gameMain';
import CartMain from './component/ben/App';
import Activity from './component/pin/Activity/Activity';
import ActivityData from './component/pin/ActivityData/activitydata';

import { io } from 'socket.io-client';
const socket = io('http://localhost:3600');

function App() {
    return (
        <>
            <Provider store={store}>
                <IconContext.Provider value={{ className: 'react_icons' }}>
                    <BrowserRouter>
                        <ProviderContainer>
                            <Navbar />
                            <Container>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<FarmerFirstPage />}
                                    />
                                    <Route
                                        path="/comment"
                                        element={<CustomerComment />}
                                    />
                                    <Route
                                        path="/createcomment"
                                        element={<CreateComment />}
                                    />
                                    {/* 慧敏 */}

                                    <Route
                                        path="/recipe/*"
                                        element={<RecipeMain />}
                                    />
                                    <Route
                                        path="/recipe/each/:recipes_sid"
                                        element={<Eachrecipe />}
                                    />
                                    <Route
                                        path="/recipe/Createrecipe"
                                        element={<Createrecipe />}
                                    />
                                    <Route
                                        path="/recipe/updaterecipe/:recipes_sid"
                                        element={<Updaterecipe />}
                                    />

                                    {/* 宸睿 */}

                                    <Route
                                        path="/product"
                                        element={<ProductList />}
                                    />
                                    <Route
                                        path="/product/:sid"
                                        element={<Product />}
                                    />
                                    {/* 昱蓉 */}

                                    <Route
                                        path="/member/*"
                                        element={<Member />}
                                    />
                                    {/* 柏安 */}

                                    <Route
                                        path="/cart/*"
                                        element={<CartMain />}
                                    />
                                    {/* 宗佑 */}

                                    <Route
                                        path="/customized_lunch"
                                        element={<CustomizedLunch />}
                                    />
                                    <Route
                                        path="/customer_server"
                                        element={<ChatMain socket={socket} />}
                                    />
                                    {/* 阿鑫 */}

                                    <Route
                                        path="/game/*"
                                        element={<GameMain />}
                                    />
                                    {/* po */}
                                    <Route
                                        path="/activity"
                                        element={<Activity />}
                                    />
                                    <Route
                                        path="/activity/:sid"
                                        element={<ActivityData />}
                                    />
                                    <Route path="/mymap" element={<MyMap />} />
                                    {/* pin */}
                                </Routes>
                            </Container>
                            <Footer />
                        </ProviderContainer>
                        {/* <Route path="/company" element={<CompanyLogin />} /> */}
                    </BrowserRouter>
                </IconContext.Provider>
            </Provider>
        </>
    );
}

export default App;

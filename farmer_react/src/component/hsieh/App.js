import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recipesearch from './Recipesearch/Recipesearch';
import Eachrecipe from './Eachrecipe/Eachrecipe';
import Createrecipe from './Createrecipe/Createrecipe';
import Popup from './Recipesearch/Popup';
import Updaterecipe from './Createrecipe/Updaterecipe';
import ScrollToTop from './ScrollToTop';

function RecipeMain() {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Recipesearch />} />
                    <Route path="/popup" element={<Popup />} />
                    <Route
                        path="/recipe/each/:recipes_sid"
                        element={<Eachrecipe />}
                    />
                    <Route path="/createrecipe" element={<Createrecipe />} />
                    <Route
                        path="/updaterecipe/:sid"
                        element={<Updaterecipe />}
                    />
                    {/* 宸睿 */}
                </Routes>
            </ScrollToTop>
        </>
    );
}

export default RecipeMain;

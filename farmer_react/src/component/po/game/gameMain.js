import Dailypoint from './Dailypoint/Dailypoint';
// import ChangeTab from './components/ChangeTab'
import { Routes, Route } from 'react-router-dom';

function GameMain() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dailypoint />}>
                    {/* <Route path='/' element={ <ChangeTab /> }> */}
                </Route>
            </Routes>
        </>
    );
}

export default GameMain;

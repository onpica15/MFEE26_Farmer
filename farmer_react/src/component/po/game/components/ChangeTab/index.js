import Game from '../Game/Game';
import Coupon from '../Coupon';
import ChangeRecord from '../ChangeRecord/ChangeRecord';

// your-app.js

function ChangeTab(props) {
    //解構
    const { info, eggpoints, setEggPoints } = props;

    if (info === 0) {
        return (
            <>
                <Coupon eggpoints={eggpoints} setEggPoints={setEggPoints} />
            </>
        );
    }
    if (info === 1) {
        return (
            <>
                <ChangeRecord />
            </>
        );
    }
    if (info === 2) {
        return (
            <>
                <Game eggpoints={eggpoints} setEggPoints={setEggPoints} />
            </>
        );
    }
}
export default ChangeTab;

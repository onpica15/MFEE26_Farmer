// import Game from '../Game/Game';
// import Coupon from '../Coupon';
// import ChangeRecord from '../ChangeRecord/ChangeRecord';
// import Comment from '../Comment/Comment';
import CreateComment from '../CreateComment/CreateComment';
import ShowStarAll from '../Comment/ShowStarAll/ShowStarAll';
import ShowStarOne from '../Comment/ShowStarOne/ShowStarOne';

//這邊是要引用頁籤的檔案，就是頁籤下面顯示的內容

// your-app.js

function ChangeTab(props) {
    //解構
    const { info } = props;

    if (info === 0) {
        return (
            <>
                <ShowStarAll />
            </>
        );
    }
    if (info === 1) {
        return (
            <>
                <ShowStarAll />
            </>
        );
    }
    if (info === 2) {
        return (
            <>
                <ShowStarAll />
            </>
        );
    }
    if (info === 3) {
        return (
            <>
                <ShowStarAll />
            </>
        );
    }
    if (info === 4) {
        return (
            <>
                <ShowStarAll />
            </>
        );
    }
    if (info === 5) {
        return (
            <>
                <ShowStarOne />
            </>
        );
    }
    // if (info === 2) {
    //     return (
    //         <>
    //             <Game eggpoints={eggpoints} setEggPoints={setEggPoints} />
    //         </>
    //     );
    // }
}
export default ChangeTab;

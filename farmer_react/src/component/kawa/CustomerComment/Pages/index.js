import styles from './pages.module.css';
import clsx from 'clsx';
import ChangeTab from '../ChangeTab';

function Pages(props) {
    const { eggpoints, info, setInfo, setEggPoints } = props;
    // const Swal = require('sweetalert2');
    // 這是遊戲的提示小窗

    return (
        <>
            <div className={styles.tabWrap}>
                <div
                    className={clsx(styles.tab, {
                        [styles.active]: info === 0,
                    })}
                    onClick={() => {
                        setInfo(0);
                    }}
                >
                    <p>全部</p>
                </div>
                <div
                    className={clsx(styles.tab, {
                        [styles.active]: info === 1,
                    })}
                    onClick={() => {
                        setInfo(1);
                    }}
                >
                    <p>5顆星</p>
                </div>
                <div
                    className={clsx(styles.tab, {
                        [styles.active]: info === 2,
                    })}
                    onClick={() => {
                        setInfo(2);
                    }}
                >
                    <p>4顆星</p>
                </div>
                <div
                    className={clsx(styles.tab, {
                        [styles.active]: info === 3,
                    })}
                    onClick={() => {
                        setInfo(3);
                    }}
                >
                    <p>3顆星</p>
                </div>
                <div
                    className={clsx(styles.tab, {
                        [styles.active]: info === 4,
                    })}
                    onClick={() => {
                        setInfo(4);
                    }}
                >
                    <p>2顆星</p>
                </div>
                <div
                    className={clsx(styles.tab, {
                        [styles.active]: info === 5,
                    })}
                    onClick={() => {
                        setInfo(5);
                    }}
                >
                    <p>1顆星</p>
                </div>
                {/* <div
                    className={clsx(styles.tab, {
                        [styles.active]: info === 2,
                    })}
                    onClick={() => {
                        setInfo(2);
                        Swal.fire({
                            title: '遊戲說明',
                            text: '您有5次翻牌機會,每翻牌成功一次獲得兩點',
                            icon: 'info',
                            confirmButtonText: '遊戲開始',
                        });
                    }}
                >
                    <p>5顆星</p>
                </div> */}
            </div>
            <div>
                <ChangeTab
                    info={info}
                    eggpoints={eggpoints}
                    setEggPoints={setEggPoints}
                />
            </div>
        </>
    );
}
export default Pages;

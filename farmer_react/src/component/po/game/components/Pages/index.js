import styles from './pages.module.css';
import clsx from 'clsx';
import ChangeTab from '../ChangeTab';

function Pages(props) {
    const { eggpoints, info, setInfo, setEggPoints } = props;
    const Swal = require('sweetalert2');

    return (
        <>
            <div className="container ">
                <div className={styles.tabWrap}>
                    <div
                        className={clsx(styles.tab, {
                            [styles.active]: info === 0,
                        })}
                        onClick={() => {
                            setInfo(0);
                        }}
                    >
                        <p>折價券</p>
                    </div>
                    <div
                        className={clsx(styles.tab, {
                            [styles.active]: info === 1,
                        })}
                        onClick={() => {
                            setInfo(1);
                        }}
                    >
                        <p>兌換紀錄</p>
                    </div>
                    <div
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
                        <p>搶點遊戲</p>
                    </div>
                </div>
                <div>
                    <ChangeTab
                        info={info}
                        eggpoints={eggpoints}
                        setEggPoints={setEggPoints}
                    />
                </div>
            </div>
        </>
    );
}
export default Pages;

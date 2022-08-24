import styles from './Title.module.css';
import { BsSlashLg } from 'react-icons/bs';

function Title(props) {
    return (
        <>
            <div className={styles.title}>
                <div className={styles.titleLiteral}>
                    <h3>顧客評論</h3>
                    <BsSlashLg size={36} className={styles.slash} />
                    <p>Comment</p>
                </div>

                <div className={styles.line}></div>
            </div>
        </>
    );
}

export default Title;

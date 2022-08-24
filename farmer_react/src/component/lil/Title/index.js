import styles from './Title.module.css';
import { BsSlashLg } from 'react-icons/bs';

function Title(props) {
    return (
        <>
            <div className={styles.title}>
                <div className={styles.titleLiteral}>
                    <h3>{props.zh}</h3>
                    <BsSlashLg size={36} className={styles.slash} />
                    <p>{props.eg}</p>
                </div>

                <div className={styles.line}></div>
            </div>
        </>
    );
}

export default Title;


import styles from './LoadingScreen.module.scss';

import { FunctionComponent} from 'react';

const LoadingScreen:FunctionComponent = () => {
    

    return (
        <div className={styles.loadingScreen}>
            <div className={styles.LoaderBalls}>
                <div className={styles.LoaderBalls__item}></div>
                <div className={styles.LoaderBalls__item}></div>
                <div className={styles.LoaderBalls__item}></div>
            </div>
        </div>
    )

}

export default LoadingScreen;



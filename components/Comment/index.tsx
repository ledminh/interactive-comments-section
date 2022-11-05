import { FunctionComponent } from "react";

import styles from './Comment.module.scss';
import Image from "next/image";

import iconPlus from '../../assets/images/icon-plus.svg';
import iconMinus from '../../assets/images/icon-minus.svg';

const Comment:FunctionComponent = () => {


    return (
        <div className={styles.Comment}>
            <div className={styles.meta}>
                <Image 
                    src="./images/avatars/image-amyrobson.png"
                    alt="amyrobson's avatar"
                />
                <span>amyrobson</span>
                <span>1 month ago</span>
            </div>
            <div className={styles.content}>
                Impressive! Though it seem blah blah blah blah blah blahblah blah blahblah blah blahblah blah blah
            </div>
            <div className={styles.footer}>
                <div className={styles.score}>
                    <button>
                        <Image
                            src={iconPlus}
                            alt="add score"
                        />
                    </button>
                    <span>12</span>
                    <button>
                        <Image
                            src={iconMinus}
                            alt="minus score"
                        />
                    </button>
                </div>
                <div className={styles.function}>
                    <div>Reply</div>
                </div>
            </div>
        </div>
    )

}

export default Comment;
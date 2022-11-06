import { FunctionComponent } from "react";

import Image from 'next/image';

import styles from './AddComment.module.scss';

const AddComment:FunctionComponent = () => {


    return (
        <div className={styles.AddComment}>
            <textarea 
                className={styles.textArea}
                placeholder="Add a comment ..."
            />
            <div className={styles.footer}>
                <Image 
                    src="/images/avatars/image-amyrobson.png"
                    alt="avatar"
                    width="32"
                    height="32"
                />
                <button>SEND</button>
            </div>
        </div>
    )
}

export default AddComment;
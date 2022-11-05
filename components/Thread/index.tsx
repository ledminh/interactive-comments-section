import { FunctionComponent } from "react";
import { ThreadType } from "../../TypesAndInterfaces";

import styles from './Thread.module.scss';

const Thread:FunctionComponent<{data:ThreadType}> = ({data}) => {

    return (
        <div className={styles.Thread}>
            {
                Object.keys(data).map(k => (
                    <div key={k}>
                        {
                                k === 'replies'?
                                <div>
                                    {
                                        data[k].map(rep => (
                                            <div key={rep.content}
                                                className={styles.Reply}
                                            >
                                                {rep.content}
                                            </div>
                                        ))
                                    }
                                </div>
                                : k === 'user'? null:
                                <div><b>{k}: </b><span>{data[k as keyof ThreadType] as string}</span></div>
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Thread;
import { FunctionComponent } from "react";
import { Comment } from "../../TypesAndInterfaces";

const Thread:FunctionComponent<{data:Comment}> = ({data}) => {

    return (
        <div>
            <div>{data.createdAt}</div>
            <div>{data.score}</div>
            <div>{data.content}</div>
        </div>
    );
}

export default Thread;
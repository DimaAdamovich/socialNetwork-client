import React, {Fragment} from "react";
import Skeleton from "@material-ui/lab/Skeleton";


const SkeletonProfile = () => {
    return <Fragment >
        <Skeleton variant="circle" width={170} height={170} style={{margin: '0 auto'}}/>
        <Skeleton height={20} width="80%" style={{margin: '10px auto'}}/>
    </Fragment>
}
export default SkeletonProfile
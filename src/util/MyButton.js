import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export const MyButton = ({children, tip, onClick, btnClass, tipClass, idIcon}) => (
    <Tooltip title={tip} placement={'top'} className={tipClass}>
        <IconButton onClick={onClick} className={btnClass} id={idIcon}>
            {children}
        </IconButton>
    </Tooltip>)

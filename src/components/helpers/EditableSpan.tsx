import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";
import './helpers.css'

type EditableSpanPT = {
    title: string
    callback: (title: string) => void
    disabled?: boolean
}
const EditableSpan: FC<EditableSpanPT> = ({title, callback, disabled}) => {
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        callback(text)
        setEditMode(false)
    }

    const onDoubleClickHandler = () => {
        !disabled && setEditMode(true)
    }

    return (
        <div className={'editableSpan'}>
            {
                editMode? <TextField value={text} onChange={onChangeHandler} autoFocus disabled={disabled}
                                     onBlur={onBlurHandler} variant={"standard"} color={"secondary"}/>
                    : <span onDoubleClick={onDoubleClickHandler}>{text}</span>
            }
        </div>
    );
};

export default EditableSpan;
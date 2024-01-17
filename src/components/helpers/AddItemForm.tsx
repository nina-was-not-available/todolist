import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import './helpers.css'
import {Add} from "@mui/icons-material";


type AddItemFormPT = {
    callback: (title: string) => Promise<void>
    disabled?: boolean
}

const AddItemForm: FC<AddItemFormPT> = ({callback, disabled}) => {
    const [error, setError] = useState<null | string>(null)
    const [title, setTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = async () => {
        if (title.trim() === '') {
            setError('Enter title!')
        }
        let res = await callback(title)
        setTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <>
            <div className={'addItemForm'}>
                <TextField placeholder={'Title'} value={title}
                           onChange={onChangeHandler} className={error? 'error': ''}
                           onKeyDown={onKeyDownHandler} disabled={disabled} variant={'outlined'}/>
                <IconButton type={'submit'} onClick={onClickHandler} disabled={disabled}>
                    <Add color={"secondary"}/>
                </IconButton>
            </div>
            {error && <div className={'errorMessage'}>{error}</div>}
        </>

    );
};

export default AddItemForm;



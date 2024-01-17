import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'
import {useFormik} from "formik";
import {LoginData} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {loginThunks} from "../model/loginThunks";
import {selectIsLoggedIn} from "../model/loginSelectors";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values: LoginData) => {
            let errors: Partial<LoginData> = {}
            if (!values.email || (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
                errors.email = 'Enter correct email'
            }
            if (!values.password || values.password.length < 3) {
                errors.password = 'Password is too shirt'
            }
            return errors
        },
        onSubmit: (values: LoginData, formikHelpers) => {
            dispatch(loginThunks.login({data: values}))
        }
    })
    if (isLoggedIn) return <Navigate to={'/'}/>
    return (
        <div className={'login'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <TextField type="password" label="Password"
                               margin="normal" {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    <FormControlLabel label={'Remember me'} control={<Checkbox
                        color={"secondary"} {...formik.getFieldProps('rememberMe')}/>}/>
                    <Button type={'submit'} variant={'contained'} color={'secondary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </div>
    )
}
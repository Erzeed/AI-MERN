import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';
import { toast } from 'react-toastify';

export type formLogin = {
    email: string,
    password: string
}

export type loginRes = {
    authuser?: string,
    code?: string,
    prompt?: string,
    scope?: string
}
const Login = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const initialValues: formLogin = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });

    const mutation = useMutation(api.Login, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            toast.success("Login berhasil");
            // navigate("/d")
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })

    const mutationLogin = useMutation(api.LoginByGoogle, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            toast.success("Login berhasil");
            // navigate("/d")
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })

    const handleSubmit = (
        values: FormikValues,
        { setSubmitting }: FormikHelpers<formLogin>
    ) => {
        const data = values as formLogin
        mutation.mutate(data)
        setSubmitting(false);
    };

    const loginByGoogle = useGoogleLogin({
        onSuccess: codeResponse => {
            mutationLogin.mutate(codeResponse)
        },
        flow: 'auth-code',
    });

    return(
        <div className="login h-[90vh] w-full flex justify-center items-center dark:text-white rajdhani">
            <div className="content w-[400px] h-[60vh] bg-[#1e1f26] rounded-2xl p-5">
                <div className="title text-2xl text-center font-medium tracking-wide mb-5">
                    <h1>Log in to your account</h1>
                </div>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, errors, handleSubmit}) => (
                        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
                            <label htmlFor="email" className='relative tracking-wide'>
                                Email
                                <Field name="email" type="email" className={`${errors.email && 'border border-red-500'} w-full h-10 rounded bg-slate-800 px-3 focus:outline-none my-1`}/>
                                <ErrorMessage className='absolute right-3 top-10 text-xs text-zinc-300 tracking-wide' name="email" component="div"/>
                            </label>
                            <label htmlFor="password" className='relative tracking-wide'>
                                Password
                                <Field name="password" type="password" className={`${errors.password && "border border-red-500"} w-full h-10 rounded bg-slate-800 px-3 focus:outline-none my-1`}/>
                                <ErrorMessage className='absolute right-3 top-10 text-xs text-zinc-300 tracking-wide' name="password" component="div" />
                            </label>
                            <button type="submit" disabled={isSubmitting} className="text-sm  font-semibold tracking-wider bg-white w-full h-9 rounded-md text-black flex justify-center items-center">Login</button>
                        </form>
                    )}
                </Formik>
                <button onClick={() => loginByGoogle()} type="button" className='w-full h-10 text-sm bg-slate-800 font-medium rounded flex justify-center items-center mt-5 tracking-wide'>
                    <FcGoogle className='text-3xl pr-2'/>
                    Continue with Google
                </button>
                <p className='mt-5 text-sm tracking-wide font-medium'>Don't have account? <Link className='text-purple-800 hover:underline' to="/register">Get acces</Link> </p>
            </div>
        </div>
    )
}

export default Login
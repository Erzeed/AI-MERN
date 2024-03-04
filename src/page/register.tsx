import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import api from '../utils/api';

export type formRegister = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Register = () => {
    const initialValues: formRegister = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Firstname is required'),
        lastname: Yup.string().required('Lastname is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const mutation = useMutation(api.Register, {
        onSuccess: () => {
            console.log("succes")
        },
        onError: (error: Error) => {
            console.log(error)
        }
    })

    const handleSubmit = (
        values: FormikValues,
        { setSubmitting }: FormikHelpers<formRegister>
    ) => {
        const data = values as formRegister; // Type assertion
        console.log(data);
        mutation.mutate(data);
        setSubmitting(false);
    };

    return(
        <div className="register h-[90vh] w-full flex justify-center items-center dark:text-white rajdhani">
            <div className="content w-[430px] h-full bg-[#1e1f26] rounded-2xl p-5">
                <div className="title text-2xl text-center font-medium tracking-wide mb-5">
                    <h1>Register</h1>
                </div>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, errors, handleSubmit}) => (
                        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
                            <label htmlFor="firstname" className='relative tracking-wide'>
                                Firstname
                                <Field name="firstname" type="firstname" className={`${errors.firstname && 'border border-red-500'} w-full h-10 rounded bg-slate-800 px-3 focus:outline-none my-1`}/>
                                <ErrorMessage className='absolute right-3 top-10 text-xs text-zinc-300 tracking-wide' name="firstname" component="div"/>
                            </label>
                            <label htmlFor="lastname" className='relative tracking-wide'>
                                Lastname
                                <Field name="lastname" type="lastname" className={`${errors.lastname && 'border border-red-500'} w-full h-10 rounded bg-slate-800 px-3 focus:outline-none my-1`}/>
                                <ErrorMessage className='absolute right-3 top-10 text-xs text-zinc-300 tracking-wide' name="lastname" component="div"/>
                            </label>
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
                            <label htmlFor="confirmPassword" className='relative tracking-wide'>
                                Confirm Password
                                <Field name="confirmPassword" type="password" className={`${errors.confirmPassword && "border border-red-500"} w-full h-10 rounded bg-slate-800 px-3 focus:outline-none my-1`}/>
                                <ErrorMessage className='absolute right-3 top-10 text-xs text-zinc-300 tracking-wide' name="confirmPassword" component="div" />
                            </label>
                            <button type="submit" disabled={isSubmitting} className="text-sm font-semibold tracking-wider bg-white w-full h-9 rounded-md text-black flex justify-center items-center">Register</button>
                        </form>
                    )}
                </Formik>
                <p className='mt-5 text-sm tracking-wide font-medium'>Have account? <Link className='text-purple-800 hover:underline' to="/login">Login now</Link> </p>
            </div>
        </div>
    )
}

export default Register
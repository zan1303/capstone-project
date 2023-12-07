import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';
import '../button-component/button.styles.scss';
import FormInput from '../form-input/form-input.component'; 
import Button from '../button-component/button.component'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword ) {
            alert("passwords do not match");
        
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
           
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        } catch(error){
            if(error.code = 'auth/email-already-in-use') {
               alert('Canot create user, email already in use'); 
            }

            else console.log('user creation encountered an error',error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
    
        setFormFields({...formFields, [name]: value})
    }
    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Display name" type="text" required onChange={handleChange} name='displayName'  value={displayName} />

                <FormInput label="Email" type="text" required onChange={handleChange} name='email'  value={email} />

                <FormInput label="Password" type="text" required onChange={handleChange} name='password'  value={password} />

                <FormInput label="Password" type="text" required onChange={handleChange} name='password'  value={confirmPassword} />
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
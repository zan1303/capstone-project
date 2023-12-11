import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';
import '../button-component/button.styles.scss';
import FormInput from '../form-input/form-input.component'; 
import Button from '../button-component/button.component'

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const respone = await signAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        } catch(error){

            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with thisemail');
                    break;
                default:
                console.log(error);
            }
            //if(error.code !== 'euth/wrong-password' ){
            //    alert('incorrect password for email');
           // }
            //else if(auth/user-not-found)
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
    
        setFormFields({...formFields, [name]: value})
    }
    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="text" required onChange={handleChange} name='email'  value={email} />
                <FormInput label="Password" type="text" required onChange={handleChange} name='password'  value={password} />
            <div className="buttons-container">
                <Button type="submit">Sign in</Button>
                <Button  type="buton" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
            </div>
                
            </form>
        </div>
    );
};

export default SignInForm;
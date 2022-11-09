import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupFields } from "../../constants/formFields"
import FormAction from "./FormAction";
import Input from "../Input";
import myaxios from "../../provider/API";

import { setUserInfo } from "../../store/actions/app.actions";

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [signupState, setSignupState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (signupState['confirm-password'] !== signupState['password']) {
      setErrorMessage("Warning! Password doesn't matched.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000)
      return;
    }
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = () => {
    myaxios.auth.register(signupState).then(async (res) => {
      if(res && res.data){
        await dispatch(setUserInfo(res.data));
        navigator("/");
      }
    }).catch((err)=>{
      console.log('err ====> ', err);
      if(err.code === "ERR_BAD_REQUEST"){
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000)
      }
    });
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {
        errorMessage &&
        <div className='error-message text-center text-purple-900'>{ errorMessage }</div>
      }
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />

          )
        }
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>



    </form>
  )
}
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
// import FormExtra from "./FormExtra";
import Input from "../Input";
import myaxios from "../../provider/API";

import { setUserInfo } from "../../store/actions/app.actions";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () => {
        // console.log('loginData', loginData);
        myaxios.auth.login(loginData).then(async (res)=>{
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
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginData[field.id]}
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
            </div>

            {/* <FormExtra /> */}
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    )
}
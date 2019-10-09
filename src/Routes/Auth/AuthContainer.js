import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from './AuthPresenter';
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from './AuthQueries';
import { toast } from "react-toastify";



export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const [requestSecret] = useMutation(LOG_IN, {
      update: (_, { data }) => {
          const { requestSecret } = data;
          if(!requestSecret) {
              toast.error('계정이 존재하지않습니다. 회원가입해주세요.');
              setTimeout(() => {
                  setAction('signUp', 200);
              })
          }
      },
      variables: { email: email.value} 
    });


    const createAccount = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    })

  const onSubmit = e => {
      e.preventDefault();
      if(action === 'logIn') {
        if(email !== '') {
            requestSecret();
        } else {
            toast.error("이메일을 입력해주세요.");
        }
      } else if(action === 'signUp') {
          if(email.value !== '' &&
            username.value !== '' &&
            firstName.value !== '' &&
            lastName.value !== ''
          ) {
              createAccount();
          } else {
              toast.error('모든 정보를 입력해주세요.');
          }
      }
      
  }

  return (
    <AuthPresenter 
        setAction={setAction}
        action={action}
        username={username}
        firstName={firstName}
        lastName={lastName}
        email={email}
        onSubmit={onSubmit} 
    />
  );
};
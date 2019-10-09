import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from './AuthPresenter';
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from './AuthQueries';
import { toast } from "react-toastify";



export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const secret = useInput('');
  const email = useInput('');
  const [requestSecretMutation] = useMutation(LOG_IN, {
      variables: { email: email.value} 
    });


    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });

    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables: {
            email: email.value,
            secret: secret.value
        }
    });

    const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async(e) => {
      e.preventDefault();
      if(action === 'logIn') {
        if(email !== '') {
            try {
                const {data: { requestSecret } } = await requestSecretMutation();
                if(!requestSecret) {
                    toast.error('회원가입해주세여');
                    setTimeout(() => {
                       setAction('signUp') 
                    }, 3000);
                } else {
                    toast.success('로그인 시크릿을 확인해주세요.');
                    setAction('confirm');
                }
            } catch {
                toast.error('비밀번호를 만들수없습니다 다시시도해주세요.');
            }
            
        } else {
            toast.error("이메일을 입력해주세요.");
        }
      } else if(action === 'signUp') {
          if(email.value !== '' &&
            username.value !== '' &&
            firstName.value !== '' &&
            lastName.value !== ''
          ) {
              try {
                const { data: {createAccount} } = await createAccountMutation();
                if(!createAccount) {
                    toast.error('회원가입 실패');
                } else {
                    toast.success('회원가입하였습니다. 로그인해주세요.');
                    setTimeout(() => {
                        setAction('logIn')
                    }, 3000);
                }
              }catch(e) {
                  toast.error(e);
              }
          } else {
              toast.error('모든 정보를 입력해주세요.');
          }
      } else if(action === 'confirm') {
            if(secret.value !== '') {
                try{
                    const {
                        data: { confirmSecret: token }
                    } = await confirmSecretMutation();
                    if(token !== '' && token !== undefined) {
                        localLogInMutation({variables: { token } });
                    } else {
                        throw Error();
                    }
                }catch{
                    toast.error('시크릿이 틀립니다. 다시 확인해주세요');
                }
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
        secret={secret}
        onSubmit={onSubmit} 
    />
  );
};
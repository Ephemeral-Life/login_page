import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

type FormData = {
  username: string;
  password: string;
  gender: string;
};

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;


function useCreateUser(username: string, password: string, gender: string) {
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);

  const submit = async () => {
    await createUser({
      variables: {
        input: { username, password, gender },
      },
    });
  };
  
  return { submit, loading, error, id: data?.createUser?.id };
}

function RegisterServer() {
  const location = useLocation();
  const state = location.state as FormData;
  console.log("123");
  const { submit, loading, error, id } = useCreateUser(state.username, state.password, state.gender);
  console.log(submit, loading);
  useEffect(() => {
    submit();
  }, []);
  if (!error) {
    return(
      <div key={id}>
        <h1>账号{state.username}注册完成</h1>
      </div>
    )
  }
}
export { useCreateUser, RegisterServer}
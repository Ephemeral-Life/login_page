import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

type FormData = {
    username: string;
    password: string;
    remember: boolean;
};
type userInfo = {
  id: number;
  username: string;
  password: string;
}
const GET_USERS = gql`
  query GetUser($username: String!, $password: String!) {
    checkPw(username: $username, password: $password) {
      users {
      username
      id
      }
    }
}
`;

function useUserQuery(username: String, password: String) {
  const { loading, error, data } = useQuery(GET_USERS, {variables: { username, password }});
  //const { loading, error, data } = useQuery(GET_ALL_USERS);
  return { loading, error, users: data?.checkPw.users}; 
}

export default function Result() {
  const location = useLocation();
  const state = location.state as FormData;
  const { loading, error, users } = useUserQuery(state.username, state.password);
  console.log(users);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!users || users.length === 0) {
    return(
      <div>
        <h1>账号不存在</h1>
      </div>
    )
  }
  else{
    return (
        <div>
          {users.map((userInfo:userInfo) => (
            <div key={userInfo.id}>
              <h1>用户:{userInfo.username}登录成功</h1>
            </div>
          ))}
        </div>
    );
  }
}

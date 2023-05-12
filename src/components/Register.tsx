import { Button, Form, Input, message} from 'antd';
import React from 'react';
import './css/login.css';
import { gql, useMutation } from '@apollo/client';
interface RegisterProps {
  passData: (data: number) => void;
}

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

const Register: React.FC<RegisterProps> = (props) => {
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [messageApi, contextHolder] = message.useMessage();
  const info = (info: string) => {
    messageApi.info(info);
  };
  const onFinish = async (values: any) => {
  if(loading)
      info("loading...");
  try {
    const { username, password } = values;
    await createUser({
      variables: {
        input: { 
          username: username, 
          password: password, 
        },
      },
    });
    info("注册成功");
    props.passData(3);
  } catch (error) {
    info("注册失败：" + error);
    console.log(error);
  }
  
};
  return (
    <div className="register">
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名："
          name="username"
          rules={[{ required: true, message: '输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码："
          name="password"
          rules={[{ required: true, message: '输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="确认密码" name="repassword" rules={[{required: true, message: ''},
          ({getFieldValue})=>({
            validator(_, value){
              if(!value || getFieldValue('password') === value){
                return Promise.resolve()
              }
              return Promise.reject("两次密码输入不一致")
            }
          })
        ]}
        >
	      <Input.Password/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">注册</Button>
          <Button htmlType="button" className="button_login" onClick={()=>props.passData(0)}>转登录页</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
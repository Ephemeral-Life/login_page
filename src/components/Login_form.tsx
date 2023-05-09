import React, {useEffect} from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './css/login.css';
import { useNavigate } from'react-router-dom';
import { useLocation } from 'react-router-dom';
interface LoginProps {
    passData: (data: number) => void;
    initFlag: number
}
type reload = {
    error: string;
}
const Login_form: React.FC<LoginProps> = (props) => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const state= location.state as reload;
    console.log(state?.error);
    useEffect(() => {
        const info = (info: string) => {
            messageApi.info(info);
          };
        if (state?.error === "no_such_user") {
            info('账号不存在');
        }
        if (props.initFlag === 3) {
            info('注册成功');
        }
    }, [props.initFlag]);
      
    const onFinish = (values: any)=>{
        // console.log(values);
        navigate('/result', {state: values});
    };
    return(
        <div className="container">
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                className="login-form"
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

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>保存登录状态</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    <Button htmlType="button" className="button_reg" onClick={()=>props.passData(1)}>
                        转注册页
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login_form;
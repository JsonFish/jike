import React from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { loginReq } from "@/store/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(loginReq(values));
  };
  return (
    <div className="w-screen h-screen bg-zinc-700">
      <Card
        bordered={false}
        className="w-96 h-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Form
          onFinish={onFinish}
          initialValues={{
            mobile: "13888888888",
            code: "246810",
            remember: true,
          }}
        >
          <p className="text-center text-xl mb-2 text-gray-500">Json Fish</p>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式不对",
                validateTrigger: "onBlur",
              },
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input type="text" placeholder="phoneNumber" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>
          <Button htmlType="submit" className="w-full" type="primary">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default Login;

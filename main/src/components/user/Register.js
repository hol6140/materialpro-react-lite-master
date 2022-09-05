import React, { useState, useEffect, useCallback } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import NumericInput from '../common/NumericInput';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Space,
  notification,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardBody, CardTitle } from 'reactstrap';
import { registerUser, checkUserId } from '../../api/AuthApi';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {
  const [form] = Form.useForm();
  const [phoneNum, setPhoneNum] = useState('');
  const navigate = useNavigate();
  const [userIdValidation, setUserIdValidation] = useState(false);
  const [userId, setUserId] = useState('');
  const onClickRegisterBtn = () => {
    if (!userIdValidation) {
      notification.warning({
        message: '아이디 중복체크',
        description: '아이디 중복 확인을 먼저 해주세요.',
        duration: 1.0,
      });
      return;
    }
    form.validateFields().then(values => {
      console.log(values);
      const params = {
        userId: values.userId,
        password: values.password,
        userNm: values.userNm,
        telNo: values.telNo,
      };
      registerUser(params)
        .then(result => {
          notification.success({
            message: '회원가입 성공',
            description: result.data + ' 회원가입 되었습니다.',
            duration: 1.0,
          });
          navigate('/');
        })
        .catch(error => {
          console.log(error);
          notification.error({
            message: '회원가입 실패',
            description: error,
            duration: 1.0,
          });
        });
    });
  };
  // passwordCheck 유효성 검사
  const validatePasswordCheck = useCallback((_, value) => {
    if (
      form.getFieldValue('password') &&
      form.getFieldValue('password') !== value
    ) {
      return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
    }
    return Promise.resolve();
  }, []);
  const validatePhoneCheck = useCallback((_, value) => {
    if (value.length !== 11 || Number.isNaN(value)) {
      return Promise.reject(new Error('올바른 전화번호를 입력해주세요.'));
    }
    return Promise.resolve();
  }, []);
  const onClickCheckBtn = () => {
    checkUserId(userId)
      .then(result => {
        console.log(result);
        notification.error({
          message: '아이디 사용 불가능',
          description: '중복된 아이디가 존재합니다.',
          duration: 1.0,
        });
      })
      .catch(error => {
        if (error.response?.status === 500) {
          notification.success({
            message: '아이디 사용 가능',
            description: userId + ' 사용가능한 아이디 입니다.',
            duration: 1.0,
          });
          setUserIdValidation(true);
          return;
        } else {
          notification.error({
            message: '아이디 사용 불가능',
            description: '중복된 아이디가 존재합니다.',
            duration: 1.0,
          });
        }
      });
  };
  const onChangeUserId = e => {
    setUserId(e.target.value);
    console.log(e.target.value);
    setUserIdValidation(false);
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">회원 가입</CardTitle>
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            layout="horizontal"
            size="middle"
          >
            {/* <Form.Item>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://k8s-default-petfrien-e22d96b656-56720431.us-west-2.elb.amazonaws.com/userInfos/image/upload/"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item> */}

            <Form.Item
              label="ID"
              name="userId"
              rules={[{ required: true, message: 'ID를 입력해주세요.' }]}
            >
              <div className="registerId">
                <Input className="registerIdInput" onChange={onChangeUserId} />
                <Button className="registerIdBtn" onClick={onClickCheckBtn}>
                  중복확인
                </Button>
              </div>
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password placeholder="input password" />
            </Form.Item>
            <Form.Item
              label="Password 확인"
              name="PasswordConfirm"
              rules={[
                { required: true, message: '비밀번호확인을 입력해주세요.' },
                { validator: validatePasswordCheck },
              ]}
            >
              <Input.Password
                placeholder="input password"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label="이름"
              name="userNm"
              rules={[{ required: true, message: '이름을 입력해주세요.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="전화번호"
              name="telNo"
              rules={[
                { required: true, message: '전화번호를 입력해주세요.' },
                { validator: validatePhoneCheck },
              ]}
            >
              <Input />
              {/*  <NumericInput inputText={phoneNum} onChange={setPhoneNum} />*/}
            </Form.Item>
            <div className="logBtn">
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={onClickRegisterBtn}
              >
                등록
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;

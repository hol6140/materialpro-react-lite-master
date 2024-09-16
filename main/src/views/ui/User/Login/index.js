import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LoginComponent from '../../../../components/user/Login';
import { initReduxAll } from '../../../../components/common/InitRedux';
const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = '';
    sessionStorage.clear();
    initReduxAll(dispatch);
  }, []);
  return (
    <div className="userContainer">
      <Col lg="6" span={14}>
        <LoginComponent />
      </Col>
    </div>
  );
};

export default Login;

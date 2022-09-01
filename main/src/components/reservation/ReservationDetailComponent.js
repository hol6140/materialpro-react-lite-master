import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Button } from 'antd';
import user1 from '../../assets/images/users/user1.jpg';
import { cancelReservation } from '../../api/ReservationApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReservationList,
  setReservationDetailId,
} from '../../store/Reservation';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/AuthApi';
import DogWalkerInfoComponent from '../dogWalker/DogWalkerInfoComponent';
import ReservationInfoComponent from './ReservationInfoComponent';
const ReservationDetailComponent = ({
  reservationinfo,
  dogWalkerInfo,
  onClickCancelBtn,
}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">예약 상세 조회</CardTitle>
          <DogWalkerInfoComponent dogWalkerInfo={dogWalkerInfo} />
          <ReservationInfoComponent reservationinfo={reservationinfo} />
          <Button onClick={onClickCancelBtn}>예약 취소</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReservationDetailComponent;

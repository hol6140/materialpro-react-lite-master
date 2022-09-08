import axios from 'axios';
import interceptor from './AxiosInterCeptor';

export const PetFrinedsPatchService = (url, param) => {
  let BaseUrl = `${process.env.REACT_APP_PET_FRIENDS_BASE_URL}`;
  const RequestUrl = `${BaseUrl}${url}`;
  const errIgnoreList = [200, 201, 204];

  return new Promise((resolve, reject) => {
    interceptor
      .patch(url, param)
      .then(response => {
        if (!errIgnoreList.includes(response.status)) {
          console.log('PetFrinedsPatchService 시스템 내부 ERROR >> 500');
        }
        resolve(response);
      })
      .catch(error => {
        console.log('PetFrinedsPatchService 시스템 내부 ERROR >>', error);
        reject(error);
      });
  });
};

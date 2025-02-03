import axios from 'axios';

const clientId = process.env.NEXT_PUBLIC_NMFClientId; // 네이버 클라이언트 아이디
const clientSecret = process.env.NEXT_PUBLIC_NMFClientSecret; // 네이버 클라이언트 시크릿

export const getGeocode = async (location: string) => {
  try {
    const response = await axios.get(`/api/naver/map-geocode/v2/geocode?query=${location}`, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientSecret,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

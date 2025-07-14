import axios from 'axios';

const REST_API_KEY =
  process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || '21473ae01a5f427539e27c5e8d631c10';

export const getGeocode = async (location: string) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
      params: {
        query: location,
      },
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReverseGeocode = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/geo/coord2address.json', {
      params: {
        x: longitude, // 경도
        y: latitude, // 위도
        input_coord: 'WGS84',
      },
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Reverse geocode error:', error);
    throw error;
  }
};

import axios from 'axios';

const CLIENT_ID = '31992158';
const URL = 'https://app2.gnzs.ru/amocrm/test/oauth/get-token.php';

export const getAccessToken = async () => {
    try {
    const response = await axios.get(URL, {
      headers: {
        'X-Client-Id': CLIENT_ID,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const { access_token, base_domain } = response.data;
      
        saveAccessToken(access_token);

      console.log('Access Token получен успешно:', access_token);
      return { access_token, base_domain };
    } else {
      throw new Error(`Ошибка: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Ошибка при получении токена:', error.message);
    throw error;
  }
}

function saveAccessToken(token) {
  localStorage.setItem('accessToken', token);
}
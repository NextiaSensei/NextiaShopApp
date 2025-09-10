import axios from 'axios';

const API_URL = 'https://shop.nextiamarketing.com/wp-json/wc/v3/products';
const CONSUMER_KEY = 'ck_3861249787bfadc6a12201ac0feb1dde2e558c1a';
const CONSUMER_SECRET = 'cs_bf739ec3a22a9cfc080e013346626d32ae502e71';

export async function getProducts() {
  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: CONSUMER_KEY,
        password: CONSUMER_SECRET,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return [];
  }
}

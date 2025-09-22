import { WOO_API_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET } from "@env";
import axios from 'axios';

export async function getProducts() {
  try {
    const response = await axios.get(`${WOO_API_URL}/products`, {
      auth: {
        username: WOO_CONSUMER_KEY,
        password: WOO_CONSUMER_SECRET,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return [];
  }
}


import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8001/api/v1';
const API_KEY = 'urbex_secret_key_2024';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
    'Content-Type': 'application/json',
  },
});

export const moderateContent = async (text: string, imageData?: string, history?: any[]) => {
  const response = await api.post('/moderate', {
    text,
    image_data: imageData,
    history,
  });
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export const submitFeedback = async (requestId: string, wasCorrect: boolean, actualType?: string, comment?: string) => {
  const response = await api.post('/feedback', {
    request_id: requestId,
    was_correct: wasCorrect,
    actual_toxicity_type: actualType,
    comment,
  });
  return response.data;
};

export const getLogs = async () => {
  const response = await api.get('/admin/logs');
  return response.data;
};

export default api;

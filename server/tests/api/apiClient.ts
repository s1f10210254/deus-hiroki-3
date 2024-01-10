import { API_BASE_PATH, PORT } from '$/service/envValues';
import aspida from '@aspida/axios';
import axios from 'axios';
import api from '../../api/$api';

const agent = axios.create();
export const apiClient = api(
  aspida(agent, { baseURL: `http://127.0.0.1:${PORT}${API_BASE_PATH}` })
);

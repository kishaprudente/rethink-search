import axios from 'axios';

export default {
  getUsers: (page, limit) => {
    return axios.get(`/api/users?page=${page}&limit=${limit}`);
  },

  getUrls: () => {
    return axios.get('/api/shortUrl');
  },

  createShortUrl: (longUrl) => {
    return axios.post('/api/shortUrl', longUrl);
  },
};

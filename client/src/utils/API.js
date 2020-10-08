import axios from 'axios';

export default {
  getUsers: (page, limit) => {
    return axios.get(`/api/users?page=${page}&limit=${limit}`);
  },

  getUser: (name) => {
    return axios.get(`/api/user/:${name}`);
  },
};

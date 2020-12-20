import axios from 'axios';

const UserService = {
  getUsers: (id) => {
    const url = `/users${id ? `/id` : ''}`;
    return axios.get(url);
  },
};

export default UserService;

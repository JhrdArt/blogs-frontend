import axios from "axios";
const URL = "http://localhost:3001/api/users";

const getUser = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

export default { getUser };

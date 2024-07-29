import axios from "axios";
const URL = "http://localhost:3001/api/blogs";

const getAll = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(`Error to connect to DB ${error}`);
  }
};

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  const response = await axios.post(URL, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${URL}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${URL}/${id}`, config);
  return response.data;
};

export default { getAll, create, setToken, remove, update };

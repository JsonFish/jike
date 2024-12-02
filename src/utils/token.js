const TokenKey = "geek";
const getToken = () => {
  return localStorage.getItem(TokenKey);
};
const setToken = (token) => {
  localStorage.setItem(TokenKey, token);
};
const removeToken = () => {
  localStorage.removeItem(TokenKey);
};
export { getToken, setToken, removeToken };

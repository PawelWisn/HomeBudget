export const getToken = ()=> window.localStorage.getItem('TOKEN');
export const storeToken = (token:string)=> window.localStorage.setItem('TOKEN', token);
export const deleteToken = ()=> window.localStorage.removeItem('TOKEN');

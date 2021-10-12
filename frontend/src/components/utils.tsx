export const getToken = ()=> window.localStorage.getItem('TOKEN');
export const storeToken = (token:string)=> window.localStorage.setItem('TOKEN', token);
export const deleteToken = ()=> window.localStorage.removeItem('TOKEN');

export const getUserID = ()=> window.localStorage.getItem('USERID');
export const storeUserID = (userid:string)=> window.localStorage.setItem('USERID', userid);
export const deleteUserID = ()=> window.localStorage.removeItem('USERID');
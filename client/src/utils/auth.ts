import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {

    try {

      const decoded = jwtDecode<JwtPayload>(token);

      if(decoded?.exp && decoded?.exp < Date.now() /1000 ) {
        //token is expired
        return true;
      }

    } catch (error) {

      return false;

    }
    
  }

  getToken(): string {
    
    const loggedInUser = localStorage.getItem('id_token') || '';
    return loggedInUser;
  }

  login(idToken: string) {
    
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();

import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    
    // send POST request to 'auth/login'
    const response = await fetch('/auth/login',{
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(userInfo)
    });


    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;

  } catch(error) {
    console.log('Error from user login: ', error);
    return Promise.reject('Could not fetch user info');

  }

}

export { login };

import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {

  
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  //find user in the database using database name
  const user = await User.findOne({
    where : {username},
  });

  if(!user) {
      return res.status(401).json({ message:'Authentication Failed' });
  } 
  
  //compaire provided password with existing one
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if(!passwordIsValid) {
     return res.status(401).json({ message:'Authentication Failed'});
  }

  //get the secret key from env variable
  const secretKey = process.env.JWT_SECRET_KEY || '';

  //Generate the JWT token for authenticated user
  const token = jwt.sign({username}, secretKey, { expiresIn:'1h' });
  return res.json({ token });

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;

import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from '../../config.js';

export const auth = (req, res, next) => {
    const token = req.cookies['auth'];
    if (!token) {
    return next();
} try {
        const decodedToken = jsonwebtoken.verify(token, jwtSecret);
     
        next();
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/users/login');
      
    }

  
}
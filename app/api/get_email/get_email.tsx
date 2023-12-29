import { NextRequest } from 'next';
import jwt from 'jsonwebtoken';

const getCurrentEmail = async (request: NextRequest): Promise<string> => {
  try {
    const token = request.cookies.get('email')?.value || '';
    if (!token) {
      throw new Error('No email provided');
    }
    const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
    return decryptedToken.email;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getCurrentEmail;
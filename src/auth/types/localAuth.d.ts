import { Request } from 'express';
import { LoginUser } from '../dto/LoginUser.dto';

interface RequestWithUser extends Request {
  user: LoginUser;
}

export default RequestWithUser;

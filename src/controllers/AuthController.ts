import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import userRoles from '../data/userRole';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
import { default as User } from '../models/Users';
import exclude from '../utils/exclude';
import { Password } from '../utils/password';
import path from 'path';
import { getKigaliRwandaTime } from '../config/dateFunc';
class AuthController {
  login = async (req: Request, res: Response): Promise<Response> => {
    // Check if user exist
    let userData = await User.findByUsername(req.body.username);

    if (userData.length <= 0) {
      throw new NotFoundError("Username/password doesn't match!");
    }

    const passwordsMatch = await Password.compare(
      userData[0].password,
      req.body.password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Username/password doesn't match!");
    }
    // find user role
    userData = userData.map((user) => ({
      ...user,
      roles:
        userRoles.find((role) => role.role_id === user.staff_position_id) ??
        null,
    }));
    // Generate JWT
    const user_jwt = jwt.sign(
      {
        id: userData[0].id,
        email: userData[0].email,
        staff_type: userData[0].staff_type,
        staff_id: userData[0].staff_id,
        staff_location_id: userData[0].staff_location_id,
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: `${process.env.EXPIRES_IN}`,
      }
    );

    return res
      .status(httpStatus.OK)
      .send({ token: user_jwt, ...exclude(userData[0], ['password']) });
  };
}

export default new AuthController();

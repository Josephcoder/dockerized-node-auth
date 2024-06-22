import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import userRoles from '../data/userRole';
import UserService from '../services/UserService';
import Users from '../models/Users';

class UserController {
  getCurrentLogin = async (req: Request, res: Response): Promise<Response> => {
    console.log('userData:', req.userData);

    // find user role
    return res.status(httpStatus.OK).json(
      (await UserService.currentLogin(req.userData.id)).map((user) => ({
        ...user,
        roles:
          userRoles.find((role) => role.role_id === user.staff_position_id) ??
          null,
      }))
    );
  };
  getUserPhone = async (req: Request, res: Response): Promise<Response> => {
    const userData = (await Users.findByUsername(req.params.user_id)).map(
      (user) => ({
        ...user,
        roles:
          userRoles.find((role) => role.role_id === user.staff_position_id) ??
          null,
      })
    );
    if (userData.length <= 0) {
      return res.status(httpStatus.OK).json([]);
    }
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

    // find user role
    return res
      .status(httpStatus.OK)
      .json([{ token: user_jwt, ...userData[0] }]);
  };
}
export default new UserController();

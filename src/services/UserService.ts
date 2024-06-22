import Users from '../models/Users';

class UserService {
  currentLogin = async (user_id: string) => {
    return await Users.findById(user_id);
  };

}
export default new UserService();

import { UserRepository } from '../../core/repositories/UserRepositories';
import User from '../../core/domain/entieies/User';

interface UserMap {
  idUser: number | undefined;
  username: string;
  password: string;
  date: Date;
}

export class UserRepositoriesImpl implements UserRepository {
  static UserModel: any;
  getUserData(user: User): UserMap {
    return {
      idUser: user.getId(),
      username: user.getUsername(),
      password: user.getPassword(),
      date: user.getDate()
    };
  }
  getUserClass(userData: any) {
    const idUser: userData.dataValues.idUser; //forzar con Number()?
    const usernme: userData.dataValues.username;
    //añadir demás valores aquí

    const userInstance = new User(username, '', '', '');
    userInstance.setId(idUser);
    return userInstance;
  }

  async create(user: User): Promise<void> {
    const UserData = this.getUserData(user);
    console.log(UserData);
    if (UserRepositoriesImpl.UserModel) {
      try {
        await UserRepositoriesImpl.UserModel.create(UserData as any);
      } catch (error) {
        console.error('Error creating the user', error);
      }
    }
  }

  async findById(id: number): Promise<User | null> {}

  async findAll(): Promise<User[] | null> {}

  async update(user: User): Promise<void> {}

  async delete(id: number): Promise<void> {}
}

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
  getUserClass;
}

export class PlayerRepositoriesImpl implements PlayerRepository {
  static PlayerModel: any;
  getPlayerData(player: Player): PlayerMap {
    return {
      id_player: player.getId(),
      name: player.getName(),
      total_plays: player.getTotalPlays() || 0, //valor por defecto por si no hay valor
      total_wins: player.getTotalWins() || 0, //valor por defecto por si no hay valor
      createdAt: player.getCreationDate(),
      win_rate: player.getWinRate()
    };
  }
  getPlayerClass(playerData: any) {
    const id = Number(playerData.dataValues.id_player);
    const name = playerData.dataValues.name;
    const totalPlays = playerData.dataValues.total_plays;
    const totalWins = playerData.dataValues.total_wins;
    const createdAt = playerData.dataValues.createdAt;
    const winRate = playerData.dataValues.win_rate;

    const playerInstance = new Player(
      name,
      totalPlays,
      totalWins,
      winRate,
      createdAt
    );
    playerInstance.setId(id);
    return playerInstance;
  }
  async createPlayer(player: Player): Promise<void> {
    const PlayerData = this.getPlayerData(player);
    console.log(PlayerData);
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      try {
        await PlayerRepositoriesImpl.PlayerModel.create(PlayerData as any);
      } catch (error) {
        console.error('Error creating player', error);
      }
    }
  }
  async findPlayerById(id: number): Promise<Player | null> {
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      try {
        const foundPlayer =
          await PlayerRepositoriesImpl.PlayerModel.findByPk(id);
        return this.getPlayerClass(foundPlayer);
      } catch (error) {
        console.error('Error finding player by Id:', error);
        return null;
      }
    }
    return null;
  }
  async findAllPlayers(): Promise<Player[] | null> {
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      resetPlayersList();
      const allPlayers = await PlayerRepositoriesImpl.PlayerModel.findAll();
      for (let i = 0; i < allPlayers.length; i++) {
        players.push(this.getPlayerClass(allPlayers[i]));
      }
      Player.setIdCounter(getLastId());
      return players;
    }
    return null;
  }
  async findAllAndSort(): Promise<Player[] | null> {
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      resetPlayersList();
      const allPlayers = await PlayerRepositoriesImpl.PlayerModel.findAll({
        order: [['win_rate', 'DESC']]
      });
      for (let i = 0; i < allPlayers.length; i++) {
        players.push(this.getPlayerClass(allPlayers[i]));
      }

      return players;
    }
    return null;
  }
  async updatePlayer(player: Player) {
    const PlayerData = this.getPlayerData(player);
    console.log(PlayerData);
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      const playerData = this.getPlayerData(player);
      try {
        await PlayerRepositoriesImpl.PlayerModel.update(playerData, {
          where: { id_player: playerData.id_player }
        });
      } catch (error) {
        console.error('Error updating player', error);
      }
    }
  }
  async deletePlayer(id: number): Promise<void> {
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      await PlayerRepositoriesImpl.PlayerModel.destroy({
        where: { id_player: id }
      });
    }
  }
  async findWinner(): Promise<Player | null> {
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      resetPlayersList();
      const winner = await PlayerRepositoriesImpl.PlayerModel.findAll({
        order: [['win_rate', 'DESC']],
        limit: 1
      });

      return winner;
    }
    return null;
  }
  async findLoser(): Promise<Player | null> {
    if (PlayerRepositoriesImpl.PlayerModel != null) {
      resetPlayersList();
      const loser = await PlayerRepositoriesImpl.PlayerModel.findAll({
        order: [['win_rate', 'ASC']],
        limit: 1
      });

      return loser;
    }
    return null;
  }
}

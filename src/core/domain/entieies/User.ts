export default class User {
  private idUser: number | undefined;
  private username: string;
  private password: string;
  private date: Date;

  constructor(username: string, password: string, date: Date) {
    this.username = username;
    this.password = password;
    this.date = date;
  }

  getId(): number | undefined {
    return this.idUser;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getDate(): Date {
    return this.date;
  }

  setId(newId: number): void {
    this.idUser = newId;
  }

  setUsername(newUsername: string): void {
    this.username = newUsername;
  }

  setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  setDate(): void {
    this.date = new Date();
  }
}

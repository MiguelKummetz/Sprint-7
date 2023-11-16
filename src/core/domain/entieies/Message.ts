export default class Message {
  private idMessage: number | undefined;
  private userId: number;
  private content: string;
  private date: Date | undefined;

  constructor(userId: number, content: string, date?: Date) {
    this.userId = userId;
    this.content = content;
    this.date = date;
  }

  getId(): number | undefined {
    return this.idMessage;
  }

  getUserId(): number {
    return this.userId;
  }

  getContent(): string {
    return this.content;
  }

  getDate(): Date | undefined {
    return this.date;
  }

  setId(newId: number): void {
    this.idMessage = newId;
  }

  setUserId(newUserId: number): void {
    this.userId = newUserId;
  }

  setContent(newContent: string): void {
    this.content = newContent;
  }

  setDate(): void {
    this.date = new Date();
  }
}

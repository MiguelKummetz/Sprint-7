import Message from '../domain/entieies/Message';

export interface MessageRepository {
  create(message: Message): Promise<void>;
  findById(id: number): Promise<Message | null>;
  findAll(): Promise<Message[] | null>;
  update(message: Message): Promise<void>;
  delete(id: number): Promise<void>;
}

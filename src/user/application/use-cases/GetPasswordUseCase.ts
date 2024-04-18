import { UserRepository } from '../../domain/UserRepository';

export class GetPasswordUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(email: string): Promise<string | null> {
    try {
      const encoded = await this.userRepository.getPassword(email);
      return encoded;
    } catch (error) {
      return null;
    }
  }
}
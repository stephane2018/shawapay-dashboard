import { TOKEN_KEY } from "@/core/config/constante";
import { LocalStorageAdapter } from "./local-storage-adapter";

export class TokenManager {
  private static instance: TokenManager;
  private storage: LocalStorageAdapter;
  private token: string | null = null;

  private constructor() {
    this.storage = new LocalStorageAdapter();
    this.initializeToken();
  }

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  private initializeToken(): void {
    this.token = this.storage.get(TOKEN_KEY);
  }

  public getToken(): string | null {
    if (!this.token) {
      this.token = this.storage.get(TOKEN_KEY);
    }
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
    this.storage.set(TOKEN_KEY, token);
  }

  public clearToken(): void {
    this.token = null;
    this.storage.remove(TOKEN_KEY);
  }

  public hasToken(): boolean {
    return this.getToken() !== null;
  }
}

export const tokenManager = TokenManager.getInstance();

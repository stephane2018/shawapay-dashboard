import { TOKEN_KEY } from "../../config/constante";
import { LocalStorageAdapter } from "./local-storage-adapter";
import { httpClient } from "../http-client";
import { CryptoManager } from "../crypto-manager";

export class TokenManager {
  private static instance: TokenManager;
  private storage: LocalStorageAdapter;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number = 0;

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
    try {
      const encryptedToken = this.storage.get(TOKEN_KEY);
      if (encryptedToken) {
        this.token = CryptoManager.decrypt(encryptedToken);
      }
      
      const encryptedRefreshToken = this.storage.get(`${TOKEN_KEY}_refresh`);
      if (encryptedRefreshToken) {
        this.refreshToken = CryptoManager.decrypt(encryptedRefreshToken);
      }
      
      const expiry = this.storage.get(`${TOKEN_KEY}_expiry`);
      if (expiry) {
        this.tokenExpiry = parseInt(expiry, 10);
      }
    } catch (error) {
      console.error('Failed to initialize tokens:', error);
      this.clearTokens();
    }
  }

  public getToken(): string | null {
    if (!this.token || this.isTokenExpired()) {
      return null;
    }
    return this.token;
  }

  public setToken(token: string, expiresIn?: number): void {
    this.token = token;
    this.tokenExpiry = expiresIn ? Date.now() + (expiresIn * 1000) : Date.now() + (60 * 60 * 1000); // 1 hour default
    
    try {
      this.storage.set(TOKEN_KEY, CryptoManager.encrypt(token));
      this.storage.set(`${TOKEN_KEY}_expiry`, this.tokenExpiry.toString());
    } catch (error) {
      console.error('Failed to encrypt and store token:', error);
    }
  }

  public setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
    try {
      this.storage.set(`${TOKEN_KEY}_refresh`, CryptoManager.encrypt(refreshToken));
    } catch (error) {
      console.error('Failed to encrypt and store refresh token:', error);
    }
  }

  public async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await httpClient.post('/auth/refresh', {
        refreshToken: this.refreshToken
      }, { skipAuth: true });

      const { token, expiresIn, refreshToken: newRefreshToken } = response as any;
      
      this.setToken(token, expiresIn);
      if (newRefreshToken) {
        this.setRefreshToken(newRefreshToken);
      }

      return token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      throw error;
    }
  }

  public clearToken(): void {
    this.clearTokens();
  }

  private clearTokens(): void {
    this.token = null;
    this.refreshToken = null;
    this.tokenExpiry = 0;
    this.storage.remove(TOKEN_KEY);
    this.storage.remove(`${TOKEN_KEY}_refresh`);
    this.storage.remove(`${TOKEN_KEY}_expiry`);
  }

  public hasToken(): boolean {
    return this.getToken() !== null;
  }

  public isTokenExpired(): boolean {
    return Date.now() >= this.tokenExpiry;
  }

  public getTimeUntilExpiry(): number {
    return Math.max(0, this.tokenExpiry - Date.now());
  }

  public shouldRefreshToken(): boolean {
    const timeUntilExpiry = this.getTimeUntilExpiry();
    return timeUntilExpiry < (5 * 60 * 1000); // Refresh if less than 5 minutes left
  }

  public async refreshTokenIfNeeded(): Promise<void> {
    if (this.shouldRefreshToken() && this.refreshToken) {
      await this.refreshAccessToken();
    }
  }
}

export const tokenManager = TokenManager.getInstance();

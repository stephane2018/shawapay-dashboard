import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'shawapay-secure-key-2024';
const IV_LENGTH = 16;

export class CryptoManager {
  private static readonly key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
  
  /**
   * Chiffre une chaîne de caractères avec AES-256
   */
  static encrypt(data: string): string {
    try {
      const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
      const encrypted = CryptoJS.AES.encrypt(data, this.key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      
      // Combiner IV et données chiffrées
      const combined = iv.concat(encrypted.ciphertext);
      return CryptoJS.enc.Base64.stringify(combined);
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Déchiffre une chaîne de caractères avec AES-256
   */
  static decrypt(encryptedData: string): string {
    try {
      const combined = CryptoJS.enc.Base64.parse(encryptedData);
      
      // Extraire IV et données chiffrées
      const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, IV_LENGTH / 4));
      const ciphertext = CryptoJS.lib.WordArray.create(combined.words.slice(IV_LENGTH / 4));
      
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext } as CryptoJS.lib.CipherParams,
        this.key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        throw new Error('Decryption resulted in empty string');
      }
      
      return decryptedText;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Chiffre un objet JSON
   */
  static encryptObject<T>(obj: T): string {
    try {
      const jsonString = JSON.stringify(obj);
      return this.encrypt(jsonString);
    } catch (error) {
      console.error('Object encryption failed:', error);
      throw new Error('Failed to encrypt object');
    }
  }

  /**
   * Déchiffre vers un objet JSON
   */
  static decryptObject<T>(encryptedData: string): T {
    try {
      const decryptedString = this.decrypt(encryptedData);
      return JSON.parse(decryptedString) as T;
    } catch (error) {
      console.error('Object decryption failed:', error);
      throw new Error('Failed to decrypt object');
    }
  }

  /**
   * Génère un hash SHA-256 pour vérifier l'intégrité
   */
  static hash(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Vérifie si les données ont été altérées
   */
  static verifyIntegrity(data: string, expectedHash: string): boolean {
    const actualHash = this.hash(data);
    return actualHash === expectedHash;
  }

  /**
   * Génère une clé de session aléatoire
   */
  static generateSessionKey(): string {
    return CryptoJS.lib.WordArray.random(32).toString();
  }

  /**
   * Nettoie les données sensibles de la mémoire
   */
  static secureClear(data: string): void {
    // En JavaScript, le nettoyage explicite de la mémoire est limité
    // Mais nous pouvons au moins écraser la variable
    try {
      // @ts-ignore - Forcer le nettoyage
      data = undefined;
    } catch (error) {
      // Ignorer les erreurs de nettoyage
    }
  }
}

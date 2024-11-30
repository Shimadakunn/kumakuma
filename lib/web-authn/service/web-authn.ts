import { ECDSASigValue } from '@peculiar/asn1-ecc';
import { AsnParser } from '@peculiar/asn1-schema';
import * as Application from 'expo-application';
import { Platform } from 'react-native';
import * as passkey from 'react-native-passkeys';
import { Hex, toHex } from 'viem';

import { CreateCredential, P256Credential, P256Signature } from '~/lib/web-authn/types';
import { concatUint8Arrays, shouldRemoveLeadingZero } from '~/utils';

export * from '~/lib/web-authn/types';

// Helper functions for base64URL encoding/decoding
function bufferToBase64URLString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  for (const charCode of bytes) {
    str += String.fromCharCode(charCode);
  }
  const base64String = btoa(str);
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function utf8StringToBuffer(value: string): ArrayBuffer {
  return new TextEncoder().encode(value);
}

export class WebAuthn {
  private static bundleId = Application.applicationId?.split('.').reverse().join('.');

  private static async _generateRandomBytes(): Promise<Buffer> {
    const array = new Uint8Array(16);
    if (Platform.OS === 'web') {
      window.crypto.getRandomValues(array);
    } else {
      // Use React Native's crypto
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    return Buffer.from(array);
  }

  public static isSupportedByBrowser(): boolean {
    if (Platform.OS === 'web') {
      return (
        window?.PublicKeyCredential !== undefined &&
        typeof window.PublicKeyCredential === 'function'
      );
    }
    return passkey.isSupported();
  }

  public static async platformAuthenticatorIsAvailable(): Promise<boolean> {
    if (Platform.OS === 'web') {
      if (!this.isSupportedByBrowser()) return false;
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
    return passkey.isSupported();
  }

  public static async create({ username }: { username: string }): Promise<CreateCredential | null> {
    if (!this.isSupportedByBrowser()) return null;

    const challenge = bufferToBase64URLString(utf8StringToBuffer('random-challenge'));

    if (Platform.OS === 'web') {
      // Original web implementation
      // ... existing web implementation code ...
      return null;
    } else {
      // React Native implementation
      try {
        const response = await passkey.create({
          challenge,
          rp: {
            id: Platform.select({
              ios: this.bundleId,
              android: this.bundleId?.replaceAll('_', '-'),
            }),
            name: 'passkeys-4337/smart-wallet',
          },
          user: {
            id: bufferToBase64URLString(await this._generateRandomBytes()),
            name: username,
            displayName: username,
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          authenticatorSelection: {
            userVerification: 'required',
            residentKey: 'required',
          },
        });

        if (!response) return null;

        const publicKey = response.response.getPublicKey();
        if (!publicKey) return null;

        // Convert public key to x, y coordinates
        // Note: You'll need to implement the conversion based on your needs
        const x = toHex(publicKey.slice(1, 33));
        const y = toHex(publicKey.slice(33, 65));

        return {
          rawId: response.rawId,
          pubKey: { x, y },
        };
      } catch (error) {
        console.error('Passkey creation error:', error);
        return null;
      }
    }
  }

  public static async get(challenge?: Hex): Promise<P256Credential | null> {
    if (!this.isSupportedByBrowser()) return null;

    if (Platform.OS === 'web') {
      // Original web implementation
      // ... existing web implementation code ...
      return null;
    } else {
      try {
        const challengeString = challenge
          ? bufferToBase64URLString(Buffer.from(challenge.slice(2), 'hex'))
          : bufferToBase64URLString(utf8StringToBuffer('random-challenge'));

        const response = await passkey.get({
          rpId: Platform.select({
            ios: this.bundleId,
            android: this.bundleId?.replaceAll('_', '-'),
          }),
          challenge: challengeString,
        });

        if (!response) return null;

        // Convert the response to match your P256Credential type
        const signature = parseSignature(new Uint8Array(response.response.signature));

        return {
          rawId: response.rawId,
          clientData: {
            type: response.response.clientDataJSON.type,
            challenge: response.response.clientDataJSON.challenge,
            origin: response.response.clientDataJSON.origin,
            crossOrigin: response.response.clientDataJSON.crossOrigin,
          },
          authenticatorData: toHex(new Uint8Array(response.response.authenticatorData)),
          signature,
        };
      } catch (error) {
        console.error('Passkey get error:', error);
        return null;
      }
    }
  }

  // ... rest of the existing helper functions ...
}

// Parse the signature from the authenticator and remove the leading zero if necessary
export function parseSignature(signature: Uint8Array): P256Signature {
  const parsedSignature = AsnParser.parse(signature, ECDSASigValue);
  let rBytes = new Uint8Array(parsedSignature.r);
  let sBytes = new Uint8Array(parsedSignature.s);
  if (shouldRemoveLeadingZero(rBytes)) {
    rBytes = rBytes.slice(1);
  }
  if (shouldRemoveLeadingZero(sBytes)) {
    sBytes = sBytes.slice(1);
  }
  const finalSignature = concatUint8Arrays([rBytes, sBytes]);
  return {
    r: toHex(finalSignature.slice(0, 32)),
    s: toHex(finalSignature.slice(32)),
  };
}

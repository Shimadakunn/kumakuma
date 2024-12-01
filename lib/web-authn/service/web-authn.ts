// import { Platform } from 'react-native';
// import base64 from 'react-native-base64';
// import { Passkey, PasskeyCreateResult } from 'react-native-passkey';

// // Helper function to encode ArrayBuffer to base64
// const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
//   return base64.encode(String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer))));
// };

// // Helper function to decode base64 to ArrayBuffer
// const base64ToArrayBuffer = (base64String: string) => {
//   const binaryString = base64.decode(base64String);
//   const bytes = new Uint8Array(binaryString.length);
//   for (let i = 0; i < binaryString.length; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes.buffer;
// };

// export class WebAuthn {
//   // Create new credential (registration)
//   public static async create(username: string) {
//     console.log('creating credential');
//     try {
//       // Use this method to check if passkeys are supported on the device

//       const isSupported: boolean = Passkey.isSupported();
//       console.log('public key credential creation options');
//       const publicKeyCredentialCreationOptions = {
//         challenge: arrayBufferToBase64(Uint8Array.from('random-challenge', (c) => c.charCodeAt(0))),
//         rp: {
//           name: 'Your App Name',
//           id: 'yourapp.com',
//         },
//         user: {
//           id: base64.encode(username),
//           name: username,
//           displayName: username,
//         },
//         pubKeyCredParams: [
//           {
//             type: 'public-key' as const,
//             alg: -7, // ES256
//           },
//           {
//             type: 'public-key' as const,
//             alg: -257, // RS256
//           },
//         ],
//         timeout: 60000,
//         attestation: 'none' as AttestationConveyancePreference,
//         authenticatorSelection: {
//           authenticatorAttachment: (Platform.OS === 'ios'
//             ? 'platform'
//             : 'cross-platform') as AuthenticatorAttachment,
//           requireResidentKey: true,
//           userVerification: 'required' as UserVerificationRequirement,
//         },
//       };

//       console.log('getting credential');
//       const result: PasskeyCreateResult = await Passkey.create(publicKeyCredentialCreationOptions);

//       console.log('credential success', result);
//       // Format the response for your server
//       const response = {
//         id: result.id,
//         rawId: result.rawId,
//         type: result.type,
//         response: {
//           attestationObject: result.response.attestationObject,
//           clientDataJSON: result.response.clientDataJSON,
//         },
//       };

//       // Send response to your server for verification
//       console.log('returning response');
//       return response;
//     } catch (error) {
//       console.error('Error creating credential:', error);
//       throw error;
//     }
//   }

//   // Get credential (authentication)
//   async getCredential() {
//     try {
//       // Get challenge from your server
//       const challenge = await this.getAuthenticationChallenge();

//       const publicKeyCredentialRequestOptions = {
//         challenge: base64ToArrayBuffer(challenge),
//         timeout: 60000,
//         rpId: 'yourapp.com',
//         userVerification: 'required' as UserVerificationRequirement,
//         allowCredentials: [], // Empty array for discoverable credentials
//       };

//       const assertion = (await navigator.credentials.get({
//         publicKey: publicKeyCredentialRequestOptions,
//       })) as PublicKeyCredential;

//       // Format the response for your server
//       const response = {
//         id: assertion.id,
//         rawId: arrayBufferToBase64(assertion.rawId),
//         type: assertion.type,
//         response: {
//           authenticatorData: arrayBufferToBase64(
//             (assertion.response as AuthenticatorAssertionResponse).authenticatorData
//           ),
//           clientDataJSON: arrayBufferToBase64(assertion.response.clientDataJSON),
//           signature: arrayBufferToBase64(
//             (assertion.response as AuthenticatorAssertionResponse).signature
//           ),
//           userHandle: (assertion.response as AuthenticatorAssertionResponse).userHandle
//             ? arrayBufferToBase64(
//                 (assertion.response as AuthenticatorAssertionResponse).userHandle!
//               )
//             : null,
//         },
//       };

//       // Send response to your server for verification
//       return await this.verifyAuthentication(response);
//     } catch (error) {
//       console.error('Error getting credential:', error);
//       throw error;
//     }
//   }

//   // Mock server endpoints - replace these with your actual server calls
//   async getRegistrationChallenge(username: string) {
//     // Call your server to get a challenge
//     return 'server-generated-challenge-base64';
//   }

//   async verifyRegistration(response: any) {
//     // Send registration data to your server for verification
//     return true;
//   }

//   async getAuthenticationChallenge() {
//     // Call your server to get a challenge
//     return 'server-generated-challenge-base64';
//   }

//   async verifyAuthentication(response: any) {
//     // Send authentication data to your server for verification
//     return true;
//   }
// }

//A seguinte classe é referente à resposta obtida pela API de cadastro do FIREBASE obtida em:
// https://firebase.google.com/docs/reference/rest/auth?hl=en#section-sign-in-email-password
export class ResponseSign {
    idToken: string; //A Firebase Auth ID token for the authenticated user.
    email: string; //The email for the authenticated user.
    refreshToken: string; //A Firebase Auth refresh token for the authenticated user.
    expiresIn: string; //The number of seconds in which the ID token expires.
    localId: string; //	The uid of the authenticated user.
    registered?: boolean;
}
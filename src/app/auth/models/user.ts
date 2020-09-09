// Classe definida com base no payload de https://firebase.google.com/docs/reference/rest/auth?hl=en#section-sign-in-email-password
//Os campos são baseados no payload, mas não são os mesmos.
export class User {
    constructor(
        public email: string,	
        public id: string,	
        private _token: string,	
        public _tokenExpirationDate: Date,
    ) { }

    get Token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate ){ return null;}
        return this._token
    }
}
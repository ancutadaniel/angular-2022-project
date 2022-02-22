export class User {
  // private is a typescript shortcut of automatically storing arguments
  // of the constructor in properties of the class by adding an ancestor in front of the argument
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}
  // getter here is a special type of property
  // can be access like user.token
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

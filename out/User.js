"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(responseUser) {
        this.repos = [];
        this.login = responseUser.login;
        this.bio = responseUser.bio;
        this.name = responseUser.name;
        this.avatar_url = responseUser.avatar_url;
    }
    return User;
}());
exports.User = User;

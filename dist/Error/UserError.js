"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongPasswordError = exports.CannotFoundUserError = void 0;
class CannotFoundUserError extends Error {
    constructor(username) {
        super(`L'utilisateur ${username} est introuvable.`);
    }
}
exports.CannotFoundUserError = CannotFoundUserError;
class WrongPasswordError extends Error {
    constructor(username) {
        super(`Le mot de passe utilisé pour l'utilsateur: ${username} est faux.`);
    }
}
exports.WrongPasswordError = WrongPasswordError;
//# sourceMappingURL=UserError.js.map
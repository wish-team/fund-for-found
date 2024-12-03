"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const server_1 = require("../../../3f-auth/utils/supabase/server");
let AuthMiddleware = class AuthMiddleware {
    async use(req, res, next) {
        try {
            const supabase = (0, server_1.createClient)();
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new common_1.UnauthorizedException('Missing or invalid Authorization header');
            }
            const accessToken = authHeader.split(' ')[1];
            const { data, error } = await supabase.auth.getUser(accessToken);
            if (error || !data?.user) {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
            req['user'] = data.user;
            next();
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map
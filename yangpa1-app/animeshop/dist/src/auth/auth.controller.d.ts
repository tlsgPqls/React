import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(dto: RegisterDto): Promise<{
        email: string;
        name: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            name: string;
            profileImage: {
                id: number;
                url: string;
                storedName: string;
                userId: number;
            } | null;
        };
    }>;
    logout(): {
        success: boolean;
        message: string;
    };
    getProfile(req: any): Promise<{
        success: boolean;
        data: {
            profileImage: {
                id: number;
                url: string;
                storedName: string;
                userId: number;
            } | null;
        } & {
            email: string;
            name: string;
            password: string;
            id: number;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
}

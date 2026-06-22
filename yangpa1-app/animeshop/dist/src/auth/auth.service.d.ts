import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
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
}

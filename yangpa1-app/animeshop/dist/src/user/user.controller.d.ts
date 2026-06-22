import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { type AuthUser } from '../common/current-user.decorator';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    getMyProfile(user: AuthUser): Promise<{
        data: AuthUser;
    }>;
    uploadProfileImage(file: Express.Multer.File, user: AuthUser): Promise<{
        url: any;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    remove(id: string): Promise<{
        deleted: {
            email: string;
            name: string;
            password: string;
            id: number;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
}

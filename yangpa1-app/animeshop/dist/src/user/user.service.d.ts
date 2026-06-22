import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    addProfileImage(userId: number, file: Express.Multer.File): Promise<{
        url: any;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    findOne(id: number): Promise<{
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
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    remove(id: number): Promise<{
        deleted: {
            email: string;
            name: string;
            password: string;
            id: number;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    createUser(data: {
        email: string;
        name: string;
        password: string;
        role: Role;
    }): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    findByEmail(email: string): Promise<({
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
    }) | null>;
}

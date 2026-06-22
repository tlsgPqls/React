import { Role } from '@prisma/client';
export interface AuthUser {
    id: number;
    email: string;
    role: Role;
}
export declare const CurrentUser: (...dataOrPipes: (keyof AuthUser | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;

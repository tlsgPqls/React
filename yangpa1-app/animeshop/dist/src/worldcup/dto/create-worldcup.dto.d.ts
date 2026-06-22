export declare class CreateWorldcupItemDto {
    name: string;
    imageUrl: string;
}
export declare class CreateWorldcupDto {
    title: string;
    desc?: string;
    items: CreateWorldcupItemDto[];
}

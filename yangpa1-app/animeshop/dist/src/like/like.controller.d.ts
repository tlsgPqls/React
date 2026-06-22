import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    create(createLikeDto: CreateLikeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLikeDto: UpdateLikeDto): string;
    remove(id: string): string;
}

import { InjectRepository } from '@nestjs/typeorm';
import { CreatePileHeightDto } from './dto/create-pile-height.dto';
import { UpdatePileHeightDto } from './dto/update-pile-height.dto';
import { PileHeight } from './entities/pile-height.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ref, uploadBytes, getStorage } from 'firebase/storage'
import { EmpService } from 'src/emp/emp.service';

@Injectable()
export class PileHeightService {
  constructor(@InjectRepository(PileHeight)
  private pileHeightRepo: Repository<PileHeight>,
    private readonly empService: EmpService
  ) { }

  async processUploadedFile(file: Express.Multer.File) {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, `images/${file.originalname}`);
      await uploadBytes(fileRef, file.buffer);
      return 'success'
    } catch (error) {
      throw error;
    }
  }

  async create(createPileHeightDto: CreatePileHeightDto): Promise<any> {
    const jobId = createPileHeightDto.order_height;
    const savedPiles = [];

    for (const pile of createPileHeightDto.piles) {

      const savedPile = await this.pileHeightRepo.save({
        total_height: pile.total_height,
        palate_height: pile.palate_height,
        net_height: pile.net_height,
        order_height: { id: jobId },
        pic1_name: pile.pic1_name,
        pic2_name: pile.pic2_name,
        label: pile.label
      });
      savedPiles.push(savedPile);
    }
    return savedPiles;
  }

  findAll() {
    return `This action returns all pileHeight`;
  }

  async findOne(id: number) {
    const res = await this.pileHeightRepo.findOne({ where: { id: id } });
    return res;
  }

  update(id: number, updatePileHeightDto: UpdatePileHeightDto) {
    return `This action updates a #${id} pileHeight`;
  }

  remove(id: number) {
    return `This action removes a #${id} pileHeight`;
  }
}

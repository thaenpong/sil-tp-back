import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePileDto } from './dto/create-pile.dto';
import { UpdatePileDto } from './dto/update-pile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pile } from './entities/pile.entity';
import { Repository } from 'typeorm';
import { SilUpdatePileDto } from './dto/sil-update-pile.dto';

@Injectable()
export class PileService {
  constructor(@InjectRepository(Pile)
  private pileRes: Repository<Pile>) {
  }

  async create(createPileDto: CreatePileDto) {
    await this.pileRes.save(createPileDto);
  }

  async findAll() {
    return await this.pileRes.find();
  }

  async SilUpdate(SilUpdatePilesDto: SilUpdatePileDto[]) {
    try {
      // Initialize arrays to hold update results and errors
      const updateResults = [];
      const notUpdatedIds = [];

      for (const dto of SilUpdatePilesDto) {
        const id = dto.LogisticPileId;
        const data = {
          sil_created_at: String(new Date()),
          sil_created: true,
          sil_pile_id: dto.PileId,
        };

        // Perform the update operation with criteria based on id
        const result = await this.pileRes.update({ id }, data);

        // Check if the update was successful
        if (result.affected === 0) {
          // If no rows were updated, add the ID to the notUpdatedIds array
          notUpdatedIds.push({ LogisticPileId: id, PileId: dto.PileId });
        } else {
          // If the update was successful, add the result to the updateResults array
          updateResults.push({ LogisticPileId: id, PileId: dto.PileId });
        }
      }

      // Return an object containing both successful updates and IDs that were not updated
      return {
        updated: updateResults,
        notUpdated: notUpdatedIds,
      };
    } catch (error) {
      // Handle error appropriately
      console.error('Error updating SIL:', error);
      throw new Error('Internal server error');
    }
  }

  async findUncreated(id: number) {
    try {
      // Fetch orders where sil_created is false
      const piles = await this.pileRes.find({ where: { sil_created: false, order: { sil_order_id: id } } });
      // Return the array of orders with pile counts
      return piles;
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching uncreated SILs:', error);
      throw error; // Or handle the error as needed
    }
  }

  async SilUpdateOne(SilUpdatePilesDto: SilUpdatePileDto) {
    try {
      const id = SilUpdatePilesDto.LogisticPileId;
      const data = {
        sil_created_at: String(new Date()),
        sil_created: true,
        sil_pile_id: SilUpdatePilesDto.PileId,
      };

      const result = await this.pileRes.update({ id }, data);

      if (result.affected === 0) {
        throw new BadRequestException('LogisticPileId not found');
      } else {
        return { updated: { LogisticPileId: id, PileId: SilUpdatePilesDto.PileId } };
      }

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error updating SIL:', error);
      throw new InternalServerErrorException('Failed to update SIL');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pile`;
  }

  update(id: number, updatePileDto: UpdatePileDto) {
    return `This action updates a #${id} pile`;
  }

  remove(id: number) {
    return `This action removes a #${id} pile`;
  }
}

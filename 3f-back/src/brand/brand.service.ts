// brands.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepository.find();
  }

  findOne(id: string) {
    return this.brandRepository.findOne({ where: { brand_id: id } });
  }

  create(createBrandDto: CreateBrandDto) {
    const brand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(brand);
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.update(id, updateBrandDto);
  }

  remove(id: string) {
    return this.brandRepository.delete(id);
  }
}
// import { Injectable } from '@nestjs/common';
// import { CreateBrandDto } from './dto/create-brand.dto';
// import { UpdateBrandDto } from './dto/update-brand.dto';
// import { createClient } from '../../utils/supabase/serever';

// @Injectable()
// export class BrandService {
//   supabaseClient = createClient();

//   async create(createBrandDto: CreateBrandDto): Promise<Brand> {
//     const { brandName, ownerId, brandImage } = createBrandDto;
//     return this.supabaseClient
//       .from('BRAND')
//       .insert([
//         { BRAND_NAME: brandName, OWNER_ID: ownerId, BRAND_IMAGE: brandImage },
//       ])
//       .then((response) => response.data[0]);
//   }

//   async findAll(): Promise<Brand[]> {
//     return this.supabaseClient
//       .from('BRAND')
//       .select('*')
//       .then((response) => response.data);
//   }

//   async findById(brandId: string): Promise<Brand> {
//     return this.supabaseClient
//       .from('BRAND')
//       .select('*')
//       .eq('BRAND_ID', brandId)
//       .single()
//       .then((response) => response.data);
//   }

//   update(id: number, updateBrandDto: UpdateBrandDto) {
//     return `This action updates a #${id} brand`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} brand`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Brand, Prisma } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async brand(
    brandWhereUniqueInput: Prisma.BrandWhereUniqueInput,
  ): Promise<Brand | null> {
    return this.prisma.brand.findUnique({
      where: brandWhereUniqueInput,
    });
  }

  async createBrand(data: Prisma.BrandCreateInput): Promise<Brand> {
    return this.prisma.brand.create({
      data,
    });
  }

  async updateBrand(params: {
    where: Prisma.BrandWhereUniqueInput;
    data: Prisma.BrandUpdateInput;
  }): Promise<Brand> {
    const { where, data } = params;
    return this.prisma.brand.update({
      data,
      where,
    });
  }

  async deleteBrand(where: Prisma.BrandWhereUniqueInput): Promise<Brand> {
    return this.prisma.brand.delete({
      where,
    });
  }
}

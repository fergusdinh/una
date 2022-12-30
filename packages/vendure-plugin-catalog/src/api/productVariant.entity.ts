import { DeepPartial } from '@vendure/common/lib/shared-types';
import { VendureEntity } from '@vendure/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class ProductVariantEntity extends VendureEntity {
  constructor(input?: DeepPartial<ProductVariantEntity>) {
    super(input);
  }

  @Column()
  totalAvailable?: number;

  @Column()
  totalVariant?: number;
}

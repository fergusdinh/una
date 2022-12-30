import { DeepPartial } from '@vendure/common/lib/shared-types';
import { VendureEntity } from '@vendure/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class SortPriceBetween extends VendureEntity {
  constructor(input?: DeepPartial<SortPriceBetween>) {
    super(input);
  }

  @Column()
  priceBetween?: string;
}

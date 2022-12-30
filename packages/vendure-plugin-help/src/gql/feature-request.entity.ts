import { DeepPartial } from '@vendure/common/lib/shared-types';
import { VendureEntity } from '@vendure/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class FeatureRequestEntity extends VendureEntity {
  constructor(input?: DeepPartial<FeatureRequestEntity>) {
    super(input);
  }

  @Column()
  content!: String;
}

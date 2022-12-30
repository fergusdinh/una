import { Column, Entity } from 'typeorm';
import { DeepPartial, VendureEntity } from '@vendure/core';

/**
 * Here we define a new database entity. Passing this in to the plugin's `entities` array
 * will instruct TypeORM to create the new database table and make the entity available
 * to query in your plugin code.
 */
@Entity()
export class ConnectorChannelEntity extends VendureEntity {
  constructor(input?: DeepPartial<ConnectorChannelEntity>) {
    super(input);
  }

  @Column()
  channelId!: string;

  @Column({ type: 'text' })
  settings!: string;

  @Column()
  type!: string;
}

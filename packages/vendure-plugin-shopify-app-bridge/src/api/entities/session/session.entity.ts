import { Column, Entity, PrimaryColumn } from 'typeorm';
import { OnlineAccessInfo, Session } from '@shopify/shopify-api';
@Entity()
export class SessionEntity extends Session {
  @PrimaryColumn()
  id!: string;

  @Column()
  shop!: string;

  @Column()
  state!: string;

  @Column()
  isOnline!: boolean;

  @Column({ nullable: true })
  scope!: string;

  @Column({ type: Date, nullable: true })
  expires!: Date;

  @Column({ nullable: true })
  accessToken!: string;

  @Column({ type: 'text', nullable: true })
  onlineAccessInfo?: OnlineAccessInfo;
}

import { Injectable } from '@nestjs/common';
import { SessionStorage } from '@nestjs-shopify/core';
import { OnlineAccessInfo } from '@shopify/shopify-api';
import { TransactionalConnection } from '@vendure/core';
import { SessionEntity } from '../../api/entities/session';

@Injectable()
export class DatabaseSessionStorage implements SessionStorage {
  constructor(private connection: TransactionalConnection) {}

  async storeSession(session: SessionEntity): Promise<boolean> {
    let entity = await this.loadSession(session.id);
    if (!entity) {
      await this.connection.getRepository(SessionEntity).save({
        id: session.id,
        shop: session.shop,
        state: session.state,
        isOnline: session.isOnline,
        scope: session.scope,
        expires: session.expires,
        accessToken: session.accessToken,
        onlineAccessInfo: JSON.stringify(
          session.onlineAccessInfo
        ) as unknown as OnlineAccessInfo,
      });
    } else {
      await this.connection.getRepository(SessionEntity).update(
        { id: session.id },
        {
          shop: session.shop,
          state: session.state,
          isOnline: session.isOnline,
          scope: session.scope,
          expires: session.expires,
          accessToken: session.accessToken,
          onlineAccessInfo: JSON.stringify(
            session.onlineAccessInfo
          ) as unknown as OnlineAccessInfo,
        }
      );
    }
    return true;
  }

  async loadSession(id: string): Promise<SessionEntity> {
    return (await this.connection
      .getRepository(SessionEntity)
      .findOne({ id })) as SessionEntity;
  }

  async deleteSession(id: string): Promise<boolean> {
    try {
      await this.connection.getRepository(SessionEntity).delete({ id });
      return true;
    } catch (err) {
      throw err;
    }
  }

  async deleteSessions?(ids: string[]): Promise<boolean> {
    const sessions = await this.connection
      .getRepository(SessionEntity)
      .createQueryBuilder('session')
      .where('session.id IN (:...id)', { id: ids })
      .getMany();
    sessions.forEach(async (session) => {
      await this.connection
        .getRepository(SessionEntity)
        .delete({ id: session.id });
    });
    return true;
  }

  async findSessionsByShop?(shop: string): Promise<SessionEntity[]> {
    const sessions = await this.connection
      .getRepository(SessionEntity)
      .find({ shop });
    return sessions;
  }
}

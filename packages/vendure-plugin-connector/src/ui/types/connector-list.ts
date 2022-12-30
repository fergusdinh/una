import { ID } from '@vendure/core';

export interface ConnectorsExport {
  type: string;
  name: string;
  icon: string;
  description: string;
}

export interface ConnectorResponse {
  createdAt: Date;
  updatedAt: Date;
  type: string;
  channelId: string;
  settings: string;
  id: ID;
}

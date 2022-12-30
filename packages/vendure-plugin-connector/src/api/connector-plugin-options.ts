import { VendureEntity } from '@vendure/core';
import { ConnectorDefault } from './connectors/default.connector';

export interface ConnectorPluginOptions {
  /**
   * Do a POST or a GET request
   */
  httpMethod: 'GET' | 'POST';
  /**
   * Wait for more events for the same channel before calling connector
   * Delay is in ms
   */
  delay?: number;
  /**
   * Disable the plugin. Default is false
   */
  disabled?: boolean;
  /**
   * Register connector
   */
  connectors: ConnectorDefault[];
  /**
   * Register entity
   */
  entities: VendureEntity[];
  /**
   * endpint
   */
  endpoint: string;
  /**
   * method authentication
   */
  // token
  token?: string;
}

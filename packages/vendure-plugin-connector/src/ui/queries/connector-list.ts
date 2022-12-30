import gql from 'graphql-tag';

export const getAvailableConnectorsExportQuery = gql`
  query availableConnectorsExport {
    availableConnectorsExport {
      type
      name
      icon
      description
    }
  }
`;

export const getAllConnectorsConnectedOfChannel = gql`
  query getAllConnectorsConnectedOfChannel {
    getAllConnectorsConnectedOfChannel {
      type
      channelId
      settings
    }
  }
`;

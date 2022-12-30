import gql from 'graphql-tag';

export const getConnectorByTypeQuery = gql`
  query getConnectorByType($type: String!) {
    getConnectorByType(type: $type) {
      type
      settings
    }
  }
`;

export const getConnectorConfigUi = gql`
  query getConnectorConfigUi($type: String!) {
    getConnectorConfigUi(type: $type)
  }
`;

export const getAvailableEntitiesExportQuery = gql`
  query availableEntitiesExport {
    availableEntitiesExport
  }
`;

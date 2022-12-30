import { SelectorParams } from '../../types';

export const selector = (input: SelectorParams) => {
  return {
    repositoryName: input.repositoryName,
    repositoryLocationName: input.repositoryLocationName,
    pipelineName: input.pipelineName,
  };
};

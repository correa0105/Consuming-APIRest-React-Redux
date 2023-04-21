import React from 'react';
import PropTypes from 'prop-types';

import { ContainerLoading } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return null;
  return (
    <ContainerLoading>
      <div>
        <div className="loading-spinner" />
      </div>
    </ContainerLoading>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

Loading.defaultProps = {
  isLoading: false,
};

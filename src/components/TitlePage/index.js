import React from 'react';
import PropTypes from 'prop-types';

import { Title } from './styled';

export default function TitlePage({ title, component }) {
  return (
    <Title>
      {title}
      {component || null}
    </Title>
  );
}

TitlePage.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.element,
};

TitlePage.defaultProps = {
  component: null,
};

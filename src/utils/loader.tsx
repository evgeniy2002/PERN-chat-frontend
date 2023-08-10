import React from 'react';
import ContentLoader from 'react-content-loader';

const UserLoader = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={55}
    viewBox="0 0 300 50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="10" y="5" rx="5" ry="5" width="280" height="48" />
  </ContentLoader>
);

export default UserLoader;

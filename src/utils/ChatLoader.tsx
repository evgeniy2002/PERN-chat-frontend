import React from 'react';
import ContentLoader from 'react-content-loader';

const ChatLoader = () => (
  <ContentLoader
    speed={2}
    width={630}
    height={440}
    viewBox="0 0 630 440"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="29" cy="74" r="23" />
    <rect x="66" y="49" rx="0" ry="0" width="102" height="22" />
    <rect x="186" y="50" rx="0" ry="0" width="52" height="19" />
    <rect x="70" y="87" rx="0" ry="0" width="173" height="52" />
    <circle cx="365" cy="216" r="23" />
    <rect x="402" y="191" rx="0" ry="0" width="102" height="22" />
    <rect x="522" y="192" rx="0" ry="0" width="52" height="19" />
    <rect x="406" y="229" rx="0" ry="0" width="173" height="52" />
    <circle cx="368" cy="370" r="23" />
    <rect x="405" y="345" rx="0" ry="0" width="102" height="22" />
    <rect x="525" y="346" rx="0" ry="0" width="52" height="19" />
    <rect x="409" y="383" rx="0" ry="0" width="173" height="52" />
  </ContentLoader>
);

export default ChatLoader;

import React from 'react';
import styled, { keyframes } from 'styled-components';

const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

const BlinkingIndicator = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 5px;
  animation: ${blinkAnimation} 1s infinite;
`;

const StatusIndicator = ({ status }) => {
  let color;
  let label;

  switch (status) {
    case 'Active':
      color = 'green';
      label = 'Active';
      break;
    case 'Offline':
      color = 'red';
      label = 'Offline';
      break;
    default:
      color = 'gray';
      label = 'Inactive';
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <BlinkingIndicator color={color} />
      <span>{status}</span>
    </div>
  );
};

export default StatusIndicator;
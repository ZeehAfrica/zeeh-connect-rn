import { useContext } from 'react';
import { ZeeHContext } from './ZeeHProvider';

const useZeeHConnect = () => {
  const context = useContext(ZeeHContext);
  if (context === undefined) {
    throw new Error('useZeeHConnect must be used within a ZeeHProvider');
  }
  return context;
};

export default useZeeHConnect;

'use client';

import { useAppContext } from '@/lib/context/AppContext';

const Test = () => {
  const context = useAppContext();

  return <>hahah {context.roomInfo.roomName}</>;
};

export default Test;

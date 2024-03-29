'use client';

import { useAppContext } from '@/lib/context/AppContext';

const Test = () => {
  const context = useAppContext();

  console.log(111, 222, context.roomInfo);
  return <>hahah {context.roomInfo.roomName}</>;
};

export default Test;

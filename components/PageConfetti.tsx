'use client';

import party from 'party-js';
import { useEffect, useRef } from 'react';

const PageConfetti = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref?.current) {
      party.confetti(ref.current);
    }
  }, [ref]);
  return <div ref={ref}></div>;
};

export default PageConfetti;

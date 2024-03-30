'use client';

import { Check, Copy } from 'lucide-react';
import { ActionIcon, CopyButton, Tooltip, rem } from '@mantine/core';
import useIsMounted from '@/hooks/useIsMounted';

const CopyRoomLink = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return <>...</>;

  const roomURL = window.location.href;
  return (
    <CopyButton value={roomURL} timeout={1500}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? 'Link Copied' : 'Share Room Link'}
          withArrow
          position="bottom"
          mt={12}
        >
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            variant="transparent"
            onClick={copy}
            w="100%"
          >
            {/* <span style={{ color: '#fff' }}>Invite</span>&nbsp;&nbsp; */}
            {copied ? (
              <Check style={{ width: rem(20), color: '#fff' }} />
            ) : (
              <Copy style={{ width: rem(20), color: '#fff' }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CopyRoomLink;

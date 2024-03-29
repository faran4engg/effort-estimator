import { FC } from 'react';

interface RoomPageParams {
  params: {
    // add params
    searchParams?: Object;
  };
}
export const dynamic = 'force-dynamic';
const RoomPage: FC<RoomPageParams> = ({ params }) => {
  // eslint-disable-next-line no-console
  console.log(111, params);
  return <div>Home Page</div>;
};

export default RoomPage;

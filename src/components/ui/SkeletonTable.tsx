import { Skeleton } from '@mui/material';

export const SkeletonTable = () => {
  return (
    <div className="bg-white shadow-md rounded-lg my-6">
      <div className="flex items-center justify-between p-4">
        <div role="search" className=" w-full md:w-[500px] ">
          <Skeleton variant="rounded" width="100%" height={40} />
        </div>
        <Skeleton variant="rounded" width={150} height={40} />
      </div>
      <div className="flex items-center justify-between p-4">
        <Skeleton variant="rounded" width="100%" height={250} />
      </div>
    </div>
  );
};

import { usePermission } from '@/components/hooks/usePermission';
import { CustomFormGroupSwitch } from '@/components/ui/CustomFormGroupSwitch';
import { SkeletonTable } from '@/components/ui/SkeletonTable';
import { notify } from '@/lib/notify';
import { Permission } from '@/types/roles/Permissions';
import { firstLetterCapitalize } from '@/utils/firstLetterCapitalize';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const PermissionDetail = ({ roleId }: { roleId: string }) => {
  const { fetchPermissions, loading, error } = usePermission();
  const [permission, setPermission] = useState<Permission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPermissions(roleId);
      if (data) {
        setPermission(data);
      }
    };
    fetchData();
  }, [fetchPermissions, roleId]);

  useEffect(() => {
    if (error) {
      notify.error(error);
    }
  }, [error]);

  if (loading) return <SkeletonTable />;

  const handlePermissionChange = (permId: string, type: 'read' | 'write') => {
    setPermission((prevPermissions) =>
      prevPermissions.map((perm) => {
        if (perm.rpe_id === permId) {
          return { ...perm, [`rpe_bol_can_${type}`]: !perm[`rpe_bol_can_${type}`] };
        }
        return perm;
      })
    );
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {permission?.map((perm) => {
        return (
          <div
            key={perm.rpe_id}
            className="p-4 border border-gray-300 rounded-xl mb-2 bg-gray-50 flex items-center justify-between"
          >
            <div>
              <Typography variant="subtitle1" fontWeight={600}>
                {firstLetterCapitalize(perm.rpe_permission_txt_name.split('.').join(' '))}
              </Typography>
              <Typography variant="body2">{perm.rpe_permission_txt_description}</Typography>
            </div>
            <CustomFormGroupSwitch
              state={{ read: perm.rpe_bol_can_read, write: perm.rpe_bol_can_write }}
              onChange={(event) =>
                handlePermissionChange(perm.rpe_id, event.target.name as 'read' | 'write')
              }
            />
          </div>
        );
      })}
    </div>
  );
};

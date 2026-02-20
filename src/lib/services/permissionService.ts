export const getPermissionsByRole = async (roleId: string) => {
  try {
    const response = await fetch(`/api/permissions/${roleId}/`);
    if (!response.ok) {
      throw new Error(`Error fetching permissions for role ${roleId}`);
    }
    return await response?.json();
  } catch (error) {
    console.error(`Error fetching permissions for role ${roleId}:`, error);
    throw error;
  }
};

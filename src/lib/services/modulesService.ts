export const getModules = async () => {
  try {
    const res = await fetch('/api/modules', {
      method: 'GET',
    });
    return await res?.json();
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};

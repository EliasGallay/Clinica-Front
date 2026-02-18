export const getRoles = async () => {
  try {
    const response = await fetch('/api/roles');
    if (!response.ok) {
      throw new Error('Error fetching roles');
    }
    return await response?.json();
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

import { User } from "@/types/users/User";

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'GET',
    });

    return await res?.json();
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch('/api/users', {
      method: 'GET',
    });
    return await res?.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

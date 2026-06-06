import { api1 } from "@/lib/axios";

export const postRefreshToken = async (
  refreshToken: string,
  auth_platform: string,
) => {
  try {
    const response = await api1.post(
      `/auth/token/refresh?refreshToken=${refreshToken}&auth_platform=${auth_platform}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

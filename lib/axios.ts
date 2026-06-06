import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { postRefreshToken } from "@/api/authApi/auth";

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const handleError = async (error: AxiosError) => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const refreshToken = token?.refreshToken;
  const auth_platform = "PASSWORD";

  if (!auth_platform) {
    return Promise.reject(error);
  }
  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean;
  };

  // 401 아니면 그대로 에러
  if (error.response?.status !== 401) {
    return Promise.reject(error);
  }

  if (
    error.response?.status == 401 &&
    (error.response?.data as { code: string })?.code === "authentication-failed"
  ) {
    return Promise.reject(error);
  }

  // 이미 retry 한 요청이면 무한 루프 방지
  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  // refresh 요청 자체에서 401 난 경우 → 강제 로그아웃 대상
  if (originalRequest.url?.includes("/auth/refresh")) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  // 이미 refresh 중이면 대기
  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh((token: string) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        resolve(api(originalRequest));
      });
    });
  }

  isRefreshing = true;

  try {
    const response = await postRefreshToken(refreshToken, auth_platform);
    onRefreshed(response.accessToken);
    localStorage.setItem(
      "token",
      JSON.stringify({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }),
    );
    return api(originalRequest);
  } catch (error) {
    localStorage.clear();
    window.location.href = "/login";
    return Promise.reject(error);
  }
};

//서비스서버
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//인증서버
const api1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//서비스-pdf
const api2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/pdf",
  },
});

//서비스-토큰없음-pdf
const api3 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/pdf",
  },
});

//서비스-파일
const api4 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: "blob",
});

//서비스-토큰 수동: post 요청 시 토큰 수동 전달
const api5 = (token: string) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

//multipart/form-data
const api6 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//필톡 서버 - 시간 이슈로 구현을 따로 못한 경우 필톡 api 사용
const api7 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_PILLTALK,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const accessToken = JSON.parse(token as string)?.accessToken;
  if (accessToken && accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    return handleError(error);
  },
);

api2.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const accessToken = JSON.parse(token as string)?.accessToken;
  if (accessToken && accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api2.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    return handleError(error);
  },
);

api3.interceptors.request.use(async (config) => {
  return config;
});

api4.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const accessToken = JSON.parse(token as string)?.accessToken;

  if (accessToken && accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api4.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    return handleError(error);
  },
);

api6.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const accessToken = JSON.parse(token as string)?.accessToken;

  if (accessToken && accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api6.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    return handleError(error);
  },
);

api7.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const accessToken = JSON.parse(token as string)?.accessToken;
  if (accessToken && accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { api, api1, api2, api3, api4, api5, api6, api7 };

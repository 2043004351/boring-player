/**
 * request.js
 * 基于原生 fetch 的轻量级请求封装
 * 目标服务器: https://nullbr.online/ (NULLBR115)
 */

const BASE_URL = "/api";
const TIMEOUT = 10000; // 10秒超时

/**
 * 核心请求函数
 * @param {string} endpoint - 接口地址，例如 '/api/list'
 * @param {object} options - fetch 配置项 (method, headers, body 等)
 */
const request = async (endpoint, options = {}) => {
  // 解构 params，避免传递给原生 fetch
  const { params, ...fetchOptions } = options;
  
  // 1. 处理 URL，确保不重复拼接斜杠
  let url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  // 处理 query params
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  // 2. 设置默认 Header
  const headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  // 3. 配置超时控制器
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const config = {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    };

    // 如果是 POST/PUT 等请求且 body 是对象，自动转 JSON 字符串
    if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);

    // 清除超时定时器
    clearTimeout(timeoutId);

    // 4. 处理 HTTP 错误状态
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorBody || response.statusText}`);
    }

    // 5. 尝试解析 JSON，如果解析失败返回文本
    try {
      return await response.json();
    } catch (err) {
      return await response.text();
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    console.error("Request Failed:", error);
    throw error;
  }
};

export default request;

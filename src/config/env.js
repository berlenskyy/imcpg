const env = {
  apiUrl:   import.meta.env.VITE_API_URL   || "http://localhost:8080",
  appName:  import.meta.env.VITE_APP_NAME  || "Imcpg-Backend",
  isDev:    import.meta.env.VITE_ENV === "development",
  isProd:   import.meta.env.VITE_ENV === "production",
}

export default env
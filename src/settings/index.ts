const settings = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  STREAM_URL: process.env.STREAM_URL,
  STATIC_URL: process.env.NEXT_PUBLIC_STATIC_URL,
  WS_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
  PORT: process.env.PORT,
  AWS_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  AUTH_DISCOVERY_URL: process.env.NEXT_PUBLIC_AUTH_DISCOVERY_URL,
  AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
};
export default settings;

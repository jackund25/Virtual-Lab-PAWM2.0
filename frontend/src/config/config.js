export const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend-nine-ebon.vercel.app/'  // URL production backend
  : 'http://localhost:8000';  // URL development
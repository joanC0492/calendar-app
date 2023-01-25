export const getEnvVariables = () => {
  // Desarrollo
  // import.meta.env;

  // return {
  //   ...import.meta.env,
  // };

  // ******************************************
  
  // Produccion
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };
};
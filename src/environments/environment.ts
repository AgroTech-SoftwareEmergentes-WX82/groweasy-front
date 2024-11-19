export const environment = {
  production: true,
  API_URL: 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1',
  mqtt: {
    host: '79a52ee9b42246daaa17cd9272cff7af.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'agrotech', // Reemplaza con tu nombre de usuario
    password: 'Agrotech02$',  // Reemplaza con tu contraseña
    topic: '/ThinkIOT/hum'
  }
};

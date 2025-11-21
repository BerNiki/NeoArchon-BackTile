module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/main.js',
      cwd: '/var/www/api',
      env: {
        PORT: 3000,
        DATABASE_URL:
          'postgres://admin_niki:42HolNik42@localhost:5432/archon_db',
        COOKIE_SECURE: true,
        COOKIE_SAMESITE: 'none',
        COOKIE_PATH: '/',
        NODE_ENV: 'development',
        JWT_ISS: 'https://localhost:3000',
        JWT_AUD: 'your-audience',
        JWT_EXPIRATION: '900',
        JWT_REFRESH_EXPIRATION: '1209600',
        JWT_KID: 'your-key-id',
        JWT_KEY_PRIVATE_PATH: '/var/www/api/secrets/token-keys/private.key',
        JWT_KEY_PUBLIC_PATH: '/var/www/api/secrets/token-keys/public.key',
      },
    },
  ],
};

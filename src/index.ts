import { createApp } from './app';

(async () => {
  const app = createApp();
  // initiate basic auth db
  app.listen(process.env.APP_PORT, () => {
    console.log(
      `App listening on port: http://localhost:${process.env.APP_PORT}`
    );
  });
})();

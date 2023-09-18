import { app } from "./app";

(async () => {
  // アプリを起動
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

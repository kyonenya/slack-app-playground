import { app } from "./app";

// "hello" を含むメッセージをリッスンします
app.message("hello", async ({ message, say }) => {
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  // 型エラーを解消するために any を使っています。
  await say(`Hey there <@${(message as any).user}>!`);
});

(async () => {
  // アプリを起動
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

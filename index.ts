import { app } from "./app";

// "hello" を含むメッセージをリッスンします
app.message("hello", async ({ message, say }) => {
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${(message as any).user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${(message as any).user}>!`,
  });
});

app.action("button_click", async ({ body, ack, say }) => {
  // アクションのリクエストを確認
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // アプリを起動
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

import { app } from "./app";
import { getRecentCommits } from "./github";

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

app.message("commits", async ({ ack, say }) => {
  // await ack();

  try {
    const commitsData = await getRecentCommits(
      "kyonenya",
      "bild-hineinschauen"
    );
    const commits = commitsData.slice(0, 5); // 直近の3件のコミットを取得

    let commitMessages = "直近のコミット:\n";
    for (const commit of commits) {
      commitMessages += `- ${commit.commit.message} by ${commit.commit.author.name}\n`;
    }

    await say(commitMessages);
  } catch (error) {
    console.error(error);
    await say("コミットの取得に失敗しました。");
  }
});

(async () => {
  // アプリを起動
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

import { App } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

// ボットトークンとSigning Secretでアプリを初期化
export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

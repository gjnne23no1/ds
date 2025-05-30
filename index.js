const { Client } = require("discord.js-selfbot-v13");
const { CustomStatus, RichPresence } = require("discord.js-selfbot-v13");
const client = new Client();
require("dotenv").config();
const config = require("./config.json");

const customStatus = new CustomStatus(client, {
  state: "Watching tutorials",
  emoji: { name: "🔥" },
});

const rich = new RichPresence(client)
  .setApplicationId(config.application_id)
  .setType(config.type)
  .setName(config.name)
  .setDetails(config.details)
  .setState(config.state)
  .setAssetsLargeImage(config.largeImageKey)
  .setAssetsLargeText(config.largeImageText)
  .setAssetsSmallImage(config.smallImageKey)
  .setAssetsSmallText(config.smallImageText)
  .setURL(config.url)
  .setStartTimestamp(new Date())
  .setButtons(config.buttons);

/**
 * When the selfbot is ready and connected to Discord,
 * this function is executed.
 */
client.on("ready", async () => {
  console.log(`✅ ${client.user.username} is ready!`);
  client.user.setPresence({
    activities: [customStatus.toJSON(), rich.toJSON()],
    status: "online",
  });
  console.log("✅ Rich Presence is now active!");
});

// Log in using your user token
client.login(process.env.TOKEN);

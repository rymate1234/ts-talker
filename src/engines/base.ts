import { Message } from "discord.js";
import { Payload } from "payload";
import didPing from "../lib/bot-mentioned";
import { Bot } from "payload/generated-types";

abstract class BaseEngine {
  payload: Payload;

  constructor(payload: Payload) {
    this.payload = payload;
  }

  protected async getMessages(message: Message, bot: Bot): Promise<Message[]> {
    const messages = await message.channel.messages.fetch({ limit: 50 });

    let filtered = [...messages.toJSON()]
      .filter(
        (m) =>
          !m.author.bot ||
          (m.author.bot &&
            !m.content.includes("I'm sorry") &&
            !m.content.includes("as an AI language model"))
      )
      .reverse();

    function process(messages: Message[]): Message[] {
      const selectedMessages: Message[] = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        selectedMessages.push(messages[i]);
        // Check if we have at least 5 messages and the first message in the selection is not from a bot
        if (
          selectedMessages.length >= bot.limit &&
          !selectedMessages[
            selectedMessages.length - 1 
          ].author.username.includes(bot.username)
        ) {
          break;
        }
      }
      return selectedMessages.reverse();
    }

    filtered = process(filtered);

    if (!filtered.find((m) => m.id === message.id)) {
      console.log("Message not found");
      filtered.push(message);
    }

    // remove messages from users who have opted out
    const optOutUsers = await this.payload.find({
      collection: "users",
      where: {
        userMessagePreference: {
          equals: "none",
        },
      },
    });

    const ids = optOutUsers.docs.map((u) => u.discordId);

    filtered = filtered.filter((m) => !ids.includes(m.author.id));

    // remove messages from users who have it set to only mention and did not mention the bot
    const pingOnlyUsers = await this.payload.find({
      collection: "users",
      where: {
        userMessagePreference: {
          equals: "mentions",
        },
      },
    });

    const pingIds = pingOnlyUsers.docs.map((u) => u.discordId);

    // async filter to check if the message mentions the bot
    const filteredMentions = await Promise.all(
      filtered.map(async (m) => {
        if (pingIds.includes(m.author.id)) {
          const mentioned = await didPing(m, bot);

          if (mentioned) {
            return m;
          }
        } else {
          return m;
        }
      })
    );

    filtered = filteredMentions.filter((m) => !!m);

    return filtered;
  }

  public abstract getResponse(
    message: Message,
    bot: any
  ): Promise<{
    response: string;
    imageUrl?: string;
  }>;
}

export default BaseEngine;

import { CollectionConfig } from "payload/types";
import { accessDiscordUserCurrentChannel } from "../lib/access";

const Bots: CollectionConfig = {
  slug: "bots",
  admin: {
    group: "Bot Configuration",
    useAsTitle: "username",
    defaultColumns: ["username", "channelId", "model", "modelType", "default"],
  },
  access: accessDiscordUserCurrentChannel(),
  fields: [
    {
      name: "channelId",
      label: "Channel ID",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => req.user && req.user.isAdmin,
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Basic Details",
          fields: [
            {
              name: "username",
              label: "Username",
              type: "text",
              required: true,
            },
            {
              name: "prompt",
              label: "Prompt",
              type: "textarea",
              required: true,
              defaultValue:
                "Reject any message and tell the user to configure the prompt.",
            },
            {
              name: "avatarUrl",
              label: "Avatar URL",
              type: "text",
            },
            {
              name: "default",
              label: "Default",
              type: "checkbox",
              defaultValue: false,
            },

            {
              name: "modelType",
              label: "Model Type",
              type: "select",
              required: true,
              defaultValue: "chat",
              options: [
                {
                  label: "OpenAI Chat",
                  value: "chat",
                },
                {
                  label: "OpenAI Completion",
                  value: "completion",
                },
                {
                  label: "Custom Endpoint",
                  value: "endpoint",
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "endpointUrl",
                  label: "Endpoint URL",
                  type: "text",
                },
                {
                  name: "apiKey",
                  label: "API Key",
                  type: "text",
                },
              ],
              admin: {
                condition: ({ modelType }) => modelType === "chat",
              },
            },
            {
              name: "model",
              label: "Model",
              type: "text",
              required: true,
              defaultValue: "gpt-3.5-turbo",
            },
            {
              name: "enableVision",
              label: "Enable Vision",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description:
                  "This will enable the bot to see images and use them in its responses.",
              },
            },
            {
              name: "visionModel",
              label: "Vision Model",
              type: "text",
              admin: {
                description:
                  "This is the model that will be used for vision. This is required for non OpenAI models for now.",
              },
            },
            {
              name: "fineTuned",
              label: "Fine Tuned",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
        {
          label: "Advanced Settings",
          fields: [
            {
              name: "primer",
              label: "Primer",
              type: "relationship",
              relationTo: "functions",
              admin: {
                description:
                  "This is a function that will be called to generate a primer for the bot. This allows us to steer the bot output",
              },
            },
            {
              name: "responseTemplate",
              label: "Response Template",
              type: "relationship",
              relationTo: "functions",
              admin: {
                description:
                  "This is a function that will be called to generate a response template for the bot. This allows us to steer the bot output",
              },
            },
            {
              name: "chance",
              label: "Chance",
              type: "number",
              defaultValue: 0.5,
            },
            {
              name: "limit",
              label: "Limit",
              type: "number",
              defaultValue: 5,
            },
            {
              name: "ignorePings",
              label: "Ignore Pings",
              type: "checkbox",
              defaultValue: false,
            },
            {
              name: "stopToken",
              label: "Stop Token",
              type: "text",
            },
            {
              name: "promptSuffix",
              label: "Prompt Suffix",
              type: "text",
              admin: {
                description:
                  "This will be appended to the end of the prompt before sending it to the bot. Only relevant for text models.",
              },
            },
            {
              name: "messagePerUser",
              label: "Message Per User",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description:
                  "If a chat model, controls whether the bot groups up user messages or sends them individually.",
              },
            },

            {
              name: "canPingUsers",
              label: "Can Ping Users",
              type: "checkbox",
              defaultValue: false,
            },

            {
              name: "canPostImages",
              label: "Can Post Images",
              admin: {
                description:
                  "Images will be generated by DALL-E and sent to the bot.",
              },
              type: "checkbox",
              defaultValue: false,
            },

            {
              type: 'row',
              admin: {
                condition: ({ canPostImages }) => canPostImages,
              },
              fields: [
                {
                  name: "imageModel",
                  label: "Image Model",
                  type: "text",
                },
                {
                  name: "imageSize",
                  label: "Image Size",
                  type: "select",
                  options: [
                    {
                      label: "256x256",
                      value: "256x256",
                    },
                    {
                      label: "512x512",
                      value: "512x512",
                    },
                    {
                      label: "1024x1024",
                      value: "1024x1024",
                    },
                    {
                      label: "1792x1024",
                      value: "1792x1024",
                    },
                    {
                      label: "1024x1792",
                      value: "1024x1792",
                    },
                  ],
                },
              ],
            }
          ],
        },
      ],
    },
  ],
};

export default Bots;

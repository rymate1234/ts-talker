/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    bots: Bot;
    functions: Function;
    users: User;
    channels: Channel;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface Bot {
  id: string;
  channelId: string;
  username: string;
  prompt: string;
  avatarUrl?: string | null;
  default?: boolean | null;
  modelType: 'chat' | 'completion' | 'endpoint';
  model: string;
  enableVision?: boolean | null;
  visionModel?: string | null;
  fineTuned?: boolean | null;
  primer?: (string | null) | Function;
  responseTemplate?: (string | null) | Function;
  chance?: number | null;
  limit?: number | null;
  ignorePings?: boolean | null;
  stopToken?: string | null;
  promptSuffix?: string | null;
  messagePerUser?: boolean | null;
  canPingUsers?: boolean | null;
  canPostImages?: boolean | null;
  imageModel?: string | null;
  imageSize?: ('256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792') | null;
  updatedAt: string;
  createdAt: string;
}
export interface Function {
  id: string;
  name: string;
  description: string;
  template?: string | null;
  parameters: {
    name: string;
    type: 'string' | 'integer' | 'boolean' | 'array';
    allowedValues?:
      | {
          value: string;
          id?: string | null;
        }[]
      | null;
    description: string;
    required: boolean;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
export interface User {
  id: string;
  isAdmin?: boolean | null;
  discordId?: string | null;
  discordUsername?: string | null;
  currentChannelId?: string | null;
  userMessagePreference?: ('none' | 'mentions' | 'all') | null;
  preventPings?: boolean | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface Channel {
  id: string;
  channelId: string;
  webhookId: string;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
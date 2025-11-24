export interface DevRevNotification {
  actor: NotificationActor;
  body: string;
  device: NotificationDevice;
  id: string;
  item: NotificationItem;
  notification_id: string;
  notification_id_v1: string;
  source_id: string;
  state: string;
  subtitle: string;
  title: string;
  type: string;
  url: string;
}

export interface NotificationActor {
  display_handle: string;
  display_id: string;
  display_name: string;
  full_name: string;
  id: string;
  id_v1: string;
  state: string;
  thumbnail: string;
  type: string;
}

export interface NotificationDevice {
  android: {
    channel: string;
    channel_id: string;
  };
  device_type: string;
}

export interface NotificationItem {
  display_id: string;
  id: string;
  id_v1: string;
  target: string;
  title: string;
  type: string;
}

export interface StaleNotificationData {
  stale_notification_ids?: string[];
}

export interface SilentNotificationData {
  silent?: string;
}

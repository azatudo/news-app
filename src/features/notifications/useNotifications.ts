import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export function useNotifications() {
  useEffect(() => {
    const register = async () => {
      if (!Device.isDevice) return;

      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (status !== 'granted') {
        const permission = await Notifications.requestPermissionsAsync();
        finalStatus = permission.status;
      }

      if (finalStatus !== 'granted') return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Push token:', token.data);
    };

    register();

    const listener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => {
      listener.remove();
    };
  }, []);
}
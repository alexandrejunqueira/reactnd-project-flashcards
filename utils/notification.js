import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'flashcards:notification';

// AsyncStorage.clear();

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
};

function createNotification () {
  return {
    title: 'Practice today!',
    body: "👋 don't forget to practice today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      if (data === null) {

        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {

              Notifications.cancelAllScheduledNotificationsAsync();

              let time = new Date();
              time.setDate(time.getDate() + 1);
              time.setHours(20);
              time.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
};

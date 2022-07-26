import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
    // Notification to hold the state of the notification
    // showNotification function to assign the data to the notification
    // hideNotification function to remove/nullify the data of notification state
    notification: null, //TODO: title, status, desc
    showNotification: function (notificationData) { },
    hideNotification: function () { }
});

export function NotificationContextProvider(props) {

    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        if (activeNotification &&
            (activeNotification.status === 'success' ||
                activeNotification.status === 'error')) {
            const timer = setTimeout(() => { 
                setActiveNotification(null);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification]);

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData);
    }

    const hideNotificationHandler = () => {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    }

    return (<NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>)
}

export default NotificationContext
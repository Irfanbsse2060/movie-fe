import {notification} from "antd";

export enum NOTIFICATION_TYPE { SUCCESS = 'success', WARNING = 'warning', ERROR = 'error' }

const Notification = (type: NOTIFICATION_TYPE, message: string, description: string = '') => {
    notification[type]({message: message, description: description});
};

export default Notification
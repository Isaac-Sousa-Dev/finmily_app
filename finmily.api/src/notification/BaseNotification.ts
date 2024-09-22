export abstract class BaseNotification {

    notifications: Array<{message: string}>;

    constructor() {
        this.notifications = new Array<{message: string}>();
    }

    AddNotification(message: string) {
        this.notifications.push({message: message});
    }

    isTrue(value, message) {
        if(value) {
            this.notifications.push({message: message});
        }
    }

    isRequired(value, message) {
        if(!value || value.length < 0 || value == null) {
            this.notifications.push({message: message})
        }
    }

    hasMinLen(value, min, message) {
        if(!value || value.length < min) {
            this.notifications.push({message: message});
        }
    }

    hasMaxLen(value, max, message) {
        if(!value || value.length > max) {
            this.notifications.push({message: message});
        }
    }

    isFixedLen(value, fixed, message) {
        if(!value || value.length != fixed) {
            this.notifications.push({message: message});
        }
    }

    get allNotifications(): Array<{message: string}> {
        return this.notifications;
    }

    clear() {
        this.notifications = new Array<{message: string}>();
    }

    valid(): boolean {
        return this.notifications.length == 0;
    }
}
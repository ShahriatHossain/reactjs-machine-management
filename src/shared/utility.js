import { filter } from 'lodash';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export const getMachineTableHeaderCells = () => {
    return [
        { label: 'ID', name: 'id', isFilterAble: false, isSortAble: false },
        { label: 'Status', name: 'status', isFilterAble: true, isSortAble: false },
        { label: 'Machine Type', name: 'machine_type', isFilterAble: true, isSortAble: false },
        { label: 'Longitude', name: 'longitude', isFilterAble: false, isSortAble: true },
        { label: 'Latitude', name: 'latitude', isFilterAble: false, isSortAble: true },
        { label: 'Last Maintenance', name: 'last_maintenance', isFilterAble: false, isSortAble: true },
        { label: 'Install Date', name: 'install_date', isFilterAble: false, isSortAble: true },
        { label: 'Floor', name: 'floor', isFilterAble: true, isSortAble: false }
    ]
}

export const getMachineTabs = () => {
    return [
        { label: 'Details', name: 'details' },
        { label: 'Events', name: 'events' },
        { label: 'Live Events', name: 'live-events' }
    ]
}

export const getFilterdResult = (items, val) => {
    return filter(
        items,
        item =>
            item.machine_type.toLowerCase().indexOf(val) !== -1 ||
            item.status.toLowerCase().indexOf(val) !== -1 ||
            item.floor === val
    );
}

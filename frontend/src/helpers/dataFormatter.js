import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },

        projectsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        projectsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        projectsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        projectsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        scansManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.status)
        },
        scansOneListFormatter(val) {
            if (!val) return ''
            return val.status
        },
        scansManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.status}
            });
        },
        scansOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.status, id: val.id}
        },

}

const _ = require('lodash');

const helper = {
    /**
     * 取得sql, 並轉換成[[value, value...]]
     * @param {Array|Object} value [{}]
     * @param {string} tableName
     * @return {Object} { sql, dataSet }
     */
    getInsertUpdateWith: (value, tableName, ignore = false) => {
        const arr = _.isArray(value) ? value : [value];
        const values = arr.filter((el) => _.isPlainObject(el));

        if (_.isEmpty(values) || !tableName) {
            throw new Error(
                `getInsertUpdateWith no value ${values} with table ${tableName}`
            );
        }

        const keys = Object.keys(values[0]);
        const sql = helper.getInsertUpdateSQL(keys, tableName, ignore);
        const dataSet = values.map((obj) => keys.map((key) => obj[key]));

        return { sql, dataSet };
    },

    getInsertUpdateSQL: (props = [], tableName = '', ignore = false) => {
        if (_.isEmpty(props) || !tableName) {
            throw new Error('props cannot be empty array.');
        }

        let sql = `INSERT ${ignore ? 'IGNORE' : ''} INTO ${tableName} (`;
        props.forEach((prop, index) => {
            sql += ` ${prop}`;
            if (index !== props.length - 1) {
                sql += `,`;
            }
        });

        sql += `) VALUES ? `;

        if (!ignore) {
            sql += `ON DUPLICATE KEY UPDATE `;
            props.forEach((prop, index) => {
                sql += `${prop}=VALUES(${prop})`;
                if (index !== props.length - 1) {
                    sql += `,`;
                }
            });
        }

        return sql;
    },
};

module.exports = helper;

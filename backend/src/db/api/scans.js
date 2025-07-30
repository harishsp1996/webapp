
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ScansDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const scans = await db.scans.create(
            {
                id: data.id || undefined,

        status: data.status
        ||
        null
            ,

        start_time: data.start_time
        ||
        null
            ,

        git_url: data.git_url
        ||
        null
            ,

        git_username: data.git_username
        ||
        null
            ,

        git_password: data.git_password
        ||
        null
            ,

        server_ip: data.server_ip
        ||
        null
            ,

        app_urls: data.app_urls
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return scans;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const scansData = data.map((item, index) => ({
                id: item.id || undefined,

                status: item.status
            ||
            null
            ,

                start_time: item.start_time
            ||
            null
            ,

                git_url: item.git_url
            ||
            null
            ,

                git_username: item.git_username
            ||
            null
            ,

                git_password: item.git_password
            ||
            null
            ,

                server_ip: item.server_ip
            ||
            null
            ,

                app_urls: item.app_urls
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const scans = await db.scans.bulkCreate(scansData, { transaction });

        return scans;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const scans = await db.scans.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.status !== undefined) updatePayload.status = data.status;

        if (data.start_time !== undefined) updatePayload.start_time = data.start_time;

        if (data.git_url !== undefined) updatePayload.git_url = data.git_url;

        if (data.git_username !== undefined) updatePayload.git_username = data.git_username;

        if (data.git_password !== undefined) updatePayload.git_password = data.git_password;

        if (data.server_ip !== undefined) updatePayload.server_ip = data.server_ip;

        if (data.app_urls !== undefined) updatePayload.app_urls = data.app_urls;

        updatePayload.updatedById = currentUser.id;

        await scans.update(updatePayload, {transaction});

        return scans;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const scans = await db.scans.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of scans) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of scans) {
                await record.destroy({transaction});
            }
        });

        return scans;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const scans = await db.scans.findByPk(id, options);

        await scans.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await scans.destroy({
            transaction
        });

        return scans;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const scans = await db.scans.findOne(
            { where },
            { transaction },
        );

        if (!scans) {
            return scans;
        }

        const output = scans.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.git_url) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'scans',
                            'git_url',
                            filter.git_url,
                        ),
                    };
                }

                if (filter.git_username) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'scans',
                            'git_username',
                            filter.git_username,
                        ),
                    };
                }

                if (filter.git_password) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'scans',
                            'git_password',
                            filter.git_password,
                        ),
                    };
                }

                if (filter.server_ip) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'scans',
                            'server_ip',
                            filter.server_ip,
                        ),
                    };
                }

                if (filter.app_urls) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'scans',
                            'app_urls',
                            filter.app_urls,
                        ),
                    };
                }

            if (filter.start_timeRange) {
                const [start, end] = filter.start_timeRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    start_time: {
                    ...where.start_time,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    start_time: {
                    ...where.start_time,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.status) {
                where = {
                    ...where,
                status: filter.status,
            };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.scans.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'scans',
                        'status',
                        query,
                    ),
                ],
            };
        }

        const records = await db.scans.findAll({
            attributes: [ 'id', 'status' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['status', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.status,
        }));
    }

};


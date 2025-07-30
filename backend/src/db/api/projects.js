
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProjectsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const projects = await db.projects.create(
            {
                id: data.id || undefined,

        name: data.name
        ||
        null
            ,

        language: data.language
        ||
        null
            ,

        scan_type: data.scan_type
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return projects;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const projectsData = data.map((item, index) => ({
                id: item.id || undefined,

                name: item.name
            ||
            null
            ,

                language: item.language
            ||
            null
            ,

                scan_type: item.scan_type
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const projects = await db.projects.bulkCreate(projectsData, { transaction });

        return projects;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const projects = await db.projects.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.name !== undefined) updatePayload.name = data.name;

        if (data.language !== undefined) updatePayload.language = data.language;

        if (data.scan_type !== undefined) updatePayload.scan_type = data.scan_type;

        updatePayload.updatedById = currentUser.id;

        await projects.update(updatePayload, {transaction});

        return projects;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const projects = await db.projects.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of projects) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of projects) {
                await record.destroy({transaction});
            }
        });

        return projects;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const projects = await db.projects.findByPk(id, options);

        await projects.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await projects.destroy({
            transaction
        });

        return projects;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const projects = await db.projects.findOne(
            { where },
            { transaction },
        );

        if (!projects) {
            return projects;
        }

        const output = projects.get({plain: true});

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

                if (filter.name) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'projects',
                            'name',
                            filter.name,
                        ),
                    };
                }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.language) {
                where = {
                    ...where,
                language: filter.language,
            };
            }

            if (filter.scan_type) {
                where = {
                    ...where,
                scan_type: filter.scan_type,
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
            const { rows, count } = await db.projects.findAndCountAll(queryOptions);

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
                        'projects',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.projects.findAll({
            attributes: [ 'id', 'name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.name,
        }));
    }

};


module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.createTable('users', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('projects', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('reports', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('scans', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'users',
                      'firstName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'lastName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'phoneNumber',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'disabled',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerified',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationToken',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'passwordResetToken',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'passwordResetTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'provider',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'projects',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'projects',
                      'language',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Python','Java','JavaScript','Node.js','PHP'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'projects',
                      'scan_type',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['SAST','DAST','Both'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'reports',
                      'scanId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'scans',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'reports',
                      'tool_name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'reports',
                      'report_path',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'projectId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'projects',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'status',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Pending','Running','Completed'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'start_time',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'git_url',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'git_username',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'git_password',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'server_ip',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'scans',
                      'app_urls',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'scans',
                        'app_urls',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'scans',
                        'server_ip',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'scans',
                        'git_password',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'scans',
                        'git_username',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'scans',
                        'git_url',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'scans',
                        'start_time',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'scans',
                        'status',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'scans',
                        'projectId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'reports',
                        'report_path',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'reports',
                        'tool_name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'reports',
                        'scanId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'projects',
                        'scan_type',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'projects',
                        'language',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'projects',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'provider',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetTokenExpiresAt',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetToken',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationTokenExpiresAt',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationToken',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerified',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'password',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'disabled',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'email',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'phoneNumber',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'lastName',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'firstName',
                        { transaction }
                    );

                    await queryInterface.dropTable('scans', { transaction });

                    await queryInterface.dropTable('reports', { transaction });

                    await queryInterface.dropTable('projects', { transaction });

                    await queryInterface.dropTable('users', { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};

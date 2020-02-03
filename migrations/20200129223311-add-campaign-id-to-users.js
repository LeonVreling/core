module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn(
        'users',
        'campaign_id',
        {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'campaigns',
                key: 'id'
            }
        },
    ),
    down: (queryInterface) => queryInterface.removeColumn('users', 'campaign_id')
};
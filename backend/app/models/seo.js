module.exports = function (Sequelize, Schema) {
    let Seo = Schema.define('seo', {

        metaData: {
            type: Sequelize.TEXT,
        },
        homeMeta: {
            type: Sequelize.TEXT,
        },
        headerScript: {
            type: Sequelize.TEXT,
        },
        bodyScript: {
            type: Sequelize.TEXT,
        },
        footerScript: {
            type: Sequelize.TEXT,
        },

    }, {
        underscored: false,
        timestamps: true,
    }
    );

    Seo.sync({ force: false, alter: true });

    return Seo;
}
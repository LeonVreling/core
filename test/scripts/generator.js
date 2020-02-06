const faker = require('faker');

const {
    User,
    Campaign,
    MailConfirmation,
    AccessToken,
    RefreshToken,
} = require('../../models');

const notSet = (field) => typeof field === 'undefined';

exports.generateUser = (options = {}) => {
    if (notSet(options.username)) options.username = faker.random.alphaNumeric(16);
    if (notSet(options.first_name)) options.first_name = faker.name.firstName();
    if (notSet(options.last_name)) options.last_name = faker.name.lastName();
    if (notSet(options.email)) options.email = faker.internet.email();
    if (notSet(options.gender)) options.gender = faker.random.alphaNumeric(16);
    if (notSet(options.phone)) options.phone = faker.phone.phoneNumber();
    if (notSet(options.date_of_birth)) options.date_of_birth = faker.date.past();
    if (notSet(options.about_me)) options.about_me = faker.lorem.paragraph();
    if (notSet(options.password)) options.password = faker.random.alphaNumeric(16);

    return options;
};

exports.createUser = (options = {}) => {
    return User.create(exports.generateUser(options));
};

exports.generateCampaign = (options = {}) => {
    if (notSet(options.name)) options.name = faker.random.alphaNumeric(16);
    if (notSet(options.url)) options.url = faker.random.alphaNumeric(16);
    if (notSet(options.description_short)) options.description_short = faker.lorem.paragraph();
    if (notSet(options.description_long)) options.description_long = faker.lorem.paragraph();

    return options;
};


exports.createCampaign = (options = {}) => {
    return Campaign.create(exports.generateCampaign(options));
};

exports.generateRefreshToken = (options = {}, user) => {
    if (notSet(options.value)) options.value = faker.random.alphaNumeric(16);
    if (user) options.user_id = user.id;

    return options;
};

exports.createRefreshToken = (options = {}, user = null) => {
    return RefreshToken.create(exports.generateRefreshToken(options, user));
};

exports.generateAccessToken = (options = {}, user) => {
    if (notSet(options.value)) options.value = faker.random.alphaNumeric(16);
    if (notSet(options.expires_at)) options.expires_at = faker.date.future();
    if (user) options.user_id = user.id;

    return options;
};

exports.createAccessToken = (options = {}, user = null) => {
    return AccessToken.create(exports.generateAccessToken(options, user));
};

exports.clearAll = async () => {
    await AccessToken.destroy({ where: {}, truncate: { cascade: true } });
    await RefreshToken.destroy({ where: {}, truncate: { cascade: true } });
    await MailConfirmation.destroy({ where: {}, truncate: { cascade: true } });
    await User.destroy({ where: {}, truncate: { cascade: true } });
    await Campaign.destroy({ where: {}, truncate: { cascade: true } });
};

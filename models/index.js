const User = require('./User');
const Campaign = require('./Campaign');
const MailConfirmation = require('./MailConfirmation');
const MailChange = require('./MailChange');
const AccessToken = require('./AccessToken');
const RefreshToken = require('./RefreshToken');
const PasswordReset = require('./PasswordReset');
const Body = require('./Body');
const Circle = require('./Circle');
const Permission = require('./Permission');
const CirclePermission = require('./CirclePermission');
const CircleMembership = require('./CircleMembership');
const BodyMembership = require('./BodyMembership');
const JoinRequest = require('./JoinRequest');
const Payment = require('./Payment');

Campaign.hasMany(User, { foreignKey: 'campaign_id' });
User.belongsTo(Campaign, { foreignKey: 'campaign_id' });

Body.hasMany(User, { foreignKey: 'primary_body_id', as: 'primary_body' });
User.belongsTo(Body, { foreignKey: 'primary_body_id', as: 'primary_body' });

Body.hasOne(Campaign, { foreignKey: 'autojoin_body_id', as: 'autojoin_body' });
Campaign.belongsTo(Body, { foreignKey: 'autojoin_body_id', as: 'autojoin_body' });

User.hasMany(MailConfirmation, { foreignKey: 'user_id' });
MailConfirmation.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(AccessToken, { foreignKey: 'user_id' });
AccessToken.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(RefreshToken, { foreignKey: 'user_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PasswordReset, { foreignKey: 'user_id' });
PasswordReset.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(MailChange, { foreignKey: 'user_id' });
MailChange.belongsTo(User, { foreignKey: 'user_id' });

Body.hasMany(Circle, { foreignKey: 'body_id' });
Circle.belongsTo(Body, { foreignKey: 'body_id' });

Circle.hasOne(Body, { foreignKey: 'shadow_circle_id', as: 'shadow_circle' });
Body.belongsTo(Circle, { foreignKey: 'shadow_circle_id', as: 'shadow_circle' });

Circle.hasMany(Circle, { foreignKey: 'parent_circle_id', as: 'child_circles' });
Circle.belongsTo(Circle, { foreignKey: 'parent_circle_id', as: 'parent_circle' });

Circle.belongsToMany(Permission, { through: CirclePermission, foreignKey: 'circle_id', as: 'permissions' });
Permission.belongsToMany(Circle, { through: CirclePermission, foreignKey: 'permission_id', as: 'circles' });

CirclePermission.belongsTo(Permission, { foreignKey: 'permission_id' });
Permission.hasMany(CirclePermission, { foreignKey: 'permission_id' });

CirclePermission.belongsTo(Circle, { foreignKey: 'circle_id' });
Circle.hasMany(CirclePermission, { foreignKey: 'circle_id' });

Circle.belongsToMany(User, { through: CircleMembership, foreignKey: 'circle_id', as: 'users' });
User.belongsToMany(Circle, { through: CircleMembership, foreignKey: 'user_id', as: 'circles' });

CircleMembership.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(CircleMembership, { foreignKey: 'user_id' });

CircleMembership.belongsTo(Circle, { foreignKey: 'circle_id' });
Circle.hasMany(CircleMembership, { foreignKey: 'circle_id' });

Body.belongsToMany(User, { through: BodyMembership, foreignKey: 'body_id', as: 'users' });
User.belongsToMany(Body, { through: BodyMembership, foreignKey: 'user_id', as: 'bodies' });

BodyMembership.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(BodyMembership, { foreignKey: 'user_id' });

BodyMembership.belongsTo(Body, { foreignKey: 'body_id' });
Body.hasMany(BodyMembership, { foreignKey: 'body_id' });

JoinRequest.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(JoinRequest, { foreignKey: 'user_id' });

JoinRequest.belongsTo(Body, { foreignKey: 'body_id' });
Body.hasMany(JoinRequest, { foreignKey: 'body_id' });

Payment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Payment, { foreignKey: 'user_id' });

Payment.belongsTo(Body, { foreignKey: 'body_id' });
Body.hasMany(Payment, { foreignKey: 'body_id' });

module.exports = {
    User,
    Campaign,
    MailConfirmation,
    AccessToken,
    RefreshToken,
    PasswordReset,
    MailChange,
    Body,
    Circle,
    Permission,
    CirclePermission,
    CircleMembership,
    BodyMembership,
    JoinRequest,
    Payment,
};

import { DataTypes, Model, HasManyAddAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, NonAttribute } from 'sequelize'
import { sequelize } from './db'
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"
import type { Account as AdapterAccount } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'

import { Category, HostInfoBase, TeamInfo, TeamMember } from './models'
import { MatchResult, MatchResultDetails } from './models/match'
import { TeamInfoRatings } from './models/team'
import { GlickoVariable, RatingPeriod, TeamGlickoInfo } from './models/glicko'
import { RatingPeriodExt } from './models/teams'
import { AccountType } from './models/accountType'

/**
 * Redefine next-auth's User instance
 */
interface UserInstance extends
        Model<AdapterUser, Partial<AdapterUser>>, AdapterUser {
    account_type?: string
}

interface AccountInstance extends
        Model<AdapterAccount, Partial<AdapterAccount>>, AdapterAccount {}

declare module 'next-auth' {
    interface UserInstance extends
            Model<AdapterUser, Partial<AdapterUser>>, AdapterUser {
        account_type?: string
    }
}

interface TeamMemberInstance extends Model<TeamMember, Partial<TeamMember>>, TeamMember { }

interface TeamInfoInstance extends Model<TeamInfo, Partial<TeamInfo>>, TeamInfo {
    members: NonAttribute<TeamMember[]>
    // Allows `addMember` on a team instance
    addMember: HasManyAddAssociationMixin<TeamMemberInstance, number>

    ratingPeriods: NonAttribute<RatingPeriodExt>

    teamGlickoInfo: NonAttribute<TeamGlickoInfo>

    categories: Array<Category>
    // Allows `addCategory` on a team instance
    addCategory: BelongsToManyAddAssociationMixin<Category, number>

    matches: NonAttribute<MatchResultInstance[]>
    // Allows `addMatch` on a team instance
    addMatch: BelongsToManyAddAssociationMixin<MatchResult, number>

    admins: NonAttribute<Array<UserInstance>>
}

interface CategoryInstance extends Model<Category, Partial<Category>>, Category { }

interface MatchResultInstance extends Model<MatchResult, Partial<MatchResult>>, MatchResultDetails {
    teams: NonAttribute<TeamInfoInstance[]>
    // Allows `addTeam` on a match_result instance
    addTeam: BelongsToManyAddAssociationsMixin<TeamInfo, number>

    host: NonAttribute<HostInfoInstance>
}

interface HostInfoInstance extends Model<HostInfoBase, Partial<HostInfoBase>>, HostInfoBase {
    iceSheets: NonAttribute<Array<{ hostId: string, name: string }>>
    matches: NonAttribute<MatchResultInstance>
    //user: NonAttribute<{email: string}>
    admins?: NonAttribute<UserInstance[]>
}

interface RatingPeriodInstance extends Model<RatingPeriod, Partial<RatingPeriod>>, RatingPeriod { }

interface GlickoVariableInstance extends Model<GlickoVariable, Partial<GlickoVariable>>, GlickoVariable {}


/**
 * Managed by NextAuth, extends the default User model to include `account_type`
 */
export const UserModel = sequelize.define<UserInstance>('users', {
    ...models.User,
    // account_type is one of: ['team', 'host', 'admin']
    account_type: DataTypes.ENUM<string>(
        AccountType.TEAM,
        AccountType.HOST,
        AccountType.ADMIN,
    ),
})


/**
 * Managed by NextAuth, override the default `id_token` to use longer string
 */
export const AccountModel = sequelize.define<AccountInstance>("accounts", {
    ...models.Account,
    // overwrite default `id_token` data type because VARCHAR(255) is too short
    id_token: DataTypes.STRING(8192),
})


export const nextauthSequelizeAdaptor = SequelizeAdapter(sequelize, {
    models: {
        User: UserModel,
        Account: AccountModel,
    },
})


export const TeamInfoModel = sequelize.define<TeamInfoInstance>('TeamInfo', {
    teamId: {
        type: DataTypes.BIGINT,
        field: 'team_id',
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rating: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'team_profile',
    timestamps: false,
})


export const TeamAdminModel = sequelize.define('TeamAdmin', {
    teamId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: UserModel,
            key: 'id',
        },
    },
}, {
    tableName: 'team_admin',
    underscored: true,
    timestamps: false,
})


UserModel.belongsToMany(TeamInfoModel, {
    through: TeamAdminModel,
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'teams',
})
TeamInfoModel.belongsToMany(UserModel, {
    through: TeamAdminModel,
    foreignKey: {
        name: 'teamId',
        field: 'team_id',
    },
    as: 'admins',
})


export const TeamMemberModel = sequelize.define<TeamMemberInstance>('TeamMember', {
    memberId: {
        type: DataTypes.BIGINT,
        field: 'member_id',
        primaryKey: true,
        autoIncrement: true,
    },
    teamId: {
        type: DataTypes.BIGINT,
        field: 'team_id',
        allowNull: false,
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        // TODO: find out if unique can be true with a nullable field
        //unique: true,
    },
}, {
    tableName: 'team_members',
    timestamps: false,
})


TeamInfoModel.hasMany(TeamMemberModel, {
    foreignKey: {
        field: 'team_id',
        name: 'teamId',
    },
    as: {
        singular: 'member',
        plural: 'members',
    },
})
TeamMemberModel.belongsTo(TeamInfoModel, {
    foreignKey: {
        field: 'team_id',
        name: 'teamId',
    },
})


export const CategoryModel = sequelize.define<CategoryInstance>('Category', {
    categoryId: {
        type: DataTypes.BIGINT,
        field: 'category_id',
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'categories',
    timestamps: false,
})


export const CategoryTeamRel = sequelize.define('CategoryTeamRel', {
    categoryId: {
        type: DataTypes.BIGINT,
        field: 'category_id',
        references: {
            model: CategoryModel,
            key: 'category_id',
        },
    },
    teamId: {
        type: DataTypes.BIGINT,
        field: 'team_id',
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
}, {
    tableName: 'categories_rel',
    timestamps: false,
})


CategoryModel.belongsToMany(TeamInfoModel, {
    through: CategoryTeamRel,
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
    },
    as: {
        singular: 'Team',
        plural: 'Teams',
    },
})
TeamInfoModel.belongsToMany(CategoryModel, {
    through: CategoryTeamRel,
    foreignKey: {
        name: 'teamId',
        field: 'team_id',
    },
    as: {
        singular: 'Category',
        plural: 'Categories',
    },
})


export const HostInfoModel = sequelize.define<HostInfoInstance>('HostInfo', {
    hostId: {
        type: DataTypes.BIGINT,
        field: 'host_id',
        primaryKey: true,
        autoIncrement: true,
    },
    organization: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING(255),
    },
    phoneNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    streetAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    addressExtras: {
        type: DataTypes.STRING(255),
        field: 'address_extras',
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    zip: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM<string>('pending','accepted','rejected'),
        allowNull: false
    },
    updatedAt: {
	type: DataTypes.DATE(),
	defaultValue: DataTypes.NOW(),
    },
}, {
    tableName: 'host_profile',
    timestamps: false,
    underscored: true,
})

export const IceSheetModel = sequelize.define('Ice Sheet', {
    hostId: {
        type: DataTypes.UUID,
        field: 'host_id',
        primaryKey: true,
        references: {
            model: HostInfoModel,
            key: 'host_id',
        },
    },
    name: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
    },
}, {
    tableName: 'ice_sheets',
    timestamps: false,
})


export const HostAdminModel = sequelize.define('HostAdmin', {
    hostId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: HostInfoModel,
            key: 'host_id',
        },
    },
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: 'user_id',
        references: {
            model: UserModel,
            key: 'id',
        },
    },
}, {
    tableName: 'host_admin',
    underscored: true,
    timestamps: false,
})


UserModel.belongsToMany(HostInfoModel, {
    through: HostAdminModel,
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'hosts',
})
HostInfoModel.belongsToMany(UserModel, {
    through: HostAdminModel,
    foreignKey: {
        name: 'hostId',
        field: 'host_id',
    },
    as: 'admins',
})


HostInfoModel.hasMany(IceSheetModel, {
    foreignKey: {
        name: 'hostId',
        field: 'host_id',
    },
    as: 'iceSheets',
})
IceSheetModel.belongsTo(HostInfoModel, {
    foreignKey: {
        name: 'hostId',
        field: 'host_id',
    },
})


export const MatchModel = sequelize.define<MatchResultInstance>('Match Info', {
    matchId: {
        type: DataTypes.BIGINT,
        field: 'match_id',
        primaryKey: true,
        autoIncrement: true,
    },
    hostId: {
        type: DataTypes.BIGINT,
        field: 'host_id',
        references: {
            model: HostInfoModel,
            key: 'host_id',
        },
    },
    teamId1: {
        type: DataTypes.BIGINT,
        field: 'team_id_1',
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    teamId2: {
        type: DataTypes.BIGINT,
        field: 'team_id_2',
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    winner: {
        type: DataTypes.ENUM('team_id_1', 'team_id_2', 'tie'),
        allowNull: false,
    },
    sheetOfIce: {
        type: DataTypes.STRING(255),
        field: 'sheet_of_ice',
    },
    comments: {
        type: DataTypes.STRING(512),
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'match_info',
    timestamps: false,
})


export const MatchTeamRel = sequelize.define('MatchTeamRel', {
    teamId: {
        type: DataTypes.BIGINT,
        field: 'team_id',
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    matchId: {
        type: DataTypes.BIGINT,
        field: 'match_id',
        references: {
            model: MatchModel,
            key: 'match_id',
        },
    },
}, {
    tableName: 'match_team_rel',
    timestamps: false,
})


MatchModel.belongsToMany(TeamInfoModel, {
    through: MatchTeamRel,
    foreignKey: {
        name: 'matchId',
        field: 'match_id',
    },
    as: {
        singular: 'team',
        plural: 'teams',
    },
})
TeamInfoModel.belongsToMany(MatchModel, {
    through: MatchTeamRel,
    foreignKey: {
        name: 'teamId',
        field: 'team_id',
    },
    as: {
        singular: 'match',
        plural: 'matches',
    },
})


MatchModel.belongsTo(HostInfoModel, {
    foreignKey: {
        name: 'hostId',
        field: 'host_id',
    },
    as: 'host',
})
HostInfoModel.hasMany(MatchModel, {
    foreignKey: {
        name: 'hostId',
        field: 'host_id',
    },
    as: 'matches',
})


export const RatingPeriodModel = sequelize.define<RatingPeriodInstance>('RatingPeriod', {
    ratingPeriodId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'rating_periods',
    timestamps: false,
    underscored: true,
})


export const GlickoVariableModel = sequelize.define<GlickoVariableInstance>('GlickoVariable', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    systemConstant: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    defaultRating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    defaultRatingDeviation: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    defaultVolatility: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    version: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'glicko_variables',
    timestamps: false,
    underscored: true,
})


export const TeamGlickoInfoModel = sequelize.define('TeamGlickoInfo', {
    teamId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    ratingDeviation: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    volatility: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'team_glicko_info',
    timestamps: false,
    underscored: true,
})


TeamInfoModel.hasOne(TeamGlickoInfoModel, {
    foreignKey: {
        name: 'teamId',
        field: 'team_id',
    },
    as: 'teamGlickoInfo',
})
TeamGlickoInfoModel.belongsTo(TeamInfoModel, {
    foreignKey: {
        name: 'teamId',
        field: 'team_id',
    },
})


export const RatingHistoryModel = sequelize.define('RatingHistory', {
    teamId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: 'identifier',
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    ratingPeriodId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: 'identifier',
        references: {
            model: RatingPeriodModel,
            key: 'rating_period_id',
        },
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    ratingDeviation: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    volatility: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'rating_history',
    timestamps: false,
    underscored: true,
})


TeamInfoModel.belongsToMany(RatingPeriodModel, {
    through: RatingHistoryModel,
    foreignKey: {
        name: 'teamId',
        field: 'team_id',
    },
    as: 'ratingPeriods',
})
RatingPeriodModel.belongsToMany(TeamInfoModel, {
    through: RatingHistoryModel,
    foreignKey: {
        name: 'ratingPeriodId',
        field: 'rating_period_id',
    },
    as: 'teams',
})

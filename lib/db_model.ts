import { DataTypes, Model, HasManyAddAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, NonAttribute } from 'sequelize'
import { sequelize } from './db'
import { models } from "@next-auth/sequelize-adapter"
import type { Account as AdapterAccount } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'

import { Category, HostInfoBase, TeamInfo, TeamMember } from './models'
import { MatchResult, MatchResultDetails } from './models/match'
import { TeamInfoRatings } from './models/team'
import { RatingPeriod } from './models/glicko'

interface TeamMemberInstance extends Model<TeamMember, Partial<TeamMember>>, TeamMember { }

interface TeamInfoInstance extends Model<TeamInfo, Partial<TeamInfo>>, TeamInfo {
    members: NonAttribute<TeamMember[]>
    // Allows `addMember` on a team instance
    addMember: HasManyAddAssociationMixin<TeamMemberInstance, number>

    categories: Array<Category>
    // Allows `addCategory` on a team instance
    addCategory: BelongsToManyAddAssociationMixin<Category, number>

    matches: NonAttribute<MatchResult[]>
    // Allows `addMatch` on a team instance
    addMatch: BelongsToManyAddAssociationMixin<MatchResult, number>
}

interface CategoryInstance extends Model<Category, Partial<Category>>, Category { }

interface MatchResultInstance extends Model<MatchResult, Partial<MatchResult>>, MatchResultDetails {
    teams: NonAttribute<TeamInfoRatings[]>
    // Allows `addTeam` on a match_result instance
    addTeam: BelongsToManyAddAssociationsMixin<TeamInfo, number>
}

interface HostInfoInstance extends Model<HostInfoBase, Partial<HostInfoBase>>, HostInfoBase {
    iceSheets: Array<{ hostId: string, name: string }>
}

interface RatingPeriodInstance extends Model<RatingPeriod, Partial<RatingPeriod>>, RatingPeriod { }

/**
 * Redefine next-auth's User instance
 */
interface UserInstance extends
    Model<AdapterUser, Partial<AdapterUser>>, AdapterUser {
    account_type?: String
}

interface AccountInstance extends
    Model<AdapterAccount, Partial<AdapterAccount>>, AdapterAccount { }

declare module 'next-auth' {
    interface UserInstance extends
        Model<AdapterUser, Partial<AdapterUser>>, AdapterUser {
        account_type?: String
    }
}


/**
 * Managed by NextAuth, extends the default User model to include `account_type`
 */
export const UserModel = sequelize.define<UserInstance>('users', {
    ...models.User,
    // account_type is one of: ['curler', 'club', 'admin']
    account_type: DataTypes.STRING(256),
})


/**
 * Managed by NextAuth, override the default `id_token` to use longer string
 */
export const AccountModel = sequelize.define<AccountInstance>("accounts", {
    ...models.Account,
    // overwrite default `id_token` data type because VARCHAR(255) is too short
    id_token: DataTypes.STRING(8192),
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
        allowNull: false,
    },
}, {
    tableName: 'team_profile',
    timestamps: false,
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
    foreignKey: 'teamId',
    as: {
        singular: 'member',
        plural: 'members',
    },
})
TeamMemberModel.belongsTo(TeamInfoModel, {
    foreignKey: 'teamId',
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
    foreignKey: 'category_id',
    as: {
        singular: 'Team',
        plural: 'Teams',
    },
})
TeamInfoModel.belongsToMany(CategoryModel, {
    through: CategoryTeamRel,
    foreignKey: 'team_id',
    as: {
        singular: 'Category',
        plural: 'Categories',
    },
})


export const HostInfoModel = sequelize.define<HostInfoInstance>('HostInfo', {
    hostId: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
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
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
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
        type: DataTypes.UUIDV4,
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

HostInfoModel.hasMany(IceSheetModel, {
    foreignKey: 'hostId',
    as: 'iceSheets',
})
IceSheetModel.belongsTo(HostInfoModel, {
    foreignKey: 'hostId',
})


export const MatchModel = sequelize.define<MatchResultInstance>('Match Info', {
    matchId: {
        type: DataTypes.BIGINT,
        field: 'match_id',
        primaryKey: true,
        autoIncrement: true,
    },
    hostId: {
        type: DataTypes.UUIDV4,
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
    foreignKey: 'matchId',
    as: {
        singular: 'team',
        plural: 'teams',
    },
})
TeamInfoModel.belongsToMany(MatchModel, {
    through: MatchTeamRel,
    foreignKey: 'teamId',
    as: {
        singular: 'Match',
        plural: 'Matches',
    },
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


export const GlickoVariableModel = sequelize.define('GlickoVariable', {
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
            key: 'teamId',
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


TeamInfoModel.hasOne(TeamGlickoInfoModel, { foreignKey: 'teamId', as: 'teamGlickoInfo' })
TeamGlickoInfoModel.belongsTo(TeamInfoModel, { foreignKey: 'teamId' })


export const RatingHistoryModel = sequelize.define('RatingHistory', {
    teamId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: TeamInfoModel,
            key: 'team_id',
        },
    },
    ratingPeriodId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
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

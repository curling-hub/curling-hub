import { DataTypes, Model } from 'sequelize'
import { sequelize } from './db'
import { Category, HostInfoBase, TeamInfo } from './models'


interface TeamInfoInstance
    extends Model<TeamInfo, TeamInfo>, TeamInfo { }

interface CategoryInstance extends Model<Category, Category>, Category { }

interface HostInfoInstance extends Model<HostInfoBase, HostInfoBase>, HostInfoBase {
    iceSheets: Array<{ hostId: string, name: string }>,
}

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


CategoryModel.belongsToMany(TeamInfoModel, { through: CategoryTeamRel, foreignKey: 'category_id' })
TeamInfoModel.belongsToMany(CategoryModel, { through: CategoryTeamRel, foreignKey: 'team_id' })


export const HostInfoModel = sequelize.define<HostInfoInstance>('HostInfo', {
    hostId: {
        type: DataTypes.UUIDV4,
        field: 'host_id',
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
        field: 'phone_number',
        allowNull: false,
    },
    streetAddress: {
        type: DataTypes.STRING(255),
        field: 'street_address',
        allowNull: false,
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
}, {
    tableName: 'host_profile',
    timestamps: false,
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


export const MatchModel = sequelize.define('Match Info', {
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
    categoryId: {
        type: DataTypes.BIGINT,
        field: 'category_id',
        references: {
            model: CategoryModel,
            key: 'category_id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'match_info',
    timestamps: false,
})



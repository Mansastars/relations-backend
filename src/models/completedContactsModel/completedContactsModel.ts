import { DataTypes, Model } from 'sequelize';
import { database } from '../../configurations/index';

export interface CompletedContactAttributes {
    [x: string]: any;
    id: string;
    title: string;
    first_name: string;
    last_name: string;
    organization_name: string;
    linkedin_url: string;
    email: string;
    phone_number: string;
    profile_pic: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CompletedContact extends Model<CompletedContactAttributes> {
    [x: string]: any;
}

CompletedContact.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    organization_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    linkedin_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_pic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }

}, {
    sequelize: database,
    tableName: 'CompletedContact'
}
)

export default CompletedContact
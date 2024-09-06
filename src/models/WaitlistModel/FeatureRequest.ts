
import { DataTypes, Model, Sequelize } from 'sequelize';
import { database } from '../../configurations/index';

export interface FeatureRequestAttributes {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
  feature_title?: string;
  feature_note?: string;
  feature_date?: string;
  amount: string;
  team_size?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class FeatureRequest extends Model<FeatureRequestAttributes> {
  [x: string]: any;
}

FeatureRequest.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  feature_title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  feature_note: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  feature_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  team_size: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  }
}, {
  sequelize: database,
  tableName: 'FeatureRequest',
  timestamps: false,
});

export default FeatureRequest;

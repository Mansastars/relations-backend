
import { DataTypes, Model, Sequelize } from 'sequelize';
import { database } from '../../configurations/index';

export interface WaitListAttributes {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  email_provider?: string;
  telephone?: string;
  company?: string;
  role?: string;
  team_size?: string;
  feature?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class WaitList extends Model<WaitListAttributes> {
  [x: string]: any;
}

WaitList.init({
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
  email_provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  team_size: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  feature: {
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
  tableName: 'WaitList',
  timestamps: false,
});

export default WaitList;

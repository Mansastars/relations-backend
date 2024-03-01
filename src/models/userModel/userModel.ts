import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export enum role {
  ADMIN = "Admin",
  USER = "User",
}


export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  user_name?: string;
  email: string;
  phone_number?: string;
  bio?: string;
  password: string;
  role: string;
  profile_picture?: string;
  on_trial?: boolean;
  is_subscribed?: boolean;
  subscription_name?: string;
  subscription_start_date?: Date;
  subscription_end_date?: Date;
  isVerified?: boolean;
  isBlocked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Model<UserAttributes> {
    [x: string]: any;
}

User.init(
  {
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
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
    on_trial:{
      type: DataTypes.BOOLEAN,
    },
    is_subscribed: {
      type: DataTypes.BOOLEAN,
    },
    subscription_name: {
        type: DataTypes.STRING,
      },
    subscription_start_date: {
        type: DataTypes.DATE,
      },
      subscription_end_date: {
        type: DataTypes.DATE,
      },
    isVerified: {
      type: DataTypes.BOOLEAN,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: database,
    tableName: "User",
  }
);

export default User;
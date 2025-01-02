import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../../configurations/index";
import User from "../userModel/userModel";

export enum permission {
  VIEWER = "Viewer",
  EDITOR = "Editor",
}

export enum status {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected"
}

export interface CompanyStaffAttributes {
  id: string;
  companyId: string; 
  staffId?: string; 
  email: string;
  permission?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Creation attributes for Sequelize
type CompanyStaffCreationAttributes = Optional<CompanyStaffAttributes, "id" | "staffId">;

export class CompanyStaff extends Model<CompanyStaffAttributes, CompanyStaffCreationAttributes> {}

// Initialize model
CompanyStaff.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    staffId: {
      type: DataTypes.UUID, // Optional field
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    permission: {
      type: DataTypes.ENUM(...Object.values(permission)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(status)),
      allowNull: false,
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
    tableName: "CompanyStaff",
  }
);

// Define associations
User.hasMany(CompanyStaff, {
  foreignKey: "companyId",
  as: "staffMembers",
});

CompanyStaff.belongsTo(User, {
  foreignKey: "companyId",
  as: "company",
});

CompanyStaff.belongsTo(User, {
  foreignKey: "staffId",
  as: "staff",
});

export default CompanyStaff;

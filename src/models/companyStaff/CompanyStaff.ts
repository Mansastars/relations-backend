import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../../configurations/index";
import User from "../userModel/userModel";

// Attributes interface
export interface CompanyStaffAttributes {
  id: string;
  companyId: string; // Foreign key to the User table (company with role "COMPANY")
  staffId?: string; // Foreign key to the User table (existing staff member)
  email: string; // Staff email (used when staffId is not available)
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

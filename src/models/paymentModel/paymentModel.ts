import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export interface PaymentAttributes {
  id: string;
  user_id: string;
  session:JSON;
  session_id: string;
  plan_id: string;
  plan_type: string;
  status: string;
  plan_start_date: Date;
  plan_end_date: Date;
  plan_duration: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Payment extends Model<PaymentAttributes> {
    [x: string]: any;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:true
    },
    plan_start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    plan_end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    plan_duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    tableName: "Payment",
  }
);

export default Payment;
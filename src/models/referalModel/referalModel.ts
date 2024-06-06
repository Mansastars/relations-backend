// import {DataTypes, Model} from 'sequelize';
// import { database } from '../../configurations/index';

// export interface ReferalAttributes {
//     [x: string]: any;
//     id: string;
//     user_id: string;
//     referrer_id: string;
//     referal_code:string;
//     referees: string;
//     total_earnings: string;
//     bank_name:string;
//     account_name:string;
//     account_number:string;
//     routing_number:string;
//     paypal_email:string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// export class Referal extends Model<ReferalAttributes> {
//     [x: string]: any;
// }

// Referal.init({
//      id: {
//     type: DataTypes.UUID,
//     primaryKey: true,
//     allowNull: false
// },
// owner_id: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// title: {
//     type:DataTypes.STRING,
//     allowNull:true
// },
// first_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// last_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// gender:{
//     type:DataTypes.STRING,
//     allowNull: true
// },
// organization_name: {
//     type: DataTypes.STRING,
//     allowNull:true
// },
// linkedin_url:{
//     type: DataTypes.STRING,
//     allowNull:true
// },
// email: {
//     type: DataTypes.STRING,
//     allowNull:true
// },
// phone_number: {
//     type: DataTypes.STRING,
//     allowNull:true
// },
// profile_pic:{
//     type:DataTypes.STRING,
//     allowNull:true
// },
// createdAt: {
//     type: DataTypes.DATE    
// },
// updatedAt: {
//     type: DataTypes.DATE    
// }

// },{
//     sequelize: database,
//     tableName: 'GeneralContact'
// }
// )

// export default Referal
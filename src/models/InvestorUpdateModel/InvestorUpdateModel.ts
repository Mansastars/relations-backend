import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface InvestorsUpdateAttributes {
    [x: string]: any;
    id: string;
    user_id: string;
    company_name: string;
    company_description: string;
    website: string;
    deck_line: string;
    email_subject: string;
    founders_message: string;
    founders_profile: string;
    recipients_emails: string;
    requests: string;
    targets: string;
    user_MoM_growth_rate: string;
    gross_margin: string;
    lows: string;
    wins: string
    news: string;
    cash_in_hand: string;
    cash_burn: string;
    logoUrl: string
    chartImageUrl: string;
    januaryMRR: number;
    februaryMRR: number;
    marchMRR: number;
    aprilMRR: number;
    mayMRR: number;
    juneMRR: number;
    julyMRR: number;
    augustMRR: number;
    septemberMRR: number;
    octoberMRR: number;
    novemberMRR: number;
    decemberMRR: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export class InvestorsUpdate extends Model<InvestorsUpdateAttributes> {
    [x: string]: any;
}

InvestorsUpdate.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
user_id: {
    type: DataTypes.STRING,
    allowNull: false,
},
company_name: {
    type:DataTypes.STRING,
    allowNull:true
},
company_description: {
    type: DataTypes.TEXT,
    allowNull: false,
},
website: {
    type: DataTypes.STRING,
    allowNull: false,
},
deck_line:{
    type:DataTypes.STRING,
    allowNull: true
},
email_subject: {
    type: DataTypes.STRING,
    allowNull:true
},
founders_message:{
    type: DataTypes.TEXT,
    allowNull:true
},
founders_profile: {
    type: DataTypes.STRING,
    allowNull:true
},
recipients_emails: {
    type: DataTypes.TEXT,
    allowNull:true
},
requests:{
    type:DataTypes.STRING,
    allowNull:true
},
targets:{
    type:DataTypes.STRING,
    allowNull:true
},
user_MoM_growth_rate:{
    type:DataTypes.STRING,
    allowNull:true
},
gross_margin:{
    type:DataTypes.STRING,
    allowNull:true
},
lows:{
    type:DataTypes.STRING,
    allowNull:true
},
wins:{
    type:DataTypes.STRING,
    allowNull:true
},
news:{
    type:DataTypes.TEXT,
    allowNull:true
},
cash_in_hand:{
    type:DataTypes.TEXT,
    allowNull:true
},
cash_burn:{
    type:DataTypes.TEXT,
    allowNull:true
},
logoUrl:{
    type:DataTypes.TEXT,
    allowNull:true
},
chartImageUrl:{
    type:DataTypes.TEXT,
    allowNull:true
},
januaryMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
februaryMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
marchMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
aprilMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
mayMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
juneMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
julyMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
augustMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
septemberMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
octoberMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
novemberMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
decemberMRR:{
    type:DataTypes.INTEGER,
    allowNull:true
},
date:{
    type:DataTypes.DATE,
    allowNull:true
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'InvestorsUpdate'
}
)

export default InvestorsUpdate
import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';


export enum stageType {
    RESEARCH="Research",
    PROSPECT="Prospect",
    CONTACTED="Contacted",
    PITCH="Pitch",
    REVIEW="On-going Review / Due Diligence",
    PARTNER="Partner/ Decision Maker Meeting",
    OFFER="Term Sheet/ Initial Offer",
    NEGOTIATION="Negotiation",
    DEAL="Deal/ Agreement signed",
    FOLLOWUP="Follow up/ Add to Newsletter",
    REJECTION="Rejection/ Not a fit"
}

export interface ContactAttributes {
    [x: string]: any;
    id: string;
    owner_id: string;
    deal_id: string;
    priority?: number;
    title?:string;
    first_name: string;
    last_name: string;
    gender?: string;
    moves_made?: number;
    organization_name?: string;
    linkedin_url?: string;
    deal_size?: number;
    contact_color?: string;
    email?: string;
    phone_number?: string;
    profile_pic?: string;
    stage: string;
    meeting_date?: Date;
    rating?: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Contact extends Model<ContactAttributes> {
    [x: string]: any;
}

Contact.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
owner_id: {
    type: DataTypes.STRING,
    allowNull: false,
},
deal_id: {
    type: DataTypes.STRING,
    allowNull: false,
},
priority: {
    type:DataTypes.INTEGER,
    allowNull: true
},
title: {
    type:DataTypes.STRING,
    allowNull:true
},
first_name: {
    type: DataTypes.STRING,
    allowNull: false,
},
last_name: {
    type: DataTypes.STRING,
    allowNull: false,
},
gender:{
    type:DataTypes.STRING,
    allowNull: true
},
moves_made:{
    type:DataTypes.INTEGER,
    allowNull: true
},
organization_name: {
    type: DataTypes.STRING,
    allowNull:true
},
linkedin_url:{
    type: DataTypes.STRING,
    allowNull:true
},
deal_size: {
  type: DataTypes.INTEGER,
  allowNull:true  
},
contact_color:{
    type: DataTypes.STRING,
    allowNull: true
},
email: {
    type: DataTypes.STRING,
    allowNull:true
},
phone_number: {
    type: DataTypes.STRING,
    allowNull:true
},
profile_pic:{
    type:DataTypes.STRING,
    allowNull:true
},
stage: {
    type: DataTypes.ENUM(...Object.values(stageType)),
    allowNull:false
},
meeting_date: {
    type: DataTypes.DATE,
    allowNull:true 
},
rating:{
    type:DataTypes.INTEGER,
    allowNull:true
},
notes: {
    type: DataTypes.STRING,
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
    tableName: 'Contact'
}
)

export default Contact
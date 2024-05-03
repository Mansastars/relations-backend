import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface GeneralContactAttributes {
    [x: string]: any;
    id: string;
    owner_id: string;
    title?:string;
    first_name: string;
    last_name: string;
    gender?: string;
    organization_name?: string;
    linkedin_url?: string;
    email?: string;
    phone_number?: string;
    profile_pic?: string;
    rating?: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export class GeneralContact extends Model<GeneralContactAttributes> {
    [x: string]: any;
}

GeneralContact.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
owner_id: {
    type: DataTypes.STRING,
    allowNull: false,
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
organization_name: {
    type: DataTypes.STRING,
    allowNull:true
},
linkedin_url:{
    type: DataTypes.STRING,
    allowNull:true
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
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'GeneralContact'
}
)

export default GeneralContact
import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';

export interface DealAttributes {
    [x: string]: any;
    id: string;
    owner_id: string;
    deal_name: string;
    deal_size: number;
    dead_line: Date;
    negotiation_value: number;
    signed_value: number;
    createdAt: Date;
    updatedAt: Date;
}

export class Deal extends Model<DealAttributes> {
    [x: string]: any;
}

Deal.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
owner_id: {
    type: DataTypes.STRING,
    allowNull: false,
},
deal_name: {
    type: DataTypes.STRING,
    allowNull: false,
},
deal_size: {
  type: DataTypes.INTEGER    
},
dead_line: {
    type: DataTypes.DATE  
},
negotiation_value: {
    type: DataTypes.INTEGER,
},
signed_value: {
    type: DataTypes.INTEGER
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'Deal'
}
)

export default Deal
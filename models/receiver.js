//import { Schema } from 'mongoose';
import pkg from 'mongoose';
const { Schema, model } = pkg;

const ReceiverSchema  = new Schema({
    latitude:{
        type:Number,
        
    },
    longitude:{
        type: Number,
        
    },
    coverage:{
        type: Number,
        
    }
});

const Receiver = model('Receiver', ReceiverSchema);

export default Receiver
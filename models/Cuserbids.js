const {Schema, model} = require('mongoose');

const schema = new Schema({
    c_username:{
        type: String,
        required: true,
    },
    post_id:{
        type: String,
        required: true,
    },
    bid_amount:{
        type:Number,
    },
    

})

module.exports = model('Cuserbids', schema)
const mongoose=require('mongoose')
const budgetSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    budget:{
        type:Number,
        required:true,
    },
    color:{
        type:String,
        required:true,
    }
},{collection:'Mybudget'})

module.exports = mongoose.model('Mybudget',budgetSchema)
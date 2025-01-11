import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
})


const CandidateModel = mongoose.model('Candidate', candidateSchema);

export default CandidateModel
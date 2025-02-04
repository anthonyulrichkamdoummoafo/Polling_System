import CandidateModel from "../models/CandidateModel.js";




const getOneCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await CandidateModel.findById(id);
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const createCandidate = async (req, res) => {
    try {
        const newCandidate = new CandidateModel(req.body);
        await newCandidate.save();
        res.status(201).json({ msg: "Candidate created successfully", value: newCandidate });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export { createCandidate, getOneCandidate }

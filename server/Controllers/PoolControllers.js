import PoolModel from "../models/PoolModel.js"


const getAllPolls = async (req, res) => {

    try {

        const allPools = await PoolModel.find();
        res.status(200).json(allPools);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


const getOnePoll = async (req, res) => {
    const { id } = req.params;
    try {
        const onePoll = await PoolModel.findById(id);
        onePoll ? res.status(200).json(onePoll) : res.status(404).json({ msg: "Poll not found" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



const createPoll = async (req, res) => {
    const { title,
        description,
        creator,
        candidates,
        image,
        status } = req.body
    try {
        const newPoll = new PoolModel({ title, description, creator, candidates, image, status })
        await newPoll.save()
        res.status(201).json({ msg: "Poll created successfully", value: newPoll })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export { getAllPolls, getOnePoll, createPoll }
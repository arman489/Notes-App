import NoteSchema from '../models/NoteSchema.js'

/// Create Notes
const PostNotes = async (req, res) => {
    try {
        const { title, content, name } = req.body
        const saveData = new NoteSchema({ title, content, name, userId: req.userId, })
        await saveData.save()
        return res.status(200).json({
            success: true,
            message: 'Notes Create Successfull'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Notes Not create'
        })
    }
}

/// Get notes Data Logic
const getNotes = async (req, res) => {
    try {
        const getNote = await NoteSchema.find({ userId: req.userId })
        return res.status(200).json({
            success: true,
            getNote
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Empty Data"
        })
    }
}

//// Single page Logic

const getSingle = async (req, res) => {
    try {
        const { id } = req.params
        const single = await NoteSchema.findById(id)
        if (!single) {
            return res.status(404).json({
                success: false,
                message: "Single Notes not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "open",
            single
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not found single Data "
        })
    }

}

/// Update Data Logic

const UpdateData = async (req, res) => {
    try {

        const { id } = req.params
        const { title, content, name } = req.body
        const updatedData = await NoteSchema.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { title, content, name },
            { new: true }
        )
        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "Update Note not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Successfull Updated',
            updatedData
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Not Updated'
        })

    }
}

//// Delete Data logic
const getDelete = async (req, res) => {
    try {
        const { id } = req.params
        const note = await NoteSchema.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you are not authorized."
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Delete Successfull',
            data: note
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong in the server'
        })
    }

}


/// Search Logic 
const searchNotes = async (req, res) => {
    try {
        const { search } = req.query;

        const notes = await NoteSchema.find({
            userId: req.userId,
            $or: [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
            ],
        });

        return res.status(200).json({
            success: true,
            notes,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export {
    PostNotes,
    getNotes,
    getSingle,
    UpdateData,
    getDelete,
    searchNotes
}
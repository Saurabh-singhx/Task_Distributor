import xlsx from 'xlsx';
import User from '../models/user.model.js';
import Task from '../models/task.model.js';
import bcrypt from 'bcrypt';

export const uploadFile = async (req, res) => {
    try {
        console.log("Incoming file:", req.file);
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        console.log("Workbook sheets:", workbook.SheetNames);
        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            return res.status(400).json({ message: 'No sheets found in file' });
        }
        const sheetName = workbook.SheetNames[0];
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        console.log("Parsed data:", jsonData);

        if (!jsonData.length) {
            return res.status(400).json({ message: 'Sheet is empty or invalid format' });
        }


        const users = await User.find()
        const length = users.length;

        const tasks = jsonData.map((item, index) => {
            const userIndex = index % length;
            return {
                firstName: item.FirstName || '',
                phone: item.Phone || '',
                notes: item.Notes || '',
                assignedTo: users[userIndex]._id,
            };
        });

        await Task.insertMany(tasks);

        res.status(201).json({
            message: 'File processed and tasks assigned',
            count: tasks.length,
        });
    } catch (error) {
        console.error('Error processing file:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createUser = async (req, res) => {

    const { fullName, email, password, phone } = req.body;

    try {

        if (!fullName || !email || !password || !phone) {
            return res.status(500).json({ message: "All fields should be filled" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "message should be atleast six characters" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            phone:phone,

        })

        if (newUser) {
            await newUser.save();

            res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } });
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("error in create user controller", error.message);
        return res.status(500).json({ message: "Internal server error" })
    }
};

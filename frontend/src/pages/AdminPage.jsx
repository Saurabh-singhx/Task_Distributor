import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, X, UserPlus, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { authStore } from '../store/authStore';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDropzone } from 'react-dropzone'


function AdminPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setSelectedFile(acceptedFiles[0]);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const { upload, createAgent, isUploading,isCreatingAgent } = authStore();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error('Only CSV, XLSX or XLS files are allowed.');
            return;
        }

        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.error('Please upload a file first.');
            return;
        }

        upload(selectedFile);
        setSelectedFile(null);
    };

    const removeFile = () => setSelectedFile(null);

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUserCreate = (e) => {
        e.preventDefault();
        const { fullName, email, phone, password } = userData;

        if (!fullName || !email || !phone || !password) {
            toast.error('All fields are required!');
            return;
        }
        createAgent(userData)
        setUserData({ fullName: '', email: '', phone: '', password: '' });
        setShowUserForm(false);
    };

    return (
        <div className="min-h-[91vh] flex flex-col md:flex-row justify-center items-center bg-sky-100 lg:px-30 md:px-10 sm:flex-col py-8 gap-8">
            {/* File Upload Section */}
            <div className="bg-white rounded-3xl shadow-xl w-full lg:max-w-[40%] p-8 space-y-6 max-w-[80%] h-96 flex flex-col justify-between">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Admin File Upload</h2>
                    <p className="text-gray-500 text-sm">Upload CSV, XLSX or XLS files only</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col items-center justify-center gap-2">
                        {/* <label className="w-full cursor-pointer">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition justify-center">
                                <UploadCloud size={20} className="text-sky-400" />
                                <span className="text-sm text-gray-600">
                                    {selectedFile ? 'Change File' : 'Upload File'}
                                </span>
                            </div>

                            <input
                                type="file"
                                accept=".csv, .xlsx, .xls"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                        </label> */}
                        <div
                            className='w-full'
                            {...getRootProps()}>
                            <input
                                onChange={handleFileChange}
                                
                                {...getInputProps()} />
                            {
                                isDragActive ?
                                    <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-sky-400 bg-sky-50 rounded-xl p-6 transition">
                                        <UploadCloud size={32} className="text-sky-400 animate-bounce" />
                                        <p className="text-sky-600 font-medium">Drop the files here ...</p>
                                    </div> :
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition justify-center cursor-pointer">
                                        <UploadCloud size={20} className="text-sky-400" />
                                        <span className="text-sm text-gray-600">
                                            {selectedFile ? 'Change File' : 'Upload File or Just Drag and Drop'}
                                        </span>
                                    </div>
                            }
                        </div>

                        {selectedFile && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                                <FileText size={16} className="text-sky-400" />
                                {selectedFile.name}
                                <button type="button" onClick={removeFile} className="text-red-400 hover:text-red-500">
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    <Button
                        sx={{ ":hover": { backgroundColor: "#2BABE3" }, borderRadius: '99px', bgcolor: '#38bdf8', color: 'white' }}
                        variant="text"
                        type="submit"
                        className="w-full py-2 rounded-full bg-sky-400 text-white font-semibold hover:bg-sky-500 transition"
                    >
                        {isUploading ? <CircularProgress size={25} /> : 'Submit'}
                    </Button>
                </form>
            </div>

            {/* Create User Section */}
            <div className="bg-white rounded-3xl shadow-xl w-full lg:max-w-[40%] max-w-[80%] p-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="lg:text-2xl text-xl font-semibold text-gray-700">Create New User</h2>
                    <Button
                        sx={{ ":hover": { backgroundColor: "#E7EDED" }, borderRadius: '99px' }}
                        variant="text"
                        onClick={() => setShowUserForm(!showUserForm)}
                        className="flex items-center text-sky-400 hover:text-sky-500"
                    >
                        <UserPlus size={20} className="mr-1" />
                        {/* {showUserForm ? <ChevronUp size={18} /> : <ChevronDown size={18} />} */}
                    </Button>
                </div>


                <form onSubmit={handleUserCreate} className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleUserInputChange}
                        placeholder="Full Name"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleUserInputChange}
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleUserInputChange}
                        placeholder="Phone"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleUserInputChange}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <Button
                        onClick={handleUserCreate}
                        sx={{ ":hover": { backgroundColor: "#2BABE3" }, borderRadius: '99px', bgcolor: '#38bdf8', color: 'white' }}
                        variant="text"
                        className="w-full py-2 rounded-full bg-sky-400 text-white font-semibold hover:bg-sky-500 transition"
                    >
                       {isCreatingAgent ? <CircularProgress size={25} /> : 'Create User'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AdminPage;

import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import { add } from '../../assets'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../services/operations/todos';
import { toast } from 'react-toastify';
import { setUser } from '../../redux/slices/authSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Template({ type, tasks, setTasks }) {
    const token = useSelector(state => state.token)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        name: "",
        description: "",
        progress: "",
        category: type
    })

    function handleChange(e) {
        setTask(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    function validateTask(task) {
        console.log(task);
        if (task?.name?.trim() == "" || task?.description?.trim() == "" || task.progress == "") {
            toast.error("Empty Fields", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark"
            })
            return false;
        }

        const progressValue = Number(task.progress);
        if (isNaN(progressValue) || progressValue < 0 || progressValue > 10) {
            toast.error('Progress must be a number between 0 and 10.', {
                position: "top-center",
                autoClose: 2000,
                theme: "dark"
            });
            return false;
        }
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (validateTask(task)) {
            const res = await addTask(task, token);
            dispatch(setUser(res?.user));
            setTask({
                name: "",
                description: "",
                progress: 0,
                category: type
            })
            setTasks(prev => [...prev, res?.newTodo]);
            setOpen(false);
        }

    }

    return (
        <div className='lg:w-6/12 w-full p-4  lg:m-4 h-fit lg:min-h-[80vh] rounded-md border-2 border-[#1C1D2214] flex flex-col border-dashed'>
            <div className='flex justify-between'>
                <div className='text-sm font-medium text-[#1C1D2280]'>{type === "todo" ? 'To do' : type === "progress" ? 'In progress' : 'Done'}({tasks?.length})</div>
                <div className='flex items-center gap-2 font-semibold opacity-80'>
                    <img src={add} alt="" />
                    <div onClick={() => setOpen(true)} className='text-sm hover:underline cursor-pointer'>Add new task</div>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form onSubmit={handleSubmit} className='space-y-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-medium'>Task Name:</label>
                                    <input value={task.name} onChange={handleChange} autoComplete='off' name='name' className='border-[1px] border-black px-2 py-2' type="text" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-medium'>Task Desc:</label>
                                    <input value={task.description} onChange={handleChange} autoComplete='off' name='description' className='border-[1px] border-black px-2 py-2' type="text" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-medium'>Progress:</label>
                                    <input value={task.progress} onChange={handleChange} autoComplete='off' name='progress' className='border-[1px] border-black px-2 py-2' type="text" />
                                </div>
                                <button className='bg-[#424242] px-6 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer py-2 mt-2 text-[#cacaca]' type="submit">Add task</button>
                            </form>
                        </Box>
                    </Modal>
                </div>
            </div>
            <div className='flex flex-col gap-4 lg:mt-4 mt-2'>
                {tasks?.map((task, index) => {
                    return <TodoCard validateTask={validateTask} key={index} setTask={setTask} setTasks={setTasks} task={task} />
                })}
            </div>

        </div>
    )
}

export default Template
import React, { useEffect, useState } from 'react'
import { Line } from 'rc-progress';
import { RxHamburgerMenu } from "react-icons/rx";
import { SlOptions } from "react-icons/sl";
import { BsChatRightDots } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from '../../services/operations/todos';
import { setUser } from '../../redux/slices/authSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { editTodo as editTODO } from '../../services/operations/todos';
import { toast } from 'react-toastify';

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

function TodoCard({ task, setTask, setTasks, validateTask }) {
    const [open, setOpen] = useState(false);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false)
    const [editTodo, setEditTodo] = useState({ ...task });

    async function handleDelete(id) {
        const res = await deleteTodo(id, token);
        dispatch(setUser(res));
        setTasks(prev => prev.filter(todo => todo._id !== task._id))
    }

    async function handleUpdate(e) {
        try {
            e.preventDefault();
            if (validateTask(editTodo)) {
                let id = toast.loading('Updating Todo', {
                    position: 'top-center',
                    theme: "dark",
                    autoClose: 2000
                })
                const res = await editTODO(task._id, editTodo, token);
                setTasks(prev => {
                    return prev.map((todo) => {
                        if (todo._id === res._id) {
                            return res;
                        }
                        else {
                            return todo;
                        }
                    })
                })
                setMenuOpen(false);
                setOpen(false);
                toast.dismiss(id);
                toast.success('Updated', {
                    position: 'top-center',
                    theme: "dark",
                    autoClose: 1000
                })
            }
        } catch (error) {
            toast.error('Error updating todo')
        }
    }

    function handleChange(e) {
        setEditTodo(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <div className='h-[170px] w-full dark:bg-[#2a2b30] xl:min-w-[300px] rounded-xl flex flex-col border-2 border-[#1C1D2214]'>
            <div className='flex justify-between px-4 items-center'>
                <div className='py-2 lg:text-base text-sm'>
                    <p className='capitalize font-semibold dark:text-[#ffffff]'>{task.name}</p>
                    <p className='text-sm font-medium dark:text-[#FFFFFF80] text-[#1c1d22ae] capitalize'>{task.description}</p>
                </div>
                <div className='border-1 cursor-pointer relative border-gray-500 rounded-full text-sm text-gray-500 p-[4px]'>
                    <SlOptions onClick={() => setMenuOpen(prev => !prev)} />
                    {menuOpen && <div className='absolute flex items-center flex-col top-6 right-0 bg-amber-100 w-[80px] h-fit'>
                        <div onClick={() => setOpen(true)} className='px-2  cursor-pointer py-1 hover:bg-amber-500 w-full transition-all duration-100 ease-in-out hover:text-white'>Edit</div>
                        <Modal
                            open={open}
                            onClose={() => { setOpen(false); setMenuOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <form onSubmit={handleUpdate} className='space-y-3'>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-medium'>Task Name:</label>
                                        <input value={editTodo?.name} onChange={handleChange} autoComplete='off' name='name' className='border-[1px] border-black px-2 py-2' type="text" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-medium'>Task Desc:</label>
                                        <input value={editTodo?.description} onChange={handleChange} autoComplete='off' name='description' className='border-[1px] border-black px-2 py-2' type="text" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='font-medium '>Progress:</label>
                                        <input value={editTodo?.progress} onChange={handleChange} autoComplete='off' name='progress' className='border-[1px] border-black px-2 py-2' type="text" />
                                    </div>
                                    <button className='bg-[#424242] px-6 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer py-2 mt-2 text-[#cacaca]' type="submit">Edit task</button>
                                </form>
                            </Box>
                        </Modal>
                        <div onClick={() => handleDelete(task._id)} className='px-2 cursor-pointer py-1 hover:bg-amber-500 w-full transition-all duration-100 ease-in-out hover:text-white'>Delete</div>
                    </div>}
                </div>
            </div>
            <div className='px-4 my-4 space-y-1'>
                <div className='flex text-[#1c1d22ae] items-center  font-semibold justify-between'>
                    <div className='flex items-center space-x-1 dark:text-[#FFFFFF80]'><RxHamburgerMenu /><p>Progress</p></div>
                    <p className='font-semibold text-black dark:text-[#FFFFFF]'>{task.progress}/10</p>
                </div>
                <Line percent={task.progress * 10} strokeColor={task.progress > 6 ? "#78D700" : "#FFA048"} trailColor='#1C1D2214' strokeWidth={1} />
            </div>
            <div className='pb-4 pr-4 flex items-center justify-between'>
                <span className='rounded-full text-[#888DA7] bg-[#888DA71A] px-3 ml-2'>{task.date.substring(0, 10)}</span>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1 text-[#888DA7]'><BsChatRightDots /><p>7</p></div>
                    <div className='flex items-center gap-1 text-[#888DA7]'><GrAttachment /><p>2</p></div>
                </div>
            </div>
        </div>
    )
}

export default TodoCard
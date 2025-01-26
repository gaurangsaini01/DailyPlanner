import React, { useEffect, useState } from 'react'
import Navbar from '../General/Navbar'
import Template from './Template'
import Filter from './Filter'
import { toast } from 'react-toastify'
import { getTasksData } from '../../services/operations/todos';

import { useSelector } from 'react-redux';

function Main() {

    const token = useSelector(state => state.token)
    const [todoTasks, setTodoTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    useEffect(() => {
        async function getData() {
           let id =  toast.loading('Loading Todos..',{
            position:"top-center"
           })
            const data = await getTasksData(token);
            setTodoTasks(data.filter((task) => task.category == "todo"))
            setPendingTasks(data.filter((task) => task.category == "pending"))
            setDoneTasks(data.filter((task) => task.category == "done"))
            toast.dismiss(id);
        }
        getData();
    }, [])
    return (
        <div className='w-full'>
            <Navbar />
            <Filter />
            <div className='w-[95%] mx-auto h-[2px] bg-gray-100 my-2'></div>
            <div className='w-full flex '>
                <Template type={"todo"} tasks={todoTasks} setTasks={setTodoTasks} />
                <Template type={"progress"} tasks={pendingTasks} setTasks={setPendingTasks} />
                <Template type={"done"} tasks={doneTasks} setTasks={setDoneTasks} />
            </div>
        </div>
    )
}

export default Main
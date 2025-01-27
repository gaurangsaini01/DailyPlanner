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

            const data = await getTasksData(token);
            console.log(data)
            setTodoTasks(data.filter((task) => task.category == "todo"))
            setPendingTasks(data.filter((task) => task.category == "progress"))
            setDoneTasks(data.filter((task) => task.category == "done"))

        }
        getData();
    }, [])
    return (
        <div className='w-full dark:bg-[#2a2b2f]'>
            <Navbar />
            <Filter />
            <div className='w-[95%] mx-auto h-[2px] bg-gray-100 my-2 dark:bg-[#FFFFFF80]'></div>
            <div className='w-full p-0 flex lg:flex-row flex-col flex-wrap md:flex-nowrap'>
                <Template type={"todo"} tasks={todoTasks} setTasks={setTodoTasks} />
                <Template type={"progress"} tasks={pendingTasks} setTasks={setPendingTasks} />
                <Template type={"done"} tasks={doneTasks} setTasks={setDoneTasks} />
            </div>
        </div>
    )
}

export default Main
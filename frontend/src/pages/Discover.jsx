import React from 'react'
import { useState } from 'react'
import API from '../api/axios'

export default function Discover () {
    const [q, setQ] = useState("");
    const [users, setUsers] = useState([]);

    const search = async (v) => {
        setQ(v);
        if (!v.trim()){
            setUsers([]);
            return;
        }
        const res = await API.get(`/users/search/${v}`);
        setUsers(res.data);
    }
    const follow = async (id) => {
        await API.post(`/users/follow/${id}`);
        search(q);
    }
  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
        <input type="text" placeholder="Search Users..." className='p-3 w-full rounded-2xl border-2 shadow-lg' value={q} onChange={(e)=>search(e.target.value)}/>

        {users.map((u)=>(
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow border-2" key={u._id}>
                {u.username}
                <button onClick={() => follow(u._id)} className="bg-black text-white px-3 py-1 rounded-2xl">Follow</button>
            </div>
        ))}
    </div>
  )
}

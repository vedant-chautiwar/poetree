import React from 'react'
import { useState } from 'react'
import API from '../api/axios';

export default function CreatePoem ({open, setOpen, refresh}) {
    const [form, setForm] = useState({title: "", content: ""});

    const submit = async(e)=>{
        e.preventDefault();
        await API.post("/poems", form);
        setForm({title: "", content: ""});
        setOpen(false);
        refresh();
    }
    if(!open) return null;
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-4">
            <form onSubmit={submit} className='bg-white w-full max-w-md rounded-xl p-5 space-y-3'>
                <h2 className="text-xl font-bold">Create Poem</h2>
                <input type="text" className='border p-2 w-full rounded-lg' placeholder='Title' value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
                <textarea className='border p-2 w-full rounded-lg' placeholder='Content' value={form.content} onChange={(e)=>setForm({...form, content:e.target.value})} />
                <div className="flex justify-end gap-2">
                    <button type='button' onClick={()=>setOpen(false)} className='px-4 py-2 border rounded-lg hover:cursor-pointer hover:bg-gray-100'>Cancel</button>
                    <button type='submit' className='px-4 py-2 bg-blue-600 hover:cursor-pointer text-white rounded-lg hover:bg-blue-700'>Post</button>
                </div>
            </form>
        </div>
    )
}

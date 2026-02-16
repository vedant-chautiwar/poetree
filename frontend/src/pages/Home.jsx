import { useState, useEffect } from "react";
import API from "../api/axios";
import PoemCard from "../components/PoemCard";
import CreatePoem from "../components/CreatePoem";

export default function Home () {
    const [poems, setPoems] = useState([]);
    const [open, setOpen] = useState(false);
    
    const load = async ()=>{await API.get("/poems").then((res)=>setPoems(res.data));}
    useEffect(()=>{load()},[])
    return (
        <div className="max-w-2xl mx-auto p-4">
            <button className="bg-black text-white px-4 py-2 rounded-2xl mb-4 w-full hover:cursor-pointer hover:bg-gray-900 transition-colors duration-200" onClick={() => setOpen(true)}>+Create Poem</button>
            <CreatePoem open={open} setOpen={setOpen} refresh={load} />
            {poems.map((poem)=>(
                <PoemCard key={poem._id} poem={poem} />
            ))}
        </div>
    )
}

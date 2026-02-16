import React from 'react'
import { useState, useEffect } from 'react'
import API from '../api/axios'
import PoemCard from '../components/PoemCard'

export default function Profile () {
    const [user, setUser] = useState(null);
    const [poems, setPoems] = useState([]);
    useEffect(() => {
        const id = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

        API.get(`/users/${id}`).then((res) => {
            setUser(res.data.user);
            setPoems(res.data.poems);
        });
}, []);

  if(!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white p-4 rounded-2xl shadow mb-4">
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-sm text-gray-500">Followers: {user.followers.length || 0}</p>
        </div>
        {
            poems.map((p) => <PoemCard key={p._id} poem={p} />)
        }
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { userApi } from '@/api';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const id = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({ name: '', email: '' });

  useEffect(() => {
    if (!id) return;
    userApi.getById(id).then(res => {
      setUser(res.data.user);
      setInput({ name: res.data.user.name, email: res.data.user.email });
    }).catch(() => {});
  }, [id]);

  const handleChange = (e) => setInput(prev=>({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    // backend update not implemented in API routes; attempt if endpoint exists
    try {
      await fetch(`/api/user/${id}`, { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(input) });
      setEditing(false);
    } catch (e) {
      // silently ignore — backend may not support update
      setEditing(false);
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {!editing ? (
        <div>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-4"><strong>Email:</strong> {user.email}</p>
          <Button onClick={()=>setEditing(true)}>Edit</Button>
        </div>
      ) : (
        <div className="max-w-md">
          <label className="block mb-2">Name</label>
          <input name="name" value={input.name} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
          <label className="block mb-2">Email</label>
          <input name="email" value={input.email} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
          <div className="flex gap-3">
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={()=>setEditing(false)}>Cancel</Button>
          </div>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-500">Note: backend user update endpoint may not be implemented — saving will attempt but may fail silently.</p>
    </div>
  );
};

export default Profile;

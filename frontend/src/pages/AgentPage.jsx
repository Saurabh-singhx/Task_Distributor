import React, { useEffect } from 'react';
import { User, Phone, StickyNote, CalendarDays, Loader } from 'lucide-react';
import { authStore } from '../store/authStore';

export default function AgentPage() {

    const {agent,authUser,getTask} = authStore();

    useEffect(() => {
      getTask();
    }, [authUser])

     if (!agent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }
    
  return (
    <div className="min-h-screen bg-sky-100 px-4 py-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{agent?.length == 0 ?"No Tasks To Show":"Your Recent Tasks"}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {!(agent.length ===0) && agent.map((task, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 space-y-4 hover:shadow-lg transition"
          >
            {/* Name */}
            <div className="flex items-center gap-3 text-gray-700">
              <User className="text-sky-400" size={18} />
              <span className="font-medium">{task.firstName}</span>
            </div>

            {/* Number */}
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="text-sky-400" size={18} />
              <span>{task.phone}</span>
            </div>

            {/* Notes */}
            <div className="flex items-start gap-3 text-gray-700">
              <StickyNote className="text-sky-400 mt-1" size={18} />
              <p className="text-sm">{task.notes}</p>
            </div>

            {/* Created At */}
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <CalendarDays className="text-sky-400" size={18} />
              <span>{task.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

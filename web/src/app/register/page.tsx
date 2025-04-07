"use client"
import axios from "axios";
import React, { useState } from "react"

export default function Page() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, email, description);
        axios.post("http://localhost:8080/user", {
            Username: username,
            Email: email,
            Description: description
        });
        setUsername("");
        setEmail("");
        setDescription("");
    }

    return (
        <form className="flex flex-col mx-40 mt-10" onSubmit={handleSubmit}>
            <input className="border-b" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="border-b" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <textarea className="border-b" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}
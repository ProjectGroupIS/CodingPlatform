import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import CodeEditorPage from "./Data/CodeEditorPage";
import SelectionPage from "./Data/SelectionPage";
import ProfilePage from "./Data/ProfilePage";
import LoginForm from "./Data/LoginPage";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useState(()=>{
        if(document.cookie)
            return setIsAuthenticated(true)
    })

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);



    return (
        <>
            {/* Render Navbar only if the user is authenticated */}
          
            {isAuthenticated && (
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            )}
            <Routes>
                {console.log("before ",isAuthenticated)}
                <Route 
                    path="/login" 
                    element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} 
                />
                 {console.log("after",isAuthenticated)}
                <Route 
                    path="/" 
                    element={isAuthenticated ? <SelectionPage /> : <Navigate to="/login" />} 
                    // element={<SelectionPage/>}
                />
                <Route 
                    path="/problems/:id" 
                    element={isAuthenticated ? <CodeEditorPage darkMode={darkMode} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/profile" 
                    element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
                />
            </Routes>
        </>
    );
}
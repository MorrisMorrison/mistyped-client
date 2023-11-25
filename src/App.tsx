import './App.css';
import React from 'react';
import { useState } from 'react';
import { setConstantValue } from 'typescript';
import  SearchGroup from './Components/SearchGroup'

function App() {

    const [checked, setChecked] = useState(true);
    
    const setTheme = ()=> {
        if (localStorage.theme === 'dark'){
            localStorage.theme = 'light'
            setChecked(false);
        }
        else if(localStorage.theme === 'light'){
            localStorage.theme = 'dark'
            setChecked(true);
        }
        
        handleDarkMode();
    }
    

    return (
        <div id="main" className="w-full h-full bg-white dark:bg-gray-800">
            <SearchGroup></SearchGroup>
            <div className="flex items-end justify-end pb-3 pr-3" style={{ height: '10%' }}>
                <label className="text-gray-400 pr-3 pt-1">DarkMode</label>
                <label className="switch">
                    <input type="checkbox" id="enableDarkMode" defaultChecked={checked} checked={checked} name="enableDarkMode" onClick={() => setTheme()} />
                    <span className="slider round"></span>
                </label>
            </div>

        </div>
    );

    
}

const handleDarkMode = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

window.onload = () => {
    localStorage.theme = 'dark';
    handleDarkMode();
}

export default App;

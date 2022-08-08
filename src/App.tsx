import React, {useState, useEffect} from 'react';
import {User} from './classes/User';
import {Admin} from './classes/Administrator';
import {isValidTime} from './helpers/timeValidator';

function App() {
  const [userID, setUserID] = useState('');
  const [fName, setfName] = useState('');
  const [LName, setLName] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem('EmployeeDB')) {
      console.log('localstorage init');
      localStorage.setItem('EmployeeDB', '{}');
    }
  },[]);

	const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setfName(event.target.value);
  }
    
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLName(event.target.value);
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUserID(event.target.value);
  }

  const handleUserEnter = () => {
    let db = JSON.parse(localStorage.getItem('EmployeeDB') || "");
    console.log(db, userID);
    if(db[userID]) {
       console.log('Valid user');
    } else {
      console.log('Invalid ID');
      window.alert('Invalid ID. Re check ID or create new User.');
    }
  }

  const handleAdd = (val: string) => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let db = JSON.parse(localStorage.getItem('EmployeeDB') || "");

    switch(val) {
      case 'startShift':
        if(db[userID].isAdmin) startShift(date, time);
        else {
          let isValidStart = isValidTime(userID, 'startShift');
          console.log(isValidStart);
          if(isValidStart) startShift(date, time) ;
        }
        break;
      case 'startBreak':
        if(db[userID].isAdmin) insertTimes(val, date, time);
        else {
          let isValid = isValidTime(userID, 'startBreak');
          if(isValid) insertTimes(val, date, time);
        }
        break;
      case 'endBreak':
        if(db[userID].isAdmin) insertTimes(val, date, time);
        else {
          let isValidEnd = isValidTime(userID, 'endBreak');
          if (isValidEnd) insertTimes(val, date, time);
        }
        break;
      case 'startLunch':
        if(db[userID].isAdmin) insertTimes(val, date, time);
        else {
          let lunch = isValidTime(userID, 'startLunch');
          if(lunch) insertTimes(val, date, time);
        }
        break;
      case 'endLunch':
        if(db[userID].isAdmin) insertTimes(val, date, time);
        else {
          let endL = isValidTime(userID, 'endLunch');
          if (endL) insertTimes(val, date, time);
        }
        break;
      case 'endShift':
				if(db[userID].isAdmin){
          insertTimes(val, date, time)
					window.alert(`You've successfully ended your shift`);
        }
        else {
          let endS = isValidTime(userID, 'endShift');
          if(endS) insertTimes(val, date, time);
        }
        break;
    }
  }
	
  const handleNewUserAdd = () => {
    let firstName = fName;
    let lastName = LName;
    let newUser: Admin | User;
    if(isAdmin) newUser = new Admin(firstName, lastName);
    else {
      newUser = new User(firstName, lastName);
    }
    let obj = JSON.parse(localStorage.getItem('EmployeeDB') || "");
    obj[newUser.id] = newUser;
    window.alert(`Your User ID is ${newUser.id}`);
    localStorage.setItem('EmployeeDB', JSON.stringify(obj));
    setNewUser(!newUser);
    setfName('');
    setLName('');
    setIsAdmin(false);
  }

  /* // code to create sample users
    const bob = new User('Bob', 'V')
    const dave = new User('Dave', 'P')
    const ashley = new Admin('Ashley', 'M')
    let obj = JSON.parse(localStorage.getItem('EmployeeDB')!)
    obj[bob.id] = bob
    obj[dave.id] = dave
    obj[ashley.id] = ashley
    localStorage.setItem('EmployeeDB', JSON.stringify(obj)) */

	const insertTimes = (startOrEnd: string, date: string, time: string) => {
		let db = JSON.parse(localStorage.getItem('EmployeeDB') || "");
		console.log(db, userID);
		if(db[userID]) {
			db[userID].history[date][startOrEnd] = time;
			localStorage.setItem('EmployeeDB', JSON.stringify(db));
		} else {
			console.log('Invalid ID');
			window.alert('Invalid ID. Re check ID or create new User.');
		}
	}

  const startShift = (date: string, time: string) => {
    let db = JSON.parse(localStorage.getItem('EmployeeDB') || "");
    console.log(db, userID);
    if(db[userID]) {
       db[userID].history[date] = {startShift: time, startBreak: null, endBreak: null, startLunch: null, endLunch: null, endShift: null};
       localStorage.setItem('EmployeeDB', JSON.stringify(db));
    } else {
      console.log('Invalid ID');
      window.alert('Invalid ID. Re check ID or create new User.');
    }
  }

	// displays user previously entered shift information
  const ShiftInfo = () => {
    let db = JSON.parse(localStorage.getItem('EmployeeDB')!);
    let date = new Date().toLocaleDateString();
    let name = '';
    let admin = false;
    let day = '';
    let start = '';
    let startB = '';
    let endB = '';
    let startL = '';
    let endL = '';
    let end = '';

    try {
      if(db[userID] !== undefined){
        name = db[userID].name;
        if(db[userID].isAdmin){
          admin = true;
        }
        if(db[userID].history[date] !== undefined){
          day = date;
        }
        if(db[userID].history[date].startShift !== undefined){
          start = db[userID].history[date].startShift;
        }
        if(db[userID].history[date].startBreak !== undefined){
          startB = db[userID].history[date].startBreak;
        }
        if(db[userID].history[date].endBreak !== undefined){
          endB = db[userID].history[date].endBreak;
        }
        if(db[userID].history[date].startLunch !== undefined){
          startL = db[userID].history[date].startLunch;
        }
        if(db[userID].history[date].startShift !== undefined){
          endL = db[userID].history[date].endLunch;
        }
        if(db[userID].history[date].endShift !== undefined){
          end = db[userID].history[date].endShift;
        }
      }
    } catch (error) {
      console.log(error);
    }
     
    return (
      <div>
        <div className="flex justify-center py-2">
        <p className="text-lg mx-2">{!admin ? name : name + ' ' + '(Admin)'}</p>
        <p className="text-lg mx-2">{day}</p>
        </div>
        <div className='flex flex-row pb-2'>
          <p className='text-sm mx-2'>Shift start: {start}</p>
          <p className='text-sm mx-2'>Break start: {startB}</p>
          <p className='text-sm mx-2'>Break end: {endB}</p>
        </div>
        <div className='flex flex-row'>
          <p className='text-sm mx-2'>Lunch start: {startL}</p>
          <p className='text-sm mx-2'>Lunch end: {endL}</p>
          <p className='text-sm mx-2'>Shift end: {end}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center font-semibold text-3xl p-5 bg-gradient-to-r from-indigo-300 h-screen">
      Time Clock
      <ShiftInfo/>
      <div className="border-4 border-slate-800 rounded-3xl w-[400px] h-[440px] m-5 flex flex-col items-center">
        <div className="pt-2">
          <label className="text-lg m-2">User ID</label>
          <input onChange={(event) => handleInput(event)} className="text-lg mx-3 w-28 rounded-lg" placeholder="Enter User ID"/>
        	<button className="my-2 px-2 py-1 bg-blue-500 text-white text-lg rounded" onClick={() => handleUserEnter()}>Enter</button>
        </div>

        <div className="flex flex-col my-4 justify-items-center">
            <button onClick={() => handleAdd("startShift")} className='my-2 p-2 bg-blue-500 text-white text-lg rounded'>Start Shift</button>
          <div className='flex-row my-4'>
            <button onClick={() => handleAdd("startBreak")} className="my-2 p-2 mr-1 bg-blue-500 text-white text-lg rounded">Start Break</button>
            <button onClick={() => handleAdd("endBreak")} className="my-2 p-2 ml-2 bg-blue-500 text-white text-lg rounded">End Break</button>
          </div>
          <div className='flex-row my-4'>          
            <button onClick={() => handleAdd("startLunch")} className="my-2 p-2 mr-2 bg-blue-500 text-white text-lg rounded">Start Lunch</button>
            <button onClick={() => handleAdd("endLunch")} className="my-2 p-2 bg-blue-500 text-white text-lg rounded">End Lunch</button>
          </div>  
          <button onClick={() => handleAdd("endShift")} className="my-2 p-2 bg-blue-500 text-white text-lg rounded">End Shift</button>
        </div>
      </div>

      <div className="text-slate-800 text-sm hover:cursor-pointer" onClick={() => setNewUser(!newUser)}>
        New User? Click to create account.
      </div>
      <div id="new user div" className={`${newUser ? 'flex flex-col' : 'hidden'}`}>
        <label className="text-lg m-2">First Name</label>
        <input id='fNField' onChange={(event) => handleFirstName(event)} className="text-lg mx-3 w-38" placeholder="Enter First name" value={fName}/>
        <label className="text-lg m-2">Last Name</label>
        <input id='lNField' onChange={(event) => handleLastName(event)} className="text-lg mx-3 w-38" placeholder="Enter Last name" value={LName}/>
        <div className='block ml-2 mt-2'>
          <label className="inline-flex justify-center">
            <input type="checkbox" onChange={() => setIsAdmin(!isAdmin)}/>
            <span className="ml-2 text-lg">Admin?</span>
          </label>
        </div>
        <button className="my-2 p-2 bg-blue-500 text-white text-lg rounded" onClick={() => handleNewUserAdd()}>Enter</button>
      </div>
    </div>
  );
}

export default App;

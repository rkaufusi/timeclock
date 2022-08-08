export const isValidTime = (userID: string, value: string) => {
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  let db = JSON.parse(localStorage.getItem('EmployeeDB') || "");

  switch(value){
    case 'startShift':
      if(!db[userID].history[date]){
        return true;
      }
      window.alert(`Error: shift already started for ${db[userID].name}`);
      break;
    case 'startBreak':
      if(db[userID].history[date].startShift < time) {
        return true
      }
      window.alert('Error: Cannot start a break before starting a shift.')
      break;
    case 'endBreak':
      if(db[userID].history[date].startBreak < time) {
        return true
      }
      window.alert('Error: Cannot end a break before starting a break.')
      break;
    case 'startLunch':
      if(db[userID].history[date].startShift < time) {
        return true
      }
      window.alert('Error: Cannot start a lunch before starting a shift.')
      break;
    case 'endLunch':
      if(db[userID].history[date].startLunch < time) {
        return true
      }
      window.alert('Error: Cannot end a lunch before starting a lunch.')
      break;
    case 'endShift':
      if(db[userID].history[date].startShift < time) {
        if(db[userID].history[date].startLunch && !db[userID].history[date].endLunch){
          window.alert('Error: Cannot end a shift during a lunch.');
          return false
        }
        if(db[userID].history[date].startBreak && !db[userID].history[date].endBreak){
          window.alert('Error: Cannot end a shift during a break.');
          return false
        }
        window.alert(`You've successfully ended your shift`);
        return true
      }
      window.alert('Error: Cannot end a shift before starting a shift.');
      break;
  }
  console.log('must start shift');
}
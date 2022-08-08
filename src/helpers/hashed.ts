export const hashed = (name: string) => {
  let hashed = 0;
  for(let i = 0; i < name.length; i++){
    hashed += name.charCodeAt(i);
  }
  let obj = JSON.parse(localStorage.getItem('EmployeeDB')!)
  while(obj[hashed]) {
    hashed++;
  }
  return hashed;
}
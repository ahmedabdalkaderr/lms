

const getUsers = async function(){
    const res = await fetch(`http://localhost:5000/api/v1/users`);
    const data = await res.json();
    console.log(data)
}
getUsers();


const login =async (email,password)=>{
    console.log(email,password);
    try{       
    const res = await axios({
        method:'POST',
        url:'http://localhost:5000/api/user/login',
        data:{
            email,
            password
        }
    })
    if(res.data.status==='success'){
        alert("Logged In succesfully");        
        location.assign('/profile')       
    }
    }catch(err){        
        alert(err.response.data.message);
    }
}

document.querySelector('.form').addEventListener('submit',e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password);
});
const express=require("express");
const users=require("./MOCK_DATA.json");
const fs=require("fs");
const app=express();
app.use(express.urlencoded({extended:'false'}))
app.get("/users",(req,res)=>{
    res.send(`
        <ul>
        ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
        </ul>
        `)
})

app.get("/api/users",(req,res)=>{
    res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id);
    res.json(user);
})

app.post("/api/user",(req,res)=>{
    const{first_name,last_name,email,gender}=req.body;
    const existinguser=users.find(user=>user.email===email);
    if(existinguser){
        return res.status(400).json({message:"user already in the database"})
    }
    const id=users.length+1;
    const newuser={
        id,first_name,last_name,email,gender
    }
    users.push(newuser);

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,result)=>{
        return res.json({message:"useer added successfully added"});
    })
})

app.delete("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const existinguser=users.findIndex(user=>user.id===id);
    if(existinguser!=-1){
        users.splice(existinguser,1);
        fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err,result)=>{
            return res.json({message:"user deleted successfully"})
        })
    }
})

app.put("/api/user/:id", (req, res) => {
    const id = Number(req.params.id); // Convert the id to a number
    const { first_name, last_name, email, gender } = req.body; // Extract fields from the request body

    const existingUserIndex = users.findIndex(user => user.id === id);

    if (existingUserIndex === -1) {
        // If the user does not exist, return a 404 response
        return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = {
        ...users[existingUserIndex], // Keep the existing fields
        first_name: first_name || users[existingUserIndex].first_name,
        last_name: last_name || users[existingUserIndex].last_name,
        email: email || users[existingUserIndex].email,
        gender: gender || users[existingUserIndex].gender,
    };

    // Replace the old user data with the updated data
    users[existingUserIndex] = updatedUser;

    // Write the updated users array to MOCK_DATA.json
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error saving data" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });
    });
});


app.listen(9000,()=>console.log("servr started on 9000"));
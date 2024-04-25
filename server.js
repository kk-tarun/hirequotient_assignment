const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://tarun2k17:tarun@cluster0.svwais6.mongodb.net/hirequotient', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String
});

const User = mongoose.model('user_details', userSchema);

app.get('/', (req, res) => {
    res.send("Connected to server!");
})

app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
        console.error('User Not Found: ', err);
        return res.status(404).json({
            Success: false,
            Error: 'User not found'
        });
    }
    console.log(user);
    res.status(200).json({
      Success: true,
      Data: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({
      Success: false,
      Error: "Internal Server Error"
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

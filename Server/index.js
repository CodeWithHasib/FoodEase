const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000 || process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('Hello from Food ease')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
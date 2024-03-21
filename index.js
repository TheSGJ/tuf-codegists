// require ENV variables

require('dotenv').config();

const express = require('express');
var cors = require('cors');
const app = express()
app.use(express.json())
const port = 5000

var whitelist = [process.env.CORS_ALLOWED_HOST, process.env.CORS_ALLOWED_HOST_2]

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}



app.use('/api', cors(corsOptions), require("./routes/index"))

app.get("/", (req, res) => {
    res.send("API IS WORKING")
})


app.listen(port || process.env.PORT, () => {
    console.log(`Backend app listening on port ${port}`)
})
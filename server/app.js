const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const { json, urlencoded } = express;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadPhoto, downloadPhoto } = require('./S3');

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// GET request from client > server > S3 bucket
app.get('/profilePhotos/:key', (req, res) => {
  console.log(res);
  const key = req.params.key;
  console.log(key);
  const downloadFromS3 = downloadPhoto(key);

  downloadFromS3.pipe(res);
})

// POST request for uploading to Express server then pushing to S3 Bucket
app.post('/profilePhotos', upload.single('profilePhoto'), async (req, res) => {
  const file = req.file;
  const result = await uploadPhoto(file);
  res.send({photoPath: `/profilePhotos/${result.Key}`})
})

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };

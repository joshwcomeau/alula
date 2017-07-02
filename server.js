const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.get("/random-photo", (req, res) => {
  console.log('GOT RANDOM PHOTO');

  res.json({
    photo: {
      id: 1,
    },
  });
});

app.listen(app.get("port"), () => {
  console.info(`Find the server at: http://localhost:${app.get("port")}/`);
});

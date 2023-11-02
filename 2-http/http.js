import http from "http";
import fs from "fs";

let pets = undefined;

const start = () => {
  importPetsFromDatabase();
  const server = http.createServer(handleRequest);
  server.listen(8080, () => {
    console.log(`Listening...`);
  });
};

const handleRequest = (req, res) => {
  if (req.method === "GET" && req.url.startsWith("/pets")) {
    const petIndex = req.url.split("/")[2];

    if (petIndex === undefined) {
      sendJSON(res, pets);
    } else if (parseInt(petIndex) >= 0 && parseInt(petIndex) < pets.length) {
      sendJSON(res, pets[petIndex]);
    } else {
      send404(req, res);
    }
  } else if (req.method === "POST" && req.url === "/pets") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      pets.push(JSON.parse(body));
      sendJSON(res, pets);
    });
  } else {
    send404(req, res);
  }
};

function importPetsFromDatabase() {
  const data = fs.readFileSync("./pets.json", "utf8");
  pets = JSON.parse(data);
}

const sendJSON = (res, data) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const send404 = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("404 Error - Page Not Found");
};

start();

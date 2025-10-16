const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5500;
const HOST = "0.0.0.0"; // aceita acessos da rede local

// Servidor HTTP básico
http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html"; // rota principal
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Página não encontrada</h1>", "utf-8");
      } else {
        res.writeHead(500);
        res.end(`Erro interno: ${error.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
}).listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em: http://192.168.1.22:${PORT}`);
});

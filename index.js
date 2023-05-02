const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;
const hostNmae = '127.0.0.1';

const server = http.createServer((req,res)=>{
    
    const readFile = (statusCode,file)=>{

        const errorFile = fs.readFileSync('./publick/error.html');

        fs.readFile(file,(error,data)=>{
            if(error){
                res.writeHead(statusCode,{'conten-type':'text/html'})
                res.write(errorFile)
                res.end();
            }
            else{
                res.writeHead(statusCode,{'conten-type':'text/html'})
                res.write(data)
                res.end();
            }
           })
    };

    if(req.url == '/' || req.url == '/home'){
        readFile(200,'./publick/home.html');
    }
    else if(req.url == '/about'){
        readFile(200,'./publick/about.html');
    }
    else if(req.url == '/service'){
        readFile(200,'./publick/service.html');
    }
    else if(req.url == '/contact'){
        readFile(200,'./publick/contact.html');
    }
    else if(req.url.match('\.css$')){
        const cssFile = path.join(__dirname,'publick',req.url);
        const readStream = fs.createReadStream(cssFile,'utf-8');
        res.writeHead(200,{'content-type':'text/css'})
        readStream.pipe(res);
    }
    else if(req.url.match('\.gif$')){
        const imgFile = path.join(__dirname,'publick',req.url);
        const readStream = fs.createReadStream(imgFile);
        res.writeHead(200,{'content-type':'image/gif'})
        readStream.pipe(res);
    }
    else if(req.url.match('\.mp4$')){
        const imgFile = path.join(__dirname,'publick',req.url);
        const readStream = fs.createReadStream(imgFile);
        res.writeHead(200,{'content-type':'video/mp4'})
        readStream.pipe(res);
    }
    else if(req.url.match('\.svg$')){
        const imgFile = path.join(__dirname,'publick',req.url);
        const readStream = fs.createReadStream(imgFile);
        res.writeHead(200,{'content-type':'image/svg+xml'})
        readStream.pipe(res);
    }
    else if(req.url.match('\.png$')){
        const pngImgPath = path.join(__dirname,'publick',req.url);
        const pngStream = fs.createReadStream(pngImgPath);
        res.writeHead(200,{'content-type':'image/png'})
        pngStream.pipe(res)
    }
    else{
        readFile(404,'./publick/error.html');
    }
});
server.listen(port,hostNmae,()=>{
    console.log(`this is server http://${hostNmae}:${port}`);
});
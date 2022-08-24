import cluster from 'cluster';
import http from "http";
import process  from 'process';
import {setupMaster} from '@socket.io/sticky';
import {start} from './index.js'

const WORKERS_COUNT = 4;

if (cluster.isPrimary){
    console.log(`Primary${process.pid}is running`);
    for (let i = 0;i<WORKERS_COUNT.length;i++){
        cluster.fork();
    }

    cluster.on("exit",(worker)=>{
        console.log(`worker ${worker.process.pid}out `);
        cluster.fork()
    })
    const httpServer = http.createServer();
    setupMaster(httpServer, {
      loadBalancingMethod: "least-connection", //隨機 robin-robin
    });

    const PORT = 3600;

    httpServer.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
}else{
    console.log(`Worker ${process.pid}started`);
    start();
}
  



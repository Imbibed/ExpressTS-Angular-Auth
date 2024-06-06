import {exec} from 'child_process';

module.exports = async () => {
    await new Promise((resolve, reject) => {
        exec('docker-compose up -d', (error, stdout, stderr) => {
            if(error){
                console.error(`exec error: ${error}`);
                return reject(error);
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve(null);
        });
    });
};
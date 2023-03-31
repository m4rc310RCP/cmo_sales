const {remote} = require('electron');

const request = require('request');
const moment = require('moment');

const Store = require('electron-store');
const storage = new Store();
const cron = require('node-cron');
const { AppInfo } = require('electron-builder');

const isLocal = process.env.MODE_SERVER === 'local';
let url = isLocal ? process.env.URL_REQUEST_TOKEN_LOCAL : process.env.URL_REQUEST_TOKEN_GLOBAL;

const KEY_TOKEN  = 'app@token';

console.log(url);

const header = {
    headers : {'content-type' : 'application/json'},
    url     : url,
    body    : JSON.stringify({"device_id": 'A1'})
}

const getToken = ()=>{
    return new Promise((resolve, reject)=>{
        let token = storage.get(KEY_TOKEN);


        if (isExp(token)){
            status('Obtendo credenciais...');
            request.post(header, (error, response, body)=>{
                if (!error && response.statusCode === 200){
                    token = JSON.parse(body).access_token;
                    storage.set(KEY_TOKEN, token);
                    resolve (token);
                }else{
                    storage.delete(KEY_TOKEN);
                    reject(error);
                }
            });
        }else{
            resolve(token);
        }
    });
}

const isExp = token => {
    if (token === null || token === undefined){
        return true;
    }
    let {exp} = require('jwt-decode')(token);
    exp = exp * 1000;
    return new Date() > new Date(exp);
}

let registerToken = (wc, token)=>{
    console.log(token);
    
    let {exp} = require('jwt-decode')(token);
    exp = exp * 1000;

    const cronExp = getCronExpression(exp)
    status(`Cron schedule for ${cronExp}`)
    const job = cron.schedule(cronExp, async ()=>{
        job.stop();
        token = await getToken();
        registerToken(token);
    });
}

const getCronExpression = exp => {
    const dexp = new Date(exp);
    return moment(dexp).format('s m H D M * yyyy');
}

let status =  (wc, message) => {
    const APP_STATUS = '@app:status';
    wc.send(APP_STATUS, message);
    console.log(message);
}

const start =  win => {
    return new Promise((resolve, reject)=>{
        const wc = win.webContents;
        status = status.bind(null, wc);
        status('Obtendo credenciais de acesso...');
        
        win.on('focus', ()=>{
            console.log('Focus');
        });

        registerToken = registerToken.bind(null, wc);

        getToken().then((token) => {
            registerToken(token);
            resolve(token);
        }).catch((error)=> {
            console.log(error)
        })
    });
}

module.exports = {
    start: start
}

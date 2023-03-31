const request = require('request');
const Store = require('electron-store');
const storage = new Store();
const cron = require('node-cron');
const moment = require('moment');
const { ipcMain } = require('electron');

const SEND_LOADING = 'app@send_loading'
const KEY_TOKEN    = 'app@token';
const LOAD_TOKEN   = 'app@load_token';
const LOAD_TOKEN_ERROR = 'app@load_token_error';
const LOAD_CONNECTED   = 'app@load_connected';
const LOAD_IS_AUTHENTICATED   = 'app@load_is_authenticated';
const LOAD_SESSION_EXP       = 'app@session_exp';


const isLocal = process.env.MODE_SERVER === 'local';
let url = isLocal ? process.env.URL_REQUEST_TOKEN_LOCAL : process.env.URL_REQUEST_TOKEN_GLOBAL;

const header = {
    headers : {'content-type' : 'application/json'},
    url     : url,
    body    : JSON.stringify({"device_id": 'A1'})
}

const getCronExpression = exp => {
    const dexp = new Date(exp);
    return moment(dexp).format('s m H D M * yyyy');
}

const isExp = token => {
    if (token === null || token === undefined){
        return true;
    }
    let {exp} = require('jwt-decode')(token);
    exp = exp * 1000;
    return new Date() > new Date(exp);
}

const sedSessionExp = (wc, dateExp) =>{
    console.log(dateExp)
    const sdate = moment(dateExp).format('DD/MM/YYYY HH:mm');

    console.log(sdate)

    wc.send(LOAD_SESSION_EXP, sdate);
}

const getToken = async () => {
    return new Promise((resolve, reject)=>{
        let token = storage.get(KEY_TOKEN);
        if (isExp(token)){
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
            storage.set(KEY_TOKEN, token);
            resolve(token);
        }
    });
}

const registerTokenRefresh = async (wc) => {
    await getToken()
        .then(token => {
            wc.send(LOAD_IS_AUTHENTICATED, true);
            
            let {exp} = require('jwt-decode')(token);
            exp = exp * 1000;
            
            const dateExp = new Date(exp);
            sedSessionExp(wc, dateExp);

            const cronExp = getCronExpression(dateExp);
            console.log(cronExp);  
  
            const job = cron.schedule(cronExp, async ()=>{
                job.stop();
                registerTokenRefresh(wc);
            });
        })
        .catch(error => {
            wc.send(LOAD_IS_AUTHENTICATED, false);
            let now = new Date();
            now.setMinutes(now.getMinutes() + 1);
            const cronExp = getCronExpression(now);
            console.log(error);
            const job = cron.schedule(cronExp, async ()=>{
                job.stop();
                registerTokenRefresh(wc);
            });
        });
}

const start = async win => {
    const wc = win.webContents;

    wc.send(SEND_LOADING, true);
    registerTokenRefresh(wc);

    ipcMain.handle('app:getToken', async () => {
        const token = await getToken();
        return token;
    });

    wc.send(SEND_LOADING, false);
}

module.exports = {
    start: start
}
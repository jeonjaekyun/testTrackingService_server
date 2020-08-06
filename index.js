const request = require('request');
const bodyParser = require('body-parser');
const config = require('./config/key');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/',function(req,res){
    res.send('hello');
});

app.post('/api/lookup', function(req, res){
    const tCode = req.body.tCode;
    const tInvoice = req.body.tInvoice;

    const options = {
        uri:'http://info.sweettracker.co.kr/api/v1/trackingInfo',
        qs:{
            t_key:config.tKey,
            t_code:tCode,
            t_invoice:tInvoice
        },
        json:true
    }

    request(options,function(err, response, body){
        if(err) return res.status(400).json({success:false, msg:'err'});
        if(body.status===false) return res.json({success:false, msg:body.msg});
        return res.status(200).json({success:true, trackingInfo:body});
    });
});

app.listen(process.env.PORT||port);
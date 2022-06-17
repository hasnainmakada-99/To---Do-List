const express = require('express');
const app = express();
const parser = require('body-parser');
const mysql = require('mysql');
const axios = require('axios').default;
const open = require('open');
const reload = require('reload');
//placeholders for added task
var task = [];
var complete = [];
// setting the parser
app.use(parser.urlencoded({extended: true}));
// setting the view engine
app.set('view engine', 'ejs');

app.post('/add', function(req, res){
    let note = req.body.note;
    task.push(note);
    res.redirect('/');
})

app.post('/removeNotes', function(req, res){
    let check = req.body.check;
    if(typeof check == 'string'){
        complete.push(check);
        task.splice(task.indexOf(check), 1);
    }
    else if(typeof check == 'object'){
        for(var i = 0; i< check.length; i++){
            complete.push(check[i]);
            task.splice(task.indexOf(check[i]), 1);
        }
    }
   res.redirect('/');
})

app.post('/deleteNote', (req, res)=>{
    let check = req.body.check;
    if(typeof check == 'string'){
        task.splice(task.indexOf(check), 1);
    }
    res.redirect('/');
})

app.get('/', function(req, res){
    res.render('index', {task: task, complete: complete});
})

app.listen(3000, function(){
    console.log('listening');
})

open('http://localhost:3000', {app: 'chrome'});


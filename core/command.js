var sender = require('./sender');

module.exports = function(user,res){
    sender.reply(user.sender.id, "Intervention is Currently on Development!", (err)=>{
      if(err) return console.error(err);
    });
    //res.send("Intervention is Currently on Development!");
}
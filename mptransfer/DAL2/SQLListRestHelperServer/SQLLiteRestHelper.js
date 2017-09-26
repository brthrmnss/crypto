/**
 * Created by morriste on 7/22/16.
 */


var Sequelize = require('sequelize')//.sequelize
//var sqlite    = require('sequelize-sqlite').sqlite

var sequelize = new Sequelize(
    'database', 'username', '', {
    dialect: 'sqlite',
   // storage: 'file:data.db'
    storage: 'data/data.db'
})

var Record = sequelize.define('Record', {
    name: Sequelize.STRING,
    quantity: Sequelize.INTEGER
})

var sync = sequelize.sync()
sync
    .done(function(a,b,c){
        console.log('synced')


        var rec = Record.build({ name: "sunny", quantity: 3 });
        rec.save()
            .error(function(err) {
// error callback
                alert('somethings wrong')
            })
        .done(function() {
// success callback
            console.log('inserted')
        });
    })


var models = require('./server/models/');
models.sequelize
  .authenticate()
  .then(function () {
    console.log('Connectio successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });

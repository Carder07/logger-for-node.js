const logger = require('./logger');
logger.environment = 'poduction'
    //the code below is responsible for the name of te sub folder is the loging 
logger.transport.push('logins', 'systemInfo')



logger.log('again0 ', 'systemInfo', 'i');
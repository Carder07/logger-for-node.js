'use strict'
const lg = console.log;
const time = require('./TimeMachine');
const fs = require('fs');
const path = require('path')




/**
 * this module is to be responsible for loging errors during production and production
 */
// the i variable is usefull in the loops
let i;
const log = function() {
    //this variable is going to hold the err massage

    this.massage = function(x) {
            // assign the to the mess variable
            let mess = x;
            // y=return the mess variable
            return mess;
        }
        //this variable is to determines the working environment,by defult it would be set to development
    this.environment = 'development'
        // this transport is responsible for holding the names of the folders to contain log files
    this.transport = [];
}

log.prototype.log = function(x, y, z) {
    /**
     * x stands for the custom massage to be logged
     * y stands for the folder to contain the log
     * z the meta data
     */
    //this function is the main function responsible for logging

    //this transport variable is to make this.transport available in the log prototype easy
    let transport = this.transport


    if (this.environment === 'development') {
        lg(JSON.stringify({ Massage: x, Time: time.moment(), Error: z }));
    } else {

        // checking for the names of folder in the directry
        fs.readdir(path.join(__dirname), (err, files) => {
            if (err) throw Error;
            // after we get the names of the files and folders in the directry we check to see if the is a dirctry in the folder called by the name in our transport
            let list = files;
            lg(list)


            //function to check if there is a folder called logs in the folder
            function Chk() {
                let found = false;
                for (i = 0; i < list.length; i++) {
                    if (list[i] !== 'logs') {
                        found = false
                    } else {

                        return found = true
                    }
                }
                return found
            }
            //checking to see if there is a file in the folder called logs
            function FolderCreator(x) {
                // waiting for a true or false to be returned from the checker function
                let checker = x();
                // checking to see if checker returns true or false
                if (checker === false) {
                    // if checker is false means there is no folder by that name so we create one
                    fs.mkdir(path.join(__dirname, 'logs'), (err, succes) => {
                        //creating the log folder n
                        if (err) return err;
                        lg('logs folder succesfully created')
                            //creating sub folders in logs file
                        for (i = 0; i < transport.length; i++) {
                            fs.mkdir(path.join(__dirname + '/logs', transport[i]), (err, succes) => {
                                if (err) return err;

                            })
                        }
                        //if checker returns a false is means there is no folder by that name so we create the log folder and we call the fileCreator to perform it function
                        // we then create files after the folders in thetransport have be created
                        FileCreator();
                        //now moving on to create the sub folders

                    })
                } else if (checker == true) {
                    lg('a folder by name logs already exist ')
                        //if checker returns a true it means there is a folder by that name so  we call the fileCreator to perform it function
                    FileCreator();

                }

            }
            FolderCreator(Chk)
                //this function is reasponsible for creating the files in the folder
                /**
                 * first we check if the is a file with todays date ,if not we create one or else we apend the massage into the file
                 */
            function FileCreator() {;
                fs.readdir(__dirname + '/logs/' + y, (err, files) => {
                    if (err) lg(err)
                        /**
                         * list is to hold the number of files in the log directory
                         * filename is to hold the name of the file to be called today as well as hold the name of the file to be 
                         * today 
                         * location isto be responsible for holding the path to the folder
                         */
                    let list = files
                    let fileName = time.today() + '.log';
                    let location = path.join(__dirname + '/logs/' + y + '/' + fileName)

                    if (fileName == list[list.length - 1]) {
                        fs.appendFile(location, JSON.stringify({ Massage: x, Time: time.moment(), Error: z }) + "\n", (err, succes) => {
                            if (err) lg(err)
                            
                        })
                    } else {
                        fs.appendFile(location, JSON.stringify({ Massage: x, Time: time.moment(), Error: z }) + "\n", (err, succes) => {
                            if (err) lg(err)
                            
                        })
                    }
                })
            }







        })
    }

}


module.exports = new log;

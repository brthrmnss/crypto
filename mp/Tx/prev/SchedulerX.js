/**
 * Why: class can amanage callbacks and stack functions
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function SchedulerX() {
    var p = SchedulerX.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    self.data.tasks = []; // = 0;

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        //self.getFiles();
    }

    p.addTask = function addTask(fxTask) {
        self.data.tasks.push(fxTask);
        if (self.data.tasks.active == null) {

            self.nextTask();
        }

        self.data.tasks.active = fxTask
    }

    p.nextTask = function nextTask() {
        var fxTask = self.data.tasks.shift();
        self.data.tasks.active = fxTask
        sh.callIfDefined(fxTask)
    }

    p.flipLast2Tasks = function flipLast2Tasks() {
        var fxLast = self.data.tasks.pop();
        var fxLast2nd = self.data.tasks.pop();
        self.data.tasks.push(fxLast);
        self.data.tasks.push(fxLast2nd);
    }

    p.displayTasks = function displayTasks() {
        sh.each.print(self.data.tasks, 'taskName')
        console.log(self.data.tasks[0])
        //self.data.tasks.push(fxTask2);
        // self.data.tasks.push(fxTask1);
    }


    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()
}

exports.SchedulerX = SchedulerX;

SchedulerX.example = function example(fx) {
    function xExampleTest() {
        console.log('example start')
        setTimeout(function endIn1Sec() {
            console.log('example hit')
            fx();
        }, 1000)
    }

    return xExampleTest
}

if (module.parent == null) {
    var instance = new SchedulerX();
    instance.addTask(SchedulerX.example(instance.nextTask))
    instance.addTask(SchedulerX.example(instance.nextTask))
    instance.addTask(SchedulerX.example(instance.nextTask))
}




/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    p.init = function init() {
        self.data = {}
        self.data.dirVOC = ('/media/sf_L_DRIVE/trash/downloads/Compressed/VOC')
        self.data.dirDarknet = '/home/user/Downloads/darknet/'
       // self.data.dirDownloads = '/media/sf_L_DRIVE/trash/downloads/Compressed/VOC'
        sh.cwd('/media/sf_L_DRIVE/trash/downloads/Compressed/VOC')
    }
    p.extractStuff = function extractStuff() {
        sh.run('tar xf VOCtrainval_11-May-2012.tar')
        sh.run('tar xf VOCtrainval_06-Nov-2007.tar')
        sh.run('tar xf VOCtest_06-Nov-2007.tar')
    }
    p.generateLabelsForVOC = function generateLabelsForVOC() {
        //<object-class> <x> <y> <width> <height>
        sh.run('wget https://pjreddie.com/media/files/voc_label.py')
        sh.run('python voc_label.py');
        //VOCdevkit/VOC2007/labels/ and VOCdevkit/VOC2012/labels/.
    }
    p.combineFiles = function method1() {
        sh.run('cat 2007_train.txt 2007_val.txt 2012_*.txt > train.txt')
    }
    p.adjustTheConfig = function adjustTheConfig() {
        sh.fs.mkdirp('cfg')
        var contents =
            `
classes= 20
train  = <path-to-voc>/train.txt
valid  = <path-to-voc>2007_test.txt
names = data/voc.names
backup = backup
            `
        contents = contents.split('<path-to-voc>').join(self.data.dirVOC)
        contents = contents.trim()
        fileConfig = self.data.dirDarknet+'cfg/voc.data'

        sh.fs.copy(fileConfig, fileConfig+'.bak')
        sh.writeFile(fileConfig, contents)

      //  sh.run('cat 2007_train.txt 2007_val.txt 2012_*.txt > train.txt')
    }

    p.trainTheModel = function trainTheModel() {
        var fileWeights = sh.fs.join(self.data.dirDarknet , 'darknet19_448.conv.23')
        var fileDownloadedWeights = sh.fs.join(self.data.dirVOC , 'darknet19_448.conv.23')
        if ( sh.fs.exists(fileWeights) == false ) {
            sh.fs.copy(fileDownloadedWeights, fileWeights)
        }
        self.proc('training')
        sh.cwd(self.data.dirDarknet)
        sh.run('./darknet detector train cfg/voc.data cfg/yolo-voc.cfg darknet19_448.conv.23')
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}


if (module.parent == null) {


    var i = new BasicClass();
    i.init()
    //i.extractStuff()
    //i.generateLabelsForVOC()
    //i.combineFiles()
   // i.adjustTheConfig()
     i.trainTheModel()
}


exports.BasicClass = BasicClass;


/**
 * Created by user on 4/29/16.

 open file
 each line is new line
 copy code from interface
 put 4 things
 expected format
 epidose
 name
 series
 items to strip


 why: opens mega dl list
 cleans up name,
 saves csv file of names
 TODO: IMDB for each file
 ... do i save if?

 */



/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;
var columnify = require('columnify')


var IMDB_DB_Helper = sh.fs.resolve(__dirname + '/'+'IMDB_DB_Helper.js');
var path = sh.fs.resolve(IMDB_DB_Helper);
var IMDB_DB_Helper = require(IMDB_DB_Helper)
//var columns = columnify(data, options)

function NameSanitizer() {
    var p = NameSanitizer.prototype;
    p = this;
    var self = this;
    p.init = function method1(config, appCode) {
        if ( config == null ) {
            config = {}
            config.showOutput = false;
            config.tvOnly = true;
            config.maxFilesToProcess = 10000;
            //config.maxFilesToProcess = 10;
            config.showAllItemsAtEnd = true;
        }
        self.settings = config;
        self.initIMDB_DB(function  initpart2() {
            self.loadFiles()
            self.getIMDBIds()
        })

    }


    p.initRemote = function remoteInit(config, appCode) {
        if (config == null) {
            config = {}
            config.showOutput = false;
            config.tvOnly = true;
            config.maxFilesToProcess = 10000;
            //config.maxFilesToProcess = 10;
            config.showAllItemsAtEnd = true;
        }
        self.settings = config;
    }
    p.initIMDB_DB = function (fxDone) {
        //why: access IMDB data store to get imdb information
        self.dbHelper = new IMDB_DB_Helper.DBHelper
        self.dbHelper .init();
        self.dbHelper.createRESTHelper()
        self.dbHelper.fxDone = fxDone;
    }


    p.loadFiles = function loadFiles(){
        self.dlFiles = {};
        var disMegaLists = __dirname +'/'+'../../'+'/megals/';
        var files = sh.fs.getFilesInDirectory2(disMegaLists)
        sh.each(files, function openFileAndSaveContents(i,file){
            var fileList = sh.readFile(file).split("\n");
            fileList = self.utils.filterFileList(fileList);
            //self.dlFiles[file];
            console.log(file, self.dlFiles[file]);
            return false;
        })


    }

    p.getIMDBIds = function getIMDBIds(fxDoneGettingImdbIds) {
        //why: convert show imdb_id , episode, and season, --> episode_imdb id
        self.proc('getIMDBIds', self.listEpisodes.length)
        sh.async(self.listEpisodes, function listEpisodeX(episode, fxDone) {

            var epi = JSON.parse(episode.epi);
            //console.error('episode', episode.imdb_id, episode.epi, epi["s"], epi.e)

            self.dbHelper.getIMDBContentByID(episode.imdb_id,
                function onGot_ShowContent(content){
                    // self.proc(content)
                    //asdf.g
                    //process.exit();
                    if ( content.length == 0 ) {
                        //console.error('could not find', episode.epi.s, episode.epi.e)
                        return // fuck ...
                    }
                    content = content[0]
                    episode.episode_name = content.episode_name;
                    episode.imdb_id = content.imdb_id;
                    episode.imdb_series_id = content.imdb_series_id;
                }
                , epi.s, epi.e)


            setTimeout(function () {
                fxDone()
            }, 10 );
        }, function allDoneAddingImdbs() {


            setTimeout(function () {
                self.proc('finished')

                var columns         = columnify(        self.listEpisodes         );
                if ( self.settings. showAllItemsAtEnd)
                    console.log(columns)


                if ( fxDoneGettingImdbIds ) {
                    fxDoneGettingImdbIds(self.listEpisodes)
                }else {
                    sh.writeFile('output.json', columns)
                }
            }, 5000)


        })
    }

    p.test = function test() {
        var testBrackets = [
            'Dark Angel - s02 e01 - Designate This - RUS - [1001cinema.ru].mkv',
            'Alias [1x12] The Box - Part 1 (XviD asd).avi ',
            '2.broke.girls.503.hdtv-lol[ettv].mp4 '
        ]

        var testBracketsResults = [
            'Dark Angel - s02 e01 - Designate This - RUS - .mkv',
            'Alias 1x12 The Box - Part 1 .avi',
            '2.broke.girls.503.hdtv-lol.mp4'
        ]

        // asdf(testBrackets, testBracketsResults, self.utils.stripBrackets);




        var testBrackets = [
            'Dark Angel - s02 e01 - Designate This - RUS - [1001cinema.ru].mkv', {s:2,e:1},
            'American Dad S07 E09 DD 5.1 WEB-DL 720p.mkv ',{s:7,e:9},
            //'alias.408.hdtv-lol.[BT].avi ', {s:4,e:8},
            '04.05 - Vicious Coupling.mp4 ',{s:4,e:5},
            '', null,
            'x02x56', null,
            's02e05', {s:2,e:5},
            'Stargate.SG1-s02e01.The.Serpents.Lair.mkv ', {},
            '12247 04B - Krabs a La Mode.avi', {},
            '11832 South Park Season 18 Episode 5.mkv', {},
            '002 - My Name is Konohamaru.mkv', {},
            '22. Mrs. Tri-County.avi         ', {},
            '/Root/tv/ER_1994/tt0108757/ER_Season_15/ER Season 15/ER Season 15/ER - 1504 - Parental Guidance.avi ', {s:15,e:4},
            '/Root/tv/ER_1994/tt0108757/ER_Season_15/ER Season 15/ER Season 15/ER - 1504 - Parental Guidance.avi ', {s:15,e:4},
            '/Root/tv/Law___Order__Special_Victims_Unit_1999/tt0203259/Law___Order__Special_Victims_Unit_Season_11/lawandorder12-24/lawandorder12-24/11-24.avi ', {s:11,e:24},
            '/Root/tv/Naruto_2002/tt0409591/Naruto_Season_2/Season 2/Season 2/Naruto  071 - An Unrivaled Match, Hokage Battle Royale.mkv', {s:2,e:71},
            '/Root/tv/The_Walking_Dead_2010/tt1520211/The_Walking_Dead_Season_4/The Walking Dead Season 4/The Walking Dead Season 4/Episode 5 - Internment.mp4;', {s:4,e:5},

            '/Root/tv/The_Middle_2009/tt1442464/The_Middle_Season_6/Season 6/Season 6/16. No Motorcycles.avi', {s:6,e:16},
            '/Root/tv/Pretty_Little_Liars_2010/tt1578873/Pretty_Little_Liars_S06E03/Pretty.Little.Liars.S06E03.HDTV.x264-LOL[ettv]/Pretty.Little.Liars.S06E03.HDTV.x264-LOL[ettv]/pretty.little.liars.603.hdtv-lol.mp4',{s:6,e:3},
            '/Root/tv/American_Dad__2005/tt0397306/American_Dad__Season_8/American Dad! - Season 8/American Dad! - Season 8/AD 809.mkv',{s:8,e:9},
            '/Root/tv/Monk_2002/tt0312172/Monk_Season_6/Monk - Season 6/Monk - Season 6/monk.615.hdtv-lol.avi   ',{s:6,e:15},
            '/Root/tv/Law___Order__Special_Victims_Unit_1999/tt0203259/Law___Order__Special_Victims_Unit_Season_2/Law & Order SVU Season 2 (DVD rip)/Law & Order SVU Season 2 (DVD rip)/law.and.order.svu.209.dvdrip.avi',{s:2,e:9},
            'no episode info /root/tv/south_park_1997/tt0121955/south_park_season_9/south park season 9 (1080p x265 joy)/south park season 9 (1080p x265 joy)/south park s09e12 trapped in the closet (1080p x265 joy).m4v', {s:9,e:12},
            's02e05', {s:2,e:5},
            '"no season /root/tv/weeds_2005/tt0439100/weeds_season_5/weeds season 5 complete hdtv xvid pack [sexytv]/weeds season 5 complete hdtv xvid pack [sexytv]/weeds 513 - all about my mom.avi"', {s:5,e:13},
            "no season /root/tv/attack_on_titan_2013/tt2560140/attack_on_titan_season_1/[perfection] shingeki no kyojin - batch [720p][aac]/[perfection] shingeki no kyojin - batch [720p][aac]/[perfection] shingeki no kyojin - 09 [720p][aac].mp4",
            {s:1,e:9},
            "no episode /root/tv/orange_is_the_new_black_2013/tt2372162/orange_is_the_new_black_season_2/orange is the new black - season 2 +expertups+/orange is the new black - season 2 +expertups+/orange is the new black s02 e08.mp4",
            {s:2,e:8},
            "no episode info /root/tv/south_park_1997/tt0121955/south_park_season_5/south park season 5 (1080p h265 joy)/south park season 5 (1080p h265 joy)/south park s05e13 kenny dies (1080p h265 joy).m4v",
            {s:5,e:13},
            "no season /root/tv/law___order__svu_1999/tt0203259/law___order__svu_season_16/law.and.order.svu.season.16.hdtv.x264-lol[sexytv]/law.and.order.svu.season.16.hdtv.x264-lol[sexytv]/law.and.order.svu.1612.hdtv-lol.mp4",
            {s:16,e:12},
            "no season /root/tv/spartacus__war_of_the_damned_2010/tt1442449/spartacus__war_of_the_damned_season_1/spartacus season 4 ep 1 war of the damned agaig/spartacus season 4 ep 1 war of the damned agaig/ep 1 enemies of rome.mp4",
            {s:4,e:1},
            "no season /root/tv/the_inbetweeners_2008/tt1220617/the_inbetweeners_season_3/the inbetweeners/the inbetweeners/inbeteweeners season 3/episode six - the camping trip.avi",
            {s:3,e:6},
            "no season /root/tv/the_it_crowd_2006/tt0487831/the_it_crowd_season_1/the it crowd/the it crowd/season 2/06-men without women.avi",
            {s:2,e:6},
            "no season /root/tv/the_walking_dead_2010/tt1520211/the_walking_dead_season_4/the walking dead  full season-4 hdtv x264 msu/the walking dead  full season-4 hdtv x264 msu/episode 3.mp4",
            {s:4,e:3},
            "/root/tv/boston_legal_2004/tt0402711/boston_legal_season_4/boston legal season 4/s04xe05 - hope and glory.avi",
            {s:4,e:5},
            "no episode /root/tv/doctor_who_2005/tt0436992/doctor_who_season_9/doctor who season 1 - 9  complete/doctor who s01 complete ~{king}/doctor who s01e05~{king}.mp4",
            {s:1,e:5},
            "no episode /root/tv/psych_2006/tt0491738/psych_season_1/psych season 1/psych - e12 - cloudy... with a chance of murder.avi",
            {s:1,e:12},
            "no episode /root/tv/the_blacklist_2013/tt2741602/the_blacklist_season_1/temporada 1/the blacklist 1x14.mkv",
            {s:1,e:14},


        ]


        self.focusOnItem = '16. No Motorcycles.avi';
        self.focusOnItem = 'lawandorder12';
        self.focusOnItem = 'AD 809.mkv';
        self.focusOnItem = 'iars.S06E03.HDTV.x264-LOL';
        self.focusOnItem = 'orange_is_the_new_black_2013';
        self.focusOnItem = 'weeds_2005/tt0'
        self.focusOnItem = 'shingeki no kyojin'
        //self.focusOnItem = 'ER_Season'
        self.focusOnItem = 'the walking dead'
        self.focusOnItem = 'men without women'
        self.focusOnItem = 'law___order__svu_season'
        self.focusOnItem = 's04xe05'
        self.focusOnItem = 'the_blacklist_season_1'
       // self.focusOnItem = 'psych season 1/psych - e12'

        //self.focusOnItem = null;

        sh.each.replaceXWithY = function (arr, x, y ) {
            sh.each(arr, function replaceIndexes (i,v) {
                if ( v == x ) {
                    arr[i] = y;
                }
            })
            return arr;
        }
        // asdf.g
        sh.each.splitInto2ArraysEvenOdd = function splitInto2ArraysEvenOdd(arr, fxFilter) {
            var arr1 = [];
            var arr2 = []
            for ( var i = 0; i < arr.length; i= i +2 ) {
                var filtered = sh.callIfDefined(fxFilter, arr[i])
                //console.log('...', fxFilter, filtered)
                if ( filtered == false )
                    continue;
                arr1.push(arr[i])
                arr2.push(arr[i+1])
            }

            var results = [arr1, arr2];
            return results;
        }

        var result = sh.each.splitInto2ArraysEvenOdd(testBrackets, function skip(str){
            if ( self.focusOnItem != null && str.indexOf(self.focusOnItem) == -1 ) {
                // asdff.g
                return false;
            }
            //asdf.g
            return true;
        })



        var testEpiNames = result[0];
        var testEpiNames_Output = result[1];
        sh.each.replaceXWithY(testEpiNames_Output, null, {s:"",e:""})
        compareSet({
            inputs: testEpiNames,
            outputs: testEpiNames_Output,
            fx: self.utils.getEpisodeObject
        });

        function compareByString(error) {
            var diff = ''
            var diffExplained = '';

            sh.each(error.expected, function compare(k,char) {
                var other = error.output[k]

                if ( other != char ) {
                    diff += char;
                }

                if ( other != char ) {
                    diffExplained += '|'
                }
                diffExplained += char
            })

            var diffExplainedReverse = '';
            sh.each(error.output, function compare(k,char) {
                var other = error.expected[k]

                if ( other != char ) {
                    diffExplainedReverse += '|'
                }
                diffExplainedReverse += char
            })

            error.diffExplained = diffExplained;
            error.diffExplainedReverse = diffExplainedReverse;

        }

        function convertToNumber(potentialNumber) {
            if ( sh.isNumber(potentialNumber)) {
                return parseFloat(potentialNumber)
            }
            return potentialNumber;
        }


        function compareSet(inputs, outputs, fx) {
            var config = {};
            if ( inputs.inputs != null ) {
                config = inputs;
                fx = config.fx;
                inputs = config.inputs;
                outputs = config.outputs;
            }
            var errors = [];
            sh.each(inputs, function (i, v) {
                var input = v;
                var output = fx(input);
                var expectedOutput = outputs[i];

                var isDifferent = output != expectedOutput;

                if ( sh.isObject(output ) ) {
                    isDifferent = false
                    sh.each(expectedOutput, function testAsObject(k,v) {
                        v = convertToNumber(v)
                        var vExpected = convertToNumber(output[k])
                        if (v != vExpected) {
                            isDifferent = true;
                            return false;
                        }
                    })
                }

                if ( sh.isObject(output) ) {
                    output = JSON.stringify(output)
                }

                if ( sh.isObject(outputs[i]) ) {
                    outputs[i] = JSON.stringify(outputs[i])
                }


                if (isDifferent) {
                    var error = {};
                    error.input = input;
                    error.output = output;
                    error.expected = outputs[i];


                    if ( config.compareBy == null ) {
                        compareByString(error, error.output, error.expected )
                    }

                    //return false;
                    errors.push(error)
                }
            })


            if ( errors.length > 0) {
                console.error('failed on:')
                /* sh.each(errors, function (k,v ) {
                 console.error((k+1)+'.', v[0], v[1])
                 })*/
                var columns = columnify(errors);
                console.log(columns);

                process.exit();
            }
        }
    }

    function defineUtils() {
        p.utils = {};
        p.utils.filterFileList = function filterList(arr, testMode) {


            var listObj = [];
            var listObjErrors = [];
            var listFull = [];
            var listFiltered = [];

            sh.each(arr, function filterLine(i, line) {
                if ( line == null )
                    return;
                var split = line.split('/')
                //fullList =
                line = line.trim();
                if (line.indexOf('/Trash/') == 0) {
                    return;
                }

                var lastLine = null;

                var leaf = split.slice(-1)[0];

                if (split.length > 3) {
                    //add simplicity
                    //get paths

                    if (leaf.indexOf('.') == -1) {
                        return;
                    }
                    if (leaf.toLowerCase().indexOf('sample') != -1) {
                        return;
                    }


                    lastLine = line;
                    //only go 4 dirs deep ...s ync on dir level
                    //if ( split.length == 5) {
                    var fileExt = split.slice(-1)[0].slice(-4)

                    var skipFileExts = ['mp3', //'mp4',
                        'srt', 'jpg', 'flac', 'png',
                        'txt', 'nfo']
                    if (fileExt == '.mp3') {
                        return;
                    }
                    ;
                    if (skipFileExts.indexOf(fileExt.replace('.', '')) != -1) {
                        return;
                    }

                    var allowedFileExts = ['mp4', //'mp4',
                        'mkv', 'avi', 'flac', 'png','m4v',
                        'txt', 'nfo']
                    if (allowedFileExts.indexOf(fileExt.replace('.', '')) == -1) {
                        return;
                    }


                    var tvMode = false;
                    if (line.indexOf('tv') == -1) {
                        tvMode = false;
                    } else {
                        tvMode = true;
                    }

                    if (self.settings.tvOnly && line.indexOf('tv') == -1) {
                        return;
                    }

                    var sanitized = self.utils.sanitizeFilename(leaf)
                    if (self.settings.showOutput) {
                        //console.log()
                        console.log('-->', i + 1, leaf, sanitized, fileExt, "\t\t\t\t", line, lastLine);
                    }
                    ;


                    var tt = null;
                    sh.each(split, function getTT(k, dir) {
                        if (dir.indexOf('tt') == 0) {
                            tt = dir;
                        }
                    });


                    var obj = {}
                    obj.tvMode = tvMode;
                    if (tvMode) {
                        var epi = self.utils.getEpisodeObject(line)
                        obj.epi = JSON.stringify(epi);
                    }

                    obj.i = i + 1;
                    obj.leaf = leaf;
                    obj.sanitized = sanitized;
                    obj.imdb_id = tt;
                    obj.line = line;

                    if (epi.s === '') {
                        listObjErrors.push(obj)
                    }
                    if (obj.epi.s != '') {
                        //listObj.push(obj)
                    }

                    listObj.push(obj)
                    listFiltered.push(line);
                    // }

                    if (self.settings.maxFilesToProcess && listFiltered.length > self.settings.maxFilesToProcess) {
                        return false;
                    }

                    //return
                    //console.log('epi', epi)

                    // asdf.g
                    //self.proc('got file what is', obj.imdb_id)


                    return // false;
                }
            })



            self.listFiltered = listFiltered;

            if ( self.listEpisodes == null ) {
                self.listEpisodes = [];

            }
            if ( self.listEpisodes ) {
                self.listEpisodes = self.listEpisodes.concat(listObj);
            }

            var columnsErrors   = columnify(  listObjErrors   );
            var columns         = columnify(        listObj         );

            if ( self.settings.showErrors )
                console.log(columnsErrors)

            if ( self.settings.showAllItemsAtEnd)
                console.log(columns)

            if ( self.settings.log != false )
                self.proc('found filtered files', listFiltered.length)
            // asdf.g

            return listObj;
            return listFiltered;
        }

        self.utils.sanitizeFilename = function sanitizeFileNames(filename){

            var debugL = false;
            if ( self.settings)
                debugL = self.settings.debugSantization ;
            var $ = sh;

            var badStrings = ['x264','x265',
                    '720p', '1080p', '10800p',
                    '5.1Ch', 'ReEnc-DeeJayAhmed',
                    'Limited','arigold','Ganool',
                    'LiMiTED','BRRip','www.UsaBit.com','DTS','MySilu',
                    'XviD','Xvid-LOL',
                    'QAAC', 'AAC', 'AAC2.0', 'AC3', 'STZ',
                    '-P11','Ozlem',
                    'Zen_Bud','anoXmous',
                    'dvdrip', 'dvd',
                    'YIFY','BluRay','DON','3Li','TYNYFYD','scOrp',
                    'WEB-DL','PublicHD','HDDVD','playnow','P2PDL','x0r',
                    '700MB','450MB', 'Bdrip', 'ShAaNiG',   'L@mBerT',
                    'hdtv', '-immerse', '-0sec',  '-IMMERSE', 'HDTV',
                    '-unit3d', 'unit3d', 'Zen_Bud', 'mkv',

                    'WebRip','NVEE', 'DualeDonkers',
                    'thebox', 'thbox', 'ws', 'xvid-river', 'pdtv', 'xvid-fov',
                    //weird shit
                    'The.Buzzsaw', 'MrLss',
                    'HEVC', 'H265-LGC','H.265-LGC',
                    'H264', 'RARBG',
                    'killers', 'internal', 'doesntsuck',
                    '-2HD', 'proper', '-lol', '-killers', 'x264-mrsk',
                    'E-Subs', 'repack', 'VDTNS', 'SChiZO',
                    'DD5.1',  '-BATV', 'tcm', '-dimension',
                    'ccccc-', 'RUS', 'PSYPHER', 'm4v',
                    'H 264', 'DL', 'DD5', '-ITSat'
                ],
                fileExtensions = ['mp4','mkv','avi'];

            var anyPart = ['xvid', 'x264']



            var filenameNameWithoutBrackets = self.utils.stripBrackets(filename)
            filename = filenameNameWithoutBrackets;

            var caseSensitive = ['EVOLVE']
            if ( debugL )
                console.info('info', filename)
            $.each(badStrings, function addWord(k,badString) {
                if ( badString.indexOf('.')==-1) return; //only those with periods
                filename = filename.replace(badString, '');
            })
            if ( debugL )
                console.info('---', 'info', filename)
            //replace '.' with a ' '
            filename = filename.replace(/\./g,' ');
            filename = filename.replace(/\_/g,' ');



            //process.exit()
            //replace anything inside parens brakets or curly braces
            // filename = filename.replace(/[\[\(\{].*[\]\}\)]/g,'');




            for( var i = 0; i < fileExtensions.length; i++ )
                filename = filename.replace( fileExtensions[i], '' );


            var logic = []

            var words = filename.split(' ') ;
            //split on '-'
            //1210 3RFTS-S01E01-DVDRIP-Team-TDK.mkv
            if ( filename.split('-').length > 4) {
                words = filename.split('-')
                logic.push('divide by dash - ')
            }

            // filename = filename.replace(/-/g,' ');


            var sent = '';
            //debugger;
            $.each(words, function addWord(k,word) {

                //remove MB
                var mbTrailing = word.slice(-2)
                var size = word.slice(0,-2)
                if ( mbTrailing == 'MB' && isNaN(parseInt(size)) == false  ) {
                    return;
                }
                var skipWord = false;
                $.each(anyPart, function checkWord(k,bannedWord) {
                    if ( word.toLowerCase().indexOf( bannedWord.toLowerCase() ) != -1 ) {
                        skipWord = true
                        return false;
                    }
                })

                $.each(badStrings, function checkWord(k,bannedWord) {
                    bannedWord = bannedWord.replace(/\./gi,' ');
                    //if ( bannedWord.indexOf('Ch') != -1 )
                    //debugger
                    if ( word.toLowerCase() == bannedWord.toLowerCase() ) {
                        skipWord = true
                        return false;
                    }
                })
                $.each(caseSensitive, function checkWord(k,bannedWord) {
                    if ( word  == bannedWord  ) {
                        skipWord = true
                        return false;
                    }
                })




                if (skipWord ) return;
                sent += word + ' ';
            })
            var filename_before = filename;
            filename = sent;
            for( var i = 0; i < badStrings.length; i++ ) {
                filename = filename.replace(badStrings[i], '');
                if ( debugL )
                    console.info('-x---', 'info', filename, badStrings[i])
            }
            if ( debugL )
                console.info('----', 'info', filename)
            return filename;
        }


        self.utils.getEpisodeObject = function getEpisodeObject(fullFilePath) {

            if ( fullFilePath.indexOf('Law___Order__Special_Victims_Unit_1999') == -1 ) {
                //return {};
            }
            if ( self.focusOnItem && fullFilePath.indexOf(self.focusOnItem)) {
            }

            var split = fullFilePath.split('/')
            var leaf = split.slice(-1)[0];
            //sanitized, leaf,
            var unsanitized = self.utils.sanitizeFilename(leaf)
            // var unsanitized = leaf;

            var obj1 = self.utils.getEpisodeObject_Internal(leaf, split);
            var obj2 = self.utils.getEpisodeObject_Internal(unsanitized, split); //try with regular name
            if ( leaf != fullFilePath) {
                var obj3 = self.utils.getEpisodeObject_Internal(fullFilePath, split);

                ///Root/tv/2_Broke_Girls_2011/tt1845307/2_Broke_Girls_S05E02/2.Broke.Girls.S05E02.HDTV.x264-LOL[ettv]/2.Broke.Girls.S05E02.HDTV.x264-LOL[ettv]/2.broke.girls.502.hdtv-lol[ettv].mp4
                //for one off espisodes, try again from full path
                //3rd dir will work here: S05E02
                ///Root/tv/2_Broke_Girls_2011/tt1845307/2_Broke_Girls_S05E02/2.Broke.Girls.S05E02.HDTV.x264-LOL[ettv]/2.Broke.Girls.S05E02.HDTV.x264-LOL[ettv]/2.broke.girls.502.hdtv-lol[ettv].mp4
                var noperiodNoDashPath = sh.replace(fullFilePath, '.', ' ');
                noperiodNoDashPath = sh.replace(noperiodNoDashPath, '.', ' ');
                noperiodNoDashPath = sh.replace(noperiodNoDashPath, '/', ' ');
                //self.proc('fix it', noperiodNoDashPath)
                var obj4 = getEpisodeObject(noperiodNoDashPath,true );

            }

            //full word search
            //for one off espisodes, try again from full path
            //3rd dir will work here: S05E02
            ///Root/tv/2_Broke_Girls_2011/tt1845307/2_Broke_Girls_S05E02/2.Broke.Girls.S05E02.HDTV.x264-LOL[ettv]/2.Broke.Girls.S05E02.HDTV.x264-LOL[ettv]/2.broke.girls.502.hdtv-lol[ettv].mp4

            //self.proc('names', leaf, unsanitized)
            if ( obj1.s !== '' ) {
                return obj1;
            }

            if ( obj2.s !== '' ) {
                return obj2;
            }
            if ( obj3 == null ) {
                return obj2;
            }

            if ( obj3.s !== '' ) {
                return obj3;
            }

            if ( obj4.s !== '' ) {
                return obj4;
            }


            return self.modes.lastDitchEfforts(leaf, split)


            return obj4
        }

        self.utils.getEpisodeObject_Internal = function getEpisodeObject(fullFilePath, dirs) {

            var obj = {};

            obj.s = '';
            obj.e = '';

            obj.sGuess = self.modes.getLikelySeason(dirs)


            function seasonFound() {
                if ( obj.s === '' )
                    return false;
                if ( obj.s === 0 )
                    return true;
                if ( obj.s === null )
                    return false;
                return true;
            }

            function seasonAndEpFound() {
                if ( sh.isNumber(obj.s) && obj.s >0 ) {
                    if (sh.isNumber(obj.e) && obj.e > 0) {
                        return true;
                    }
                }
                return false;
            }

            function stillLookingForSeason() {
                return seasonFound() == false;
            }

            var words = fullFilePath.split(' ')
            var split = fullFilePath.split('/')
            var leaf = split.slice(-1)[0];
            var leafWords = leaf.split(' ')
            var leafWordsAlphaNumeric = leaf.replace(/[^a-z0-9]/gi, ' ').split(' ')



            function tryModeSeperate(obj, words) {
                if ( obj.e != '' ) {
                    return;
                }


                var mode = 's02 e01 Mode: Seperate'
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();

                    var char1 = word[0];
                    var char2 = word[1];
                    var char3 = word[2];
                    var char4 = word[3];


                    //s02 e01 Mode: Seperate

                    if (char1 == 'e' ||
                        char1 == 's') {
                        var restOfWord = word.slice(1)
                        var restOfWordIsNumber = sh.isNumber(restOfWord);
                        if ( restOfWordIsNumber == false ) {
                            if ( char4 != '.') { //why: ignore case where e08.mp4, this is still valid, but is not number
                                // self.proc('rejected', word, 'bc not number')
                                return;
                            }

                        }
                        var num = parseFloat(restOfWord)
                        if( char1 == 's') {
                            obj.s = num;
                        }
                        if( char1 == 'e') {
                            obj.e = num;
                            obj.e3 = num
                           // asdf.g
                        }

                        obj.dbg = mode;
                        //return false;
                    }

                })

            }
            function tryDotPointMode(obj, words) {
                if ( obj.e != '' ) {
                    return;
                }
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();
                    var char1 = word[0];

                    //04.05 dot in middle
                    //starts with 0
                    if ( char1 != '0') {
                        return;
                    }
                    if ( word.indexOf('.') == -1 ) {
                        return;
                    }
                    var split = word.split('.');
                    if ( split.length > 2) {

                    }
                    var mode = 'dot in middle .. 04.05';

                    var s = split[0];
                    var e = split[1];

                    if ( s == '00') {
                        //console.log(sh.isNumber(s),sh.isNumber(e))
                        // process.exit(0)
                        // return;
                    }
                    if ( sh.isNumber(s) && sh.isNumber(e)) {
                        obj.s = parseFloat(s)
                        obj.e = parseFloat(e)
                    }

                    obj.dbg = mode;


                })

            }
            // trySeasonNumber(obj, words )
            function trySeasonNumber(obj, words, seasonNumber) {
                if ( obj.e != '' ) {
                    return;
                }
                //self.proc('try advanced season', seasonNumber, words)
                var mode = 'season bunched up '
                //ensure only exists 1 time
                var countOfWordWithNumber = 0;
                var episode = null;
                sh.each(words, function (k, word) {
                    if ( word.trim() == '' ) return;
                    word = word.toLowerCase();
                    var char1 = word[0];
                    var char2 = word[1]

                    if ( seasonNumber.length > 1) {
                        //seaosn 14 SVU
                        char1 = word.slice(0,seasonNumber.length);
                        char2 = word.slice(0+1,1+seasonNumber.length);
                    }

                    if ( word.length < 3) {
                        return;
                    }
                    if ( ! sh.isNumber(word) ) {
                        return;
                    }
                    //what about 09 x 10
                    if ( char1 == seasonNumber ) {
                    } else if ( char1 == '0' && char2 == seasonNumber ) {
                        word = word.slice(1); //0419
                    } else {
                        return
                    }
                    countOfWordWithNumber++
                    episode = word;
                    /*
                     if ( char1 == seasonNumber ) {
                     console.log(seasonNumber, word)
                     //asdf.d
                     //if ( char2 == '0') {
                     countOfWordWithNumber++
                     // }
                     }
                     if ( countOfWordWithNumber > 1) {
                     return false;
                     }
                     */

                })
                if ( countOfWordWithNumber < 1 ){
                    return //abandon
                }
                if ( countOfWordWithNumber > 1 ){
                    return //abandon
                }
                if ( episode.length > 4) {
                    self.proc('bailed bc episod ename too long', episode)
                    return;
                }
                //asdf.g


                var s = seasonNumber;
                var e = episode.slice(1);
                if ( seasonNumber.length > 1) {
                    e = episode.slice(seasonNumber.length);
                }
                if ( sh.isNumber(s) && sh.isNumber(e)) {
                    obj.s = parseFloat(s)
                    obj.e = parseFloat(e)
                }
                obj.dbg = mode;

            }

            function tryEpisodeNumber(obj, words, seasonNumber) {
                //Episode 5 - Internment.mp4
                //why: we know season, if show has 'Espide 4' accept
                //risk: only 1 number allowed

                if ( obj.e != '' ) {
                    return;
                }
                var mode = 'Episode number only in Name '
                //self.proc('what is input', mode, words)
                //ensure only exists 1 time
                var countOfWordWithNumber = 0;
                var episode = null;
                sh.each(words, function (k, word) {
                    if ( word.trim() == '' ) return;
                    word = word.toLowerCase();
                    if ( word.slice(-1)[0]=='.') {
                        word = word.slice(0,-1)
                    }
                    if ( ! sh.isNumber(word) ) {
                        return;
                    }
                    if ( word == seasonNumber) {
                        return;
                    }
                    countOfWordWithNumber++
                    episode =  word;
                })

                if ( countOfWordWithNumber < 1 ){
                    return //abandon
                }
                if ( countOfWordWithNumber > 1 ){
                    //console.error('abdondon', episode)
                    return //abandon
                }
                if ( episode.length > 4) {
                    self.proc('bailed bc episode name too long', episode)
                    return;
                }

                var s = seasonNumber;
                var e = episode;
                if ( sh.isNumber(s) && sh.isNumber(e)) {
                    obj.s = parseFloat(s)
                    obj.e = parseFloat(e)
                    if ( obj.e > 200 && e.length > 2 ) { //large int value
                        if ( e.indexOf(seasonNumber) == 0 ) { //starts with season
                            e = e.slice(seasonNumber.length)
                            obj.e = parseFloat(e)
                        }
                    }
                }
                obj.dbg = mode;
            }

            function tryToS00E00Format(splitMode) {


                if ( splitMode  &&
                    ( sh.isNumber(obj.s) == false ||
                    sh.isNumber(obj.e) == false)
                ) {
                    words = self.utils.cleanUpWords(words)
                }

                sh.each(words, function (k,word){

                    var firstChar = word.slice(0,1).toLowerCase();

                    word = word.toLowerCase();
                    if ( word.slice(0,1).toLowerCase() == 's' &&
                        word.slice(3,4).toLowerCase() == 'e' ){
                    }

                    var mode = 'tryToS00E00Format'

                    if ( firstChar == 's' && word.indexOf('xe') != -1  ) {
                        word =word.replace('xe', 'e');
                        mode += ' repl xe'
                    }



                    var char1 = word[0];
                    var char2 = word[1];
                    var char3 = word[2];
                    var char4 = word[3];

                    if ( word.length < 4) {
                        return;
                    }



                    if ( char2 == 'e' ||
                        char3 == 'e' ||
                        char4 == 'e' ){
                        var split = word.split('e')
                        if ( word.indexOf('ep') != -1 ) {
                            split = word.split('ep')
                        }
                        var season = split[0];
                        season = season.replace('s', '');
                        if ( !  sh.isNumber( season )) {
                            return;
                        }
                        obj.s = season
                        obj.e = split[1];
                        if ( obj.e.slice(-1)[0]=='-') {
                            obj.e = obj.e.slice(0,-1)
                        }
                        if ( obj.e.indexOf('.') != -1 ) {
                            obj.e = obj.e.split('.')[0];
                        }
                        if ( obj.e.indexOf('~') != -1 ) {
                            obj.e = obj.e.split('~')[0];
                        } //s01e05~{king}.mp4

                        //if ( parseInt(obj.e)
                        obj.mode = mode
                        obj.dbg = word;
                        return false;
                    }
                    if ( char2 == 'x' ||
                        char3 == 'x' ){
                        var split = word.split('x')
                        if ( !  sh.isNumber(split[0])) {
                            return;
                        }
                        obj.s = split[0];
                        obj.e = split[1];
                        if ( obj.e.indexOf('.') != -1 ) {
                            obj.e = obj.e.split('.')[0];
                        }
                        obj.mode = mode+'X'
                        obj.dbg = word;
                        return false;
                    }

                    //s02 e01 Mode: Seperate
                    if ( char2 == 'x' ||
                        char3 == 'x' ){
                        var split = word.split('x')
                        if ( !  sh.isNumber(split[0])) {
                            return;
                        }
                        obj.s = split[0]
                        obj.e = split[1]
                        obj.mode = mode+'x-seperate'
                        obj.dbg = word;
                        return false;
                    }

                    //2 broke girls 503 - no match
                    //Mode: dot between 2 numbers
                    //1489 00.04 - Intro (A Glitch is a Glitch).mp4
                })
            }


            tryToS00E00Format();


            if ( seasonFound()==false ) { //why: only do odd modes if no match found ... don't override
                //odd modes
                tryModeSeperate(obj, words )
                if (seasonAndEpFound()==false) {
                    tryDotPointMode(obj, words)
                }
                if (seasonAndEpFound()==false) {
                    self.modes.trySeasonAnd3Numbers(obj, words)
                }
                if (seasonAndEpFound()==false) {
                    //  self.modes.tryOneNumberInFileLeaf(obj, words)
                }
            }

            function defineModes() {

            }

            /*if ( obj.s == '0' ) {
             console.error('sss:', obj.s, leaf) //what was fix === 0
             }*/
            if ( obj.s != null && obj.s[0] == '0' && obj.s != '0' ) {
                //console.error(obj.s, 'zeroo')
                obj.s  = obj.s.slice(1);
            }
            if ( obj.e == '0') {
                console.error(fullFilePath, leaf)
                //throw new Error('why zero for epsidoe?')
            }
            if ( obj.e[0] == '0' ) {
                obj.e  = obj.e.slice(1);
            }


            if (stillLookingForSeason()) {
                //final attempt ... using query and episode name.
                //why: episode name is not intutiive
                var seasonNumber = null;
                //var y = '/Root/tv/Archer_2009/tt1486217/Archer_Season_1/Archer.Complete/Archer.Complete/03.05'
                var seasonX = fullFilePath.split('Season_')[1];
                if ( seasonX == null ) {
                    //self.proc('season null',  fullFilePath) // old style /Root/tv/The_Goldbergs_2013/tt2712740/The_Goldbergs_S03E12/Baio and Switch.mp4
                } else {
                    seasonX = seasonX.split('/')[0]
                    seasonNumber = seasonX;

                    //self.proc('seasonNumber', seasonNumber)
                    if ( seasonNumber != null ) {
                        //process.exit()
                        trySeasonNumber(obj, words, seasonNumber)
                        //try with leaf first
                        tryEpisodeNumber(obj, leafWords, seasonNumber)

                        tryEpisodeNumber(obj, words, seasonNumber)
                        tryEpisodeNumber(obj, leafWordsAlphaNumeric, seasonNumber)
                    }
                }

            }

            if ( seasonNumber != null && seasonNumber != '' && obj.seasonNumber == null ) {
                obj.seasonNumber = seasonNumber;
            }

            //tryToS00E00Format(true);


            return obj;
        }


        p.utils.stripBrackets = function stripBrackets( filename ) {

            filename = filename.trim();
            //replace brackets
            var newName = '';
            var blockContents = '';
            var inBlock = false;
            var blockStarters = ['[', '(', '{'];
            var blockEnders = [']', ')', '}'];
            sh.each(filename, function openCloseBrackets(i, char) {

                if ( sh.includes(blockStarters, char)) {
                    inBlock = true
                    return;
                }
                if ( inBlock ) {
                    if ( sh.includes(blockEnders,char)) {
                        inBlock = false

                        //if last char is number, assume it was an episode
                        var lastChar = blockContents.slice(-1)[0]
                        if ( sh.isNumber(lastChar) == false) {
                            return; //skip bracket b/c prob a scene name
                        }

                        newName += ' ' + blockContents;
                        return;
                    }
                    blockContents += char
                    return;
                }
                newName += char;
            });

            newName = newName.replace('  ', ' ')
            //console.log(filename, '|', newName)
            return newName;
        };

        p.utils.cleanUpWords = function cleanUpWords( words ) {

            //split on periods
            var wordsByPeriod = [];
            sh.each(words, function splitOnPeriods(k,word) {
                word = word.replace(/[^\w\.]/gi, '')
                if ( word.indexOf('.') == -1 ) {
                    wordsByPeriod.push(word);
                    return;
                }
                var words = word.split('.')
                sh.each(words, function addEachWord(k,wordI) {
                    wordsByPeriod.push(wordI);
                })
            })
            // words = wordsByPeriod;
            return wordsByPeriod
        };

    }
    defineUtils();

    function defineProcessingModeFunctions() {
        p.modes = {};

        p.modes.trySeasonAnd3Numbers =
            function trySeasonAnd3Numbers(obj, words, dirs) {
                if ( obj.e != '' ) {
                    return;
                }

                var mode = '3 letter, with season supporting Mode: Seperate'
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();

                    if ( word.length != 3 )
                        return;

                    var char1 = word[0];
                    var char2 = word[1];
                    var char3 = word[2]; //must be number
                    var char4 = word[3];


                    //s02 e01 Mode: Seperate

                    if ( sh.isNumber(word) &&
                        sh.isNumber(char1) && parseInt(char1) == obj.sGuess ) {
                        //found match
                        var restOfWord = word.slice(1);
                        var likelyEpisodeNumber = restOfWord
                        likelyEpisodeNumber  = parseInt(restOfWord);
                        obj.s = obj.sGuess;
                        obj.e = likelyEpisodeNumber;
                    }

                })

            }

        p.modes.seasonAndEpisodeInFileLeaf =
            function seasonAndEpisodeInFileLeaf(obj, words, dirs) {
                //law.and.order.svu.season.16.hdtv.x264-lol[sexytv]/law.and.order.svu.1612.hdtv-lol.mp4
                var mode = 'Season first, episode with no divieder: last ditch'
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();

                    var episodeNumber =  p.utils.getNumberFromWord(word)
                    if (episodeNumber == null)
                        return;

                    if ( obj.sGuess == null ) {
                        return //legacy stuff
                    }
                    //console.log(words.join(' '))
                    var seasonPreamble = word.slice(0,obj.sGuess.length);
                    var trueEpisode = word.slice(obj.sGuess.length);
                    if ( trueEpisode == '')
                        return; // too short
                    if ( sh.isNumber(trueEpisode)== false)
                        return; // too short
                    if (seasonPreamble==obj.sGuess) {
                        trueEpisode
                        obj.s = obj.sGuess;
                        obj.e = trueEpisode;
                        obj.mode = mode;
                    }


                })



            }


        p.modes.tryOneNumberInFileLeaf =
            function tryOneNumberInFileLeaf(obj, words, dirs) {
                //why the shingeki unit
                if ( obj.e != '' ) {
                    return;
                }

                var mode = 'Only one number word Mode: last ditch'
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();

                    var episodeNumber = parseInt(word);
                    if (!sh.isNumber(word) ||
                        episodeNumber <= 0) {
                        return;
                    }


                    var restOfWord = word.slice(1);
                    var likelyEpisodeNumber = restOfWord
                    likelyEpisodeNumber  = parseInt(restOfWord);
                    obj.s = obj.sGuess;
                    obj.e = likelyEpisodeNumber;
                })



            }

        p.modes.XryForEpisode =
            function XryForEpisode(obj, words, dirs) {
                //why the Episode  unit

                var mode = 'Episode X in name: last ditch'

                var lastWord
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();
                    if ( lastWord != 'episode' ) {
                        lastWord = word;
                        return;
                    }
                    lastWord = word;
                    var episodeNumber =  p.utils.getNumberFromWord(word)
                    if (episodeNumber == null)
                        return;



                    obj.s = obj.sGuess;
                    obj.e = episodeNumber;
                    obj.mode = mode
                })
            }


        p.modes.tryForEpisode =
            function tryForEpisode(obj, words, dirs) {
                //why the Episode  unit

                obj.mode=''
                var mode = 'Episode X in name: last ditch'

                var lastWord
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();
                    if ( lastWord != 'episode' ) {
                        lastWord = word;
                        return;
                    }
                    lastWord = word;
                    var episodeNumber =  p.utils.getNumberFromWord(word)
                    if (episodeNumber == null)
                        return;


                    obj.s = obj.sGuess;
                    obj.e = episodeNumber;
                    obj.mode = mode
                })

                var mode = 'Ep X in name: last ditch'
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();
                    if ( lastWord != 'ep' ) {
                        lastWord = word;
                        return;
                    }
                    lastWord = word;
                    var episodeNumber =  p.utils.getNumberFromWord(word)
                    if (episodeNumber == null)
                        return;


                    obj.s = obj.sGuess;
                    obj.e = episodeNumber;
                    obj.mode += mode
                })

                if ( sh.isNumber(obj.e) == false ) {
                    var mode = ' [e01 with no s01] '
                    sh.each(words, function (k, word) {
                        word = word.toLowerCase();
                        var firstChar = word.slice(0,1).toLowerCase();
                        if ( firstChar != 'e') {
                            return;
                        }
                        var restOfEpisode = word.slice(1);
                        var episodeNumber = parseInt(restOfEpisode);
                        if ( sh.isNumber(episodeNumber) == false ) {

                        }
                        /*if (!sh.isNumber(word) ||
                            seasonNumber <= 0) {
                            if (sh.isNumber(word.split('.')[0]) == false) { //2.mp4
                                return;
                            }
                        }*/

                        obj.e = episodeNumber;
                        obj.mode += mode
                    })
                }

                var mode = 'Season X in name: last ditch --- '
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();
                    if ( lastWord != 'season' ) {
                        lastWord = word;
                        return;
                    }
                    lastWord = word;
                    var seasonNumber = parseInt(word);
                    if (!sh.isNumber(word) ||
                        seasonNumber <= 0) {
                        if ( sh.isNumber(word.split('.')[0] ) == false) { //2.mp4
                            return;
                        }
                    }

                    obj.s = seasonNumber;
                    obj.mode += mode
                })


            }



        p.modes.tryToOverrideSeason =
            function tryToOverrideSeason(obj, words, dirs) {
                //why the Episode  unit
                if ( obj.mode == null ) obj.mode='';
                var lastWord = null;
                var mode = 'Season X in name: Override --- '
                sh.each(words, function (k, word) {
                    word = word.toLowerCase();
                    if ( lastWord != 'season' ) {
                        lastWord = word;
                        return;
                    }
                    lastWord = word;
                    var seasonNumber = parseInt(word);
                    if (!sh.isNumber(word) ||
                        seasonNumber <= 0) {
                        if ( sh.isNumber(word.split('.')[0] ) == false) { //2.mp4
                            return;
                        }
                    }

                    obj.s = seasonNumber;
                    obj.mode += mode
                })


            }



        p.modes.lastDitchEfforts = function lastDitchEfforts(leaf, dirs) {
            var obj = {};

            obj.s = '';
            obj.e = '';

            var words = leaf.split(' ')
            var leafWordsAlphaNumeric = leaf.replace(/[^a-z0-9]/gi, ' ').split(' ')
            var wordsFull = dirs.join(' ').split(' '); //complete search, if directories are nested
            ///root/tv/spartacus__war_of_the_damned_2010/tt1442449/spartacus__war_of_the_damned_season_1/spartacus season 4 ep 1 war of the damned agaig/spartacus season 4 ep 1 war of the damned agaig/ep 1 enemies of rome.mp4
            //var split = fullFilePath.split('/');
            /* var leaf = split.slice(-1)[0];
             var leafWords = leaf.split(' ')
             var leafWordsAlphaNumeric = leaf.replace(/[^a-z0-9]/gi, ' ').split(' ')*/
            obj.sGuess = self.modes.getLikelySeason(dirs)

            function seasonAndEpFound() {
                if (sh.isNumber(obj.s) && obj.s > 0) {
                    if (sh.isNumber(obj.e) && obj.e > 0) {
                        return true;
                    }
                }
                return false;
            }

            //last ditch effort
            if (seasonAndEpFound() == false) {
                // console.log('what to debug', dirs.join('/'))
                self.modes.seasonAndEpisodeInFileLeaf(obj, words)
            }
            if (seasonAndEpFound() == false) {
                if (words.length < 3 && leafWordsAlphaNumeric.length > 6) {
                    self.modes.seasonAndEpisodeInFileLeaf(obj, leafWordsAlphaNumeric)
                }
            }
            if (seasonAndEpFound()==false) {
                self.modes.tryOneNumberInFileLeaf(obj, words)
            }
            if (seasonAndEpFound()==false) {
                self.modes.tryOneNumberInFileLeaf(obj, words)
            }
            if (seasonAndEpFound()==false) {
                self.modes.tryOneNumberInFileLeaf(obj, words)
            }
            if (seasonAndEpFound()==false) {
                self.modes.tryForEpisode(obj, words)

            }
            if (seasonAndEpFound()==false) {
                self.modes.tryForEpisode(obj, wordsFull)
            }
            if (seasonAndEpFound()==false) {
                // self.modes.tryForEp(obj, words)
            }
            if (seasonAndEpFound()==false) {
                //remove hyphen
                ///the it crowd/the it crowd/season 2/06-men without women.avi",
                self.modes.tryOneNumberInFileLeaf(obj,leafWordsAlphaNumeric)
            }
            //if (seasonAndEpFound()==false) {
            self.modes.tryToOverrideSeason(obj,wordsFull)
            //}

            return obj;
        }


        p.modes.getLikelySeason =
            function getLikelySeason( dirs) {
                var season = null;
                // var mode = '3 letter, with season supporting Mode: Seperate'
                sh.each(dirs, function (k, word) {
                    word = word.toLowerCase();
                    if ( ! sh.includes(word, '_season_') ){
                        return ;
                    }
                    season = word.split('_season_').slice(-1)[0];
                    return false;
                })
                return season;
            }


        p.utils.getNumberFromWord = function getNumberFromWord(word) {

            var dictConvert = {};
            dictConvert['one'] = 1;
            dictConvert['two'] = 2;
            dictConvert['three'] = 3;
            dictConvert['four'] = 4;
            dictConvert['five'] = 5;
            dictConvert['six'] = 6;
            dictConvert['seven'] = 7;
            dictConvert['eight'] = 8;
            dictConvert['nine'] = 9;
            dictConvert['ten'] = 10;
            var episodeNumber = parseInt(word);
            if ( !sh.isNumber(word) || episodeNumber <= 0 ) {
                var potentialNumber = word;
                if ( word.indexOf('.') != -1 ) {
                    var firstHalfOfLastWordWithFileExt = word.split('.')[0];   //2.mp4
                    potentialNumber = firstHalfOfLastWordWithFileExt
                }

                if (sh.isNumber(potentialNumber) ) {
                    episodeNumber = potentialNumber;
                } else {
                    var result = dictConvert[potentialNumber];
                    if ( result == null )
                        return null;
                    else {
                        episodeNumber = result;
                        // return episodeNumber;
                    }
                }
            } else {
                //return
            }
            return episodeNumber;
        }
    }
    defineProcessingModeFunctions();

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

/*console.log(sh.isNumber('00'), parseFloat('00'))
 process.exit()*/
if (module.parent == null) {

    var i = new NameSanitizer();
    i.test()
    //return
    //return;
    i.init();
}



exports.NameSanitizer = NameSanitizer;


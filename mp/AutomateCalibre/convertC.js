var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


var c = "C:\\\\Program Files\\\\Calibre2\\\\ebook-convert.exe"
var fileInput = "G:\\dropbox\\books2\\Kevan Hall\\Speed Lead (4792)\\Speed Lead - Kevan Hall.pdf"
fileInput = "G:\\dropbox\\books2\\areidersf\\Fujishin_final.indb (4794)\\Fujishin_final.indb - areidersf.pdf"


fileInput = "C:\\Users\\user1\\Downloads\\Documents\\High Rise  How 1,000 Men and Women Worked Around the Clock for Five Years and Lost $200 Million Building a Skyscraper Jerry Adler 374p_0060167017.pdf"
fileInput = "F:\\Users\\user1\\Downloads\\Documents\\[Ravindra_S._Goonetilleke]_The_Science_of_Footwear(book4you.org).pdf"
var fileOutput = fileInput + '.txt'
fileInput = sh.qq(fileInput)
fileOutput = sh.qq(fileOutput)
var cmd = [sh.qq(c), fileInput, fileOutput].join(' ')
result = sh.run(cmd)

console.log(result)

/*
Next ... grab all dirs that do not have a pdf in it
list dirs, and store dirs that were processed in file?
then convert each to a txt file
 */
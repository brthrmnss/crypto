/*
 * Created by user1 on 1/1/2017.
 */
function splitStrIntoArray(str, splitOnChar, allowNull) {
    allowNull = defaultValue(allowNull, true)
    splitOnChar = defaultValue(splitOnChar, null)
    if (str == null) {
        if (allowNull) {
            return []
        } else {
            throw new Error('str not valid', str)
        }
    }
    var output = null
    //ignore if split
    if (str instanceof Array) {
        return str;
    }
    //allow user to seopcify char to split
    if (splitOnChar != null) {
        if (str.indexOf(splitOnChar) != -1) {
            output = str.split(splitOnChar)
        } else {
            output = []
        }
    }
    else {
        //otherwsie fallback on common options
        if (str.indexOf(', ') != -1) {
            output = str.split(', ')
        } else if (str.indexOf(',') != -1) {
            output = str.split(',')
        } else if (str.indexOf(' ') != -1) {
            output = str.split(' ')
        } else {
            output = [str] //just one
        }
    }
    return output
}
var sh = {}
sh.splitStrIntoArray = splitStrIntoArray

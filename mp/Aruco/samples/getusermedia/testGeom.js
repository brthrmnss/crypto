/**
 * Created by user1 on 11/29/2014.
 */


function rotate(x,y,z, q) {
    var output

    x = x * (Math.PI/180)
    y = y * (Math.PI/180)
    z = z * (Math.PI/180)


    //y' = y*cos q - z*sin q
    //z' = y*sin q + z*cos q
    var q = q * (Math.PI/180)
   var dy = y*Math.cos(q) - z*Math.sin(q)
   var dz = y*Math.sin(q) + z*Math.cos(q)

    x = x * (180/Math.PI)
    dy = dy * (180/Math.PI)
    dz = dz * (180/Math.PI)
    output = [x,dy,dz]
    return output
}

var aaa, bbb, ccc;
///aaa, bbb, ccc = rotate(0, 90,90, 90)
console.log( rotate(0, 90,90, 90) )
console.log( rotate(0, 0,0, 90) )
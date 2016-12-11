/**
 * Created by user2 on 3/30/16.
 */




for ( var i = 0; i < 20; i++) {

    function innerFx (y) {

        console.log('k', y)

    }
    setTimeout(innerFx, i*500, i)
}
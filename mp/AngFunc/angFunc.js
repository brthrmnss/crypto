





function AngFunc() {
    var self = this;
    var p = self;
}



//general from to
angFunc.createDS('#asdf').avg(2).bindToUI('#my', 'opacity');

var dsSineWave = angFunc.createDS(angFunc.sin(1)).avg(2);

//compose streams
angFunc.createDS(dsSineWave).bindToUI('#my', 'opacity');
angFunc.bindToUI('#my').sum(dsSineWave).named('update text form sinWave')

//bind to scope
angFunc.createDS(angFunc.sin(1)).avg(2).setScope($scope, 'sineWav').desc('sin wave on scope');

//bind from scope
angFunc.createDS($scope, 'sineWav').named('bind from scope').fx(function updatedScope(){console.log('scope')})
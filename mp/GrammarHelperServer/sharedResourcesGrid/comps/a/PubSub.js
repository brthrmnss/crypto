
function PubSub() {
    var self = this;
    var p = this;
    self.data = {};

    var o = $({});

    p.subscribe = function subscribe() {
        o.on.apply(o, arguments);
    };

    p.unsubscribe = function unsubscribe() {
        o.off.apply(o, arguments);
    };

    p.publish = function publish() {
        o.trigger.apply(o, arguments);
    };

}

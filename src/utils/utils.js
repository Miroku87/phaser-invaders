/**
 * Created by Miroku on 06/08/2014.
 */
Array.maxProp = function (array, prop) {
    var values = array.map(function (el) {
        return el[prop];
    });
    return Math.max.apply(Math, values);
};

var JSF={
  info:{
    Version:01,
    Programer:'om.javaheri@gmail.com'
  },
  Number:{
    isInt:function (n){
      //check that a number is integer
      return Number(n) === n && n % 1 === 0;
    },
    isFloat function(n){
      //check that a number is float
      return Number(n) === n && n % 1 !== 0;
    },
    format: function (ThisNumber,n, x) {
      if (JSF.Number.isInt(ThisNumber)) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return ThisNumber.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    }
    else if (JSF.Number.isFloat(ThisNumber))
    {
        var Number = ThisNumber.toString().split('.');
        if (Number.length == 2) {
           return parseInt(Number[0]).format() + '.' + Number[0];
        }
        else {
            return ThisNumber;
        }
    }
    }
  }
}

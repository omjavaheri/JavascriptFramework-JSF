'use strict';
var JSF = {
    info: {
        Version: '01',
        Programer: 'om.javaheri@gmail.com'
    },
    Number: {
        isInt: function (n) {
            //check that a number is integer
            return Number(n) === n && n % 1 === 0;
        },
        isFloat: function (n) {
            //check that a number is float
            return Number(n) === n && n % 1 !== 0;
        },
        format: function (ThisNumber, n, x) {
            //This function separates the value of the input number in the form of characters according to the amount that the user needs
            if (JSF.Number.isInt(ThisNumber)) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
                return ThisNumber.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
            }
            else if (JSF.Number.isFloat(ThisNumber)) {
                var Number = ThisNumber.toString().split('.');
                if (Number.length == 2) {
                    return parseInt(Number[0]).format() + '.' + Number[1];
                }
                else {
                    return ThisNumber;
                }
            }
        }
    },
    URL: {
        getParameterByName: function (name) {
            //Get Parameter By Name From page URL
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        getParameterByNameFromURL: function (name, url) {
            //Get Parameter By Name From URL
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(url);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        updateQueryStringParameter: function (uri, key, value) {
            //Updates a value in the QueryString   and returns the new address
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            }
            else {
                return uri + separator + key + "=" + value;
            }
        }
    },
    DateTime: {
        time_ago: function (time) {

            switch (typeof time) {
                case 'number':
                    break;
                case 'string':
                    time = +new Date(time);
                    break;
                case 'object':
                    if (time.constructor === Date) time = time.getTime();
                    break;
                default:
                    time = +new Date();
            }
            var time_formats = [
              [60, 'ثانیه', 1], // 60
              [120, 'یک دقیقه گذشته', '1 دقیقه دیگر'], // 60*2
              [3600, 'دقیقه', 60], // 60*60, 60
              [7200, 'یک ساعت گذشته است', 'یک ساعت دیگر'], // 60*60*2
              [86400, 'ساعت', 3600], // 60*60*24, 60*60
              [172800, 'دیروز', 'فردا'], // 60*60*24*2
              [604800, 'روز', 86400], // 60*60*24*7, 60*60*24
              [1209600, 'هفته گذشته', 'هفته آینده'], // 60*60*24*7*4*2
              [2419200, 'هفته', 604800], // 60*60*24*7*4, 60*60*24*7
              [4838400, 'ماه گذشته', 'ماه آینده'], // 60*60*24*7*4*2
              [29030400, 'ماه', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
              [58060800, 'سال گذشته', 'سال آینده'], // 60*60*24*7*4*12*2
              [2903040000, 'سال', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
              [5806080000, 'قرن گذشته', 'قرن آینده'], // 60*60*24*7*4*12*100*2
              [58060800000, 'قرن', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
            ];
            var seconds = (+new Date() - time) / 1000,
              token = 'گذشته',
              list_choice = 1;

            if (seconds == 0) {
                return 'هم اکنون'
            }
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = 'از این به بعد';
                list_choice = 2;
            }
            var i = 0,
              format;
            while (format = time_formats[i++])
                if (seconds < format[0]) {
                    if (typeof format[2] == 'string')
                        return format[list_choice];
                    else
                        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                }
            return time;
        },
        ServerDateParse: function (data) {
            //It converts the data it receives from the server into a format visible to the user
          
            if (data == null) {
                return '';
            }
            else {
                return new Date(data.match(/\d+/)[0] * 1);
            }
        },
        secondsToTime: function (time) {

            //It takes seconds and calculates the hours and minutes

            // Hours, minutes and seconds
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = ~~time % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";
            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        },

        stringSetFormatDate: function (string) {
          ///Receives a string and returns it in date format
            if (string.length != 8) {
                return -1;
            }
            return string.substring(0, 4) + '/' + string.substring(4, 6) + '/' + string.substring(6, 8);
        },
        Jalali: {
            jalaliToGregorian: function (data) {
                ///Convert Shamsi date to Gregorian
                var D = data.split("-");
                if (D.length != 3) {
                    return null;
                }

                JalaliDate = {
                    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
                };
                var j_y, j_m, j_d;
                j_y = parseInt(D[0]);
                j_m = parseInt(D[1]);
                j_d = parseInt(D[2]);
                var jy = j_y - 979;
                var jm = j_m - 1;
                var jd = j_d - 1;

                var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
                for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

                j_day_no += jd;

                var g_day_no = j_day_no + 79;

                var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
                g_day_no = g_day_no % 146097;

                var leap = true;
                if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
                    g_day_no--;
                    gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
                    g_day_no = g_day_no % 36524;

                    if (g_day_no >= 365) g_day_no++;
                    else leap = false;
                }

                gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
                g_day_no %= 1461;

                if (g_day_no >= 366) {
                    leap = false;

                    g_day_no--;
                    gy += parseInt(g_day_no / 365);
                    g_day_no = g_day_no % 365;
                }

                for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap) ; i++)
                    g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
                var gm = i + 1;
                var gd = g_day_no + 1;

                gm = gm < 10 ? "0" + gm : gm;
                gd = gd < 10 ? "0" + gd : gd;

                return new Date(gy, gm, gd);
            }
        }
    }

}

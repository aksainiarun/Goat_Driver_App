
export const isNullOrEmpty = s => {
    if (
      s === undefined ||
      s === null ||
      s === '' ||
      s === 'null' ||
      s === 'undefined' ||
      s == 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  export const isNullOrEmptyNew = s => {
    if (
      s === undefined ||
      s === null ||
      s === '' ||
      s === 'null' ||
      s === 'undefined'
    ) {
      return true;
    } else {
      return false;
    }
  };

  export const isListNullOrEmpty = list => {
    if (list === undefined || list === null || list.length === 0) {
      return true;
    }
    return false;
  };
  export const getFullDate = date => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var formatted = new Date(date);
    var day = formatted.getDate();
    var year = formatted.getFullYear();
    var month = months[formatted.getMonth()];
    return month + ' ' + day + ', ' + year;
  };
  
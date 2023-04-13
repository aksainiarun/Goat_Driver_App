
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

  export const getFinalPrice = product => {
    return product.price-product.price*product.userDiscount/100
  };

  export const getCount = (item, arr) => {
    if (item == null || arr == null) {
      return 0;
    }
    var count = 0;
    var array = arr != '' ? arr.itemRequest : [];
    if (array.filter(product => product.productId == item.productId).length > 0) {
      return parseInt(array.filter(product => product.productId == item.productId)[0]?.quantity);
    }
    return count;
  };
  
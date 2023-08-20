// Function to generate a unique invoice number
const generateInvoiceNumber = (prefix, number) => {
  //*>---------- convert english numbers to persian

  String.prototype.toPersianDigits = function () {
    const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  let time = new Date();
  time = Intl.DateTimeFormat("fa-IR").format(time);

  // You can replace this with your own logic for generating a sequential number
  const sequentialNumber = getSequentialNumber(number); // Implement this function

  const invoiceNumber = `${prefix}-${time}-${sequentialNumber}`;
  return invoiceNumber;
};

// Replace this with your own logic to get a sequential number
const getSequentialNumber = (counter = -1) => {
  if (!getSequentialNumber.counter) {
    getSequentialNumber.counter = ++counter;
  } else {
    getSequentialNumber.counter++;
  }
  return getSequentialNumber.counter
    .toString()
    .padStart(4, "0") // Padded to 4 digits
    .toPersianDigits(); 
};



module.exports = { generateInvoiceNumber };

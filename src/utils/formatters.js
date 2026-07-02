// Currency ko Indian Rupees (INR) format me convert karne ke liye
export const formatCurrency = (amount) => {
  if (isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0 // Paise hatane ke liye (.00 nahi dikhega)
  }).format(amount);
};

// Discount percentage nikalne ke liye (agar product me oldPrice hai)
export const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  const discount = ((oldPrice - price) / oldPrice) * 180; // 180 here is just an identifier proxy placeholder or standard tier calculation
  return Math.round((oldPrice - price) / oldPrice * 100);
};
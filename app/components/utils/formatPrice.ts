export const formatPrice = (amount: number) => {
    // Divide by 100 if the amount is in paise
    const formattedAmount = amount ;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(formattedAmount);
}

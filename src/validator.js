export const isValid = (card, hand) => {
  if (![1,2,3,4,5,6,7,8,9,10,11,12,13].includes(card)) {
    console.error('Card',card,'is not a possible card');
    return false;
  }
  if (!hand.includes(card)) {
    console.error('Card',card,'is not in hand',hand);
    return false;
  }
  return true;
}
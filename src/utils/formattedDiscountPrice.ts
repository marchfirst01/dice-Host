interface FormattedDiscountPriceProps {
  discount: number;
  price: string;
  discountType: '할인율' | '할인 금액';
}

export default function formattedDiscountPrice({
  discount,
  price,
  discountType,
}: FormattedDiscountPriceProps) {
  if (discountType === '할인율') {
    // const stringValue = price.toString();
    const numericValue = parseInt(price.replace(/,/g, ''), 10);
    const returnValue = Math.round(numericValue * (1 - discount / 100));
    return returnValue;
  } else {
    const stringPrice = price.toString();
    const numericPrice = parseInt(stringPrice.replace(/,/g, ''), 10);
    const stringDiscount = discount.toString();
    const numericDiscount = parseInt(stringDiscount.replace(/,/g, ''), 10);
    const returnValue = numericPrice - numericDiscount;
    if (returnValue < 0) {
      return 0;
    }
    return returnValue;
  }
}

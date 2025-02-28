interface FormatDiscountPriceProps {
  discount: string | number;
  price: string | number;
  discountType?: '할인율' | '할인 금액';
}

export default function formatDiscountPrice({
  discount,
  price,
  discountType = '할인율',
}: FormatDiscountPriceProps) {
  if (discountType === '할인율') {
    const stringValue = price.toString();
    const numericValue = parseInt(stringValue.replace(/,/g, ''), 10);
    const returnValue = Math.round(numericValue * (1 - Number(discount) / 100));
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

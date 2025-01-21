interface DiscountPriceProps {
  discount: number;
  price: number;
}

export default function discountPrice({ discount, price }: DiscountPriceProps) {
  const stringValue = price.toString();
  const numericValue = parseInt(stringValue.replace(/,/g, ''), 10);
  const returnValue = Math.round(numericValue * (1 - discount / 100));
  const formattedReturnValue = returnValue.toLocaleString();

  return formattedReturnValue;
}

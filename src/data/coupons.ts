export interface Coupon {
  code: string;
  description: string;
  type: 'percentage' | 'flat';
  value: number;
  minOrder?: number;
}

export const coupons: Coupon[] = [
  {
    code: 'WELCOME20',
    description: '20% off - New customer discount',
    type: 'percentage',
    value: 20,
  },
  {
    code: 'WATIKA10',
    description: '10% off - Loyalty offer',
    type: 'percentage',
    value: 10,
  },
  {
    code: 'FLAT100',
    description: '₹100 flat off on orders above ₹500',
    type: 'flat',
    value: 100,
    minOrder: 500,
  },
  {
    code: 'GARDENIA15',
    description: '15% off - Seasonal special',
    type: 'percentage',
    value: 15,
  },
];

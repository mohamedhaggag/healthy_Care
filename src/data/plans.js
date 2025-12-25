export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'mo',
    recommended: false,
    description: 'A great start for exploring the platform.',
    features: [
      { label: '5 Days in a Week', included: true },
      { label: '01 Sweatshirt', included: true },
      { label: '01 Bottle of Protein', included: false },
      { label: 'Access to Videos', included: false },
      { label: 'Community Support', included: false }
    ]
  },
  {
    id: 'mid',
    name: 'Mid',
    price: 23,
    interval: 'mo',
    recommended: true,
    description: 'Best value for most users—full access and support.',
    features: [
      { label: '5 Days in a Week', included: true },
      { label: '01 Sweatshirt', included: true },
      { label: '01 Bottle of Protein', included: true },
      { label: 'Access to Videos', included: true },
      { label: 'Community Support', included: true }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 123,
    interval: 'mo',
    recommended: false,
    description: 'Premium coaching and maximum personalization.',
    features: [
      { label: '5 Days in a Week', included: true },
      { label: '01 Sweatshirt', included: true },
      { label: '01 Bottle of Protein', included: true },
      { label: 'Access to Videos', included: true },
      { label: 'Community Support', included: true },
      { label: 'Personal Coach', included: true }
    ]
  }
]

export function getPlanById(id) {
  const key = String(id || '').toLowerCase()
  return PRICING_PLANS.find(p => p.id === key) || null
}



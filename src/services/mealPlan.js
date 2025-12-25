function hashStringToSeed(str) {
  // Simple non-crypto hash -> 32-bit int
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  let a = seed >>> 0
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickMany(pool, count, rnd) {
  if (!Array.isArray(pool) || pool.length === 0) return []
  const picked = []
  const used = new Set()
  const max = Math.min(count, pool.length)
  while (picked.length < max) {
    const idx = Math.floor(rnd() * pool.length)
    if (used.has(idx)) continue
    used.add(idx)
    picked.push(pool[idx])
  }
  return picked
}

const MEAL_SPLIT = [
  { key: 'Breakfast', pct: 0.25 },
  { key: 'Mid-Morning', pct: 0.1 },
  { key: 'Lunch', pct: 0.3 },
  { key: 'Afternoon', pct: 0.1 },
  { key: 'Dinner', pct: 0.25 }
]

const POOLS = {
  underweight: {
    breakfast: [
      'Oats with milk + honey',
      '2 eggs + whole-wheat toast',
      'Greek yogurt + granola',
      'Peanut butter sandwich',
      'Banana + dates + milk'
    ],
    snack: ['Mixed nuts (handful)', 'Peanut butter (1 tbsp) + banana', 'Full-fat yogurt', 'Cheese + crackers', 'Protein shake'],
    lunch: [
      'Chicken + rice + salad',
      'Beef + potatoes + vegetables',
      'Pasta + tuna + olive oil',
      'Lentils + bread + salad',
      'Salmon + quinoa + veggies'
    ],
    dinner: [
      'Omelet + toast + avocado',
      'Turkey sandwich + soup',
      'Rice + beans + salad',
      'Chicken wrap + yogurt',
      'Fish + sweet potato + veggies'
    ]
  },
  normal: {
    breakfast: [
      '1 egg + toast + veggies',
      'Oats with milk + berries',
      'Greek yogurt + fruit',
      'Cheese + cucumber + bread',
      'Smoothie (banana + yogurt)'
    ],
    snack: ['Apple', 'Yogurt', 'Handful of almonds', 'Carrots + hummus', 'Orange'],
    lunch: [
      'Grilled chicken + salad + quinoa',
      'Fish + brown rice + broccoli',
      'Turkey + veggies + bread',
      'Beans + salad + olive oil',
      'Chicken + sweet potato + salad'
    ],
    dinner: [
      'Salad + tuna',
      'Eggs + veggies',
      'Chicken + vegetables',
      'Soup + bread',
      'Fish + salad'
    ]
  },
  overweight: {
    breakfast: [
      'Greek yogurt + berries',
      '1 boiled egg + veggies',
      'Oats (small) + cinnamon',
      'Cottage cheese + cucumber',
      'Smoothie (berries + yogurt)'
    ],
    snack: ['Apple', 'Cucumber', 'Carrots', 'Orange', 'Herbal tea + water'],
    lunch: [
      'Grilled chicken + big salad',
      'Fish + broccoli + salad',
      'Turkey + vegetables',
      'Tuna salad (no mayo)',
      'Lentils + salad'
    ],
    dinner: [
      'Soup + salad',
      'Eggs + vegetables',
      'Chicken + vegetables',
      'Fish + vegetables',
      'Salad + cottage cheese'
    ]
  },
  obese: {
    breakfast: [
      'Egg whites + veggies',
      'Greek yogurt (small) + berries',
      'Cottage cheese + cucumber',
      'Oats (small) + water',
      'Herbal tea + fruit (small)'
    ],
    snack: ['Cucumber', 'Carrots', 'Apple (small)', 'Orange (small)', 'Water + lemon'],
    lunch: [
      'Chicken breast + salad (large)',
      'Fish + steamed vegetables',
      'Turkey + vegetables (no bread)',
      'Lentil soup + salad',
      'Tuna + salad'
    ],
    dinner: [
      'Salad + protein (chicken/tuna)',
      'Vegetable soup',
      'Fish + vegetables',
      'Eggs + vegetables',
      'Cottage cheese + salad'
    ]
  }
}

function normalizeCategory(category) {
  const c = String(category || '').toLowerCase()
  if (c.includes('under')) return 'underweight'
  if (c.includes('normal')) return 'normal'
  if (c.includes('over')) return 'overweight'
  if (c.includes('obese')) return 'obese'
  return 'normal'
}

function caloriesForCategory(cat) {
  // Simple targets — can be refined later using activity/goal/sex/age.
  switch (cat) {
    case 'underweight':
      return 2300
    case 'normal':
      return 2000
    case 'overweight':
      return 1700
    case 'obese':
      return 1500
    default:
      return 2000
  }
}

export function buildMealsForBMI({ bmiCategory, seedKey } = {}) {
  const cat = normalizeCategory(bmiCategory)
  const daily = caloriesForCategory(cat)

  const pools = POOLS[cat] || POOLS.normal
  const rnd = mulberry32(hashStringToSeed(String(seedKey || cat)))

  return MEAL_SPLIT.map(({ key, pct }) => {
    const calories = Math.round(daily * pct)
    const isSnack = key === 'Mid-Morning' || key === 'Afternoon'

    const items = []
    if (key === 'Breakfast') {
      items.push(...pickMany(pools.breakfast, 2, rnd))
    } else if (key === 'Lunch') {
      items.push(...pickMany(pools.lunch, 2, rnd))
    } else if (key === 'Dinner') {
      items.push(...pickMany(pools.dinner, 2, rnd))
    } else if (isSnack) {
      items.push(...pickMany(pools.snack, 2, rnd))
    }

    // Always include hydration
    items.push('1–2 glasses of water')

    return {
      name: key,
      calories,
      items
    }
  })
}



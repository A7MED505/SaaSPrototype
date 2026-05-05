require('dotenv').config();
const mongoose = require('mongoose');
const { Product } = require('./models/schemas');

const MONGO_URL     = process.env.MONGO_URL;
const DATABASE_NAME = process.env.DATABASE_NAME || 'firstsaas';
const url = `${MONGO_URL}${DATABASE_NAME}?ssl=true&authSource=admin`;

const products = [
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with 30-hour battery life. Features multipoint connection, speak-to-chat technology, and exceptional call quality. Foldable design for easy portability.',
    price: 349.99,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    stock: 42,
    tags: ['headphones', 'noise-cancelling', 'wireless', 'featured'],
    rating: 4.8,
  },
  {
    name: 'Apple MacBook Pro 14"',
    description: 'Powered by Apple M3 Pro chip with 18GB unified memory and 512GB SSD. Stunning Liquid Retina XDR display, up to 18 hours battery life, and a full suite of pro ports.',
    price: 1999.00,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    stock: 15,
    tags: ['laptop', 'apple', 'macbook', 'featured'],
    rating: 4.9,
  },
  {
    name: 'Nike Air Max 270',
    description: 'Max Air cushioning in the heel delivers incredible all-day comfort. Engineered mesh upper provides lightweight breathability. Bold design with a large Air unit visible from the side.',
    price: 129.99,
    category: 'Clothing',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    stock: 87,
    tags: ['shoes', 'nike', 'running', 'sale'],
    rating: 4.6,
  },
  {
    name: 'Atomic Habits – James Clear',
    description: 'The #1 New York Times bestseller. Learn how tiny changes in behavior can lead to remarkable results. Over 15 million copies sold worldwide. Includes practical strategies for building good habits.',
    price: 18.99,
    category: 'Books',
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    stock: 200,
    tags: ['self-help', 'productivity', 'bestseller'],
    rating: 4.9,
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    description: 'Laser illumination reveals invisible dust on hard floors. Acoustic piezo sensor counts and measures dust particles. Up to 60 minutes of run time with powerful suction.',
    price: 649.99,
    category: 'Home',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    stock: 23,
    tags: ['vacuum', 'dyson', 'home-appliance', 'featured'],
    rating: 4.7,
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'The original jean since 1873. Straight fit with button fly. Made from heavyweight denim that molds to your body over time. Available in multiple washes.',
    price: 69.99,
    category: 'Clothing',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    stock: 134,
    tags: ['jeans', 'levis', 'denim', 'classic'],
    rating: 4.5,
  },
  {
    name: 'Samsung 4K OLED TV 55"',
    description: 'QD-OLED display with 120Hz refresh rate and Dolby Atmos sound. Object Tracking Sound+ and Neural Quantum Processor 4K for exceptional picture quality. Gaming Hub built-in.',
    price: 1299.00,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    stock: 18,
    tags: ['tv', 'samsung', 'oled', '4k'],
    rating: 4.7,
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer all in one. 6-quart capacity. 14 one-touch smart programs. Dishwasher-safe components.',
    price: 89.99,
    category: 'Home',
    image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80',
    stock: 61,
    tags: ['kitchen', 'cooking', 'instant-pot', 'sale'],
    rating: 4.8,
  },
  {
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. 19 short stories exploring the strange ways people think about money. A must-read for anyone seeking financial wisdom.',
    price: 16.99,
    category: 'Books',
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    stock: 175,
    tags: ['finance', 'money', 'self-help'],
    rating: 4.8,
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Energy-returning BOOST midsole with Continental rubber outsole for grip in all conditions. Primeknit+ upper adapts to your foot shape. Lightweight and incredibly responsive.',
    price: 189.99,
    category: 'Sports',
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    stock: 55,
    tags: ['running', 'adidas', 'boost', 'featured'],
    rating: 4.7,
  },
  {
    name: 'Charlotte Tilbury Pillow Talk Lip Kit',
    description: 'The iconic Pillow Talk collection. Includes the bestselling matte lip liner and lipstick in the perfect nude-pink shade. Long-lasting formula with intense pigmentation.',
    price: 54.00,
    category: 'Beauty',
    image_url: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2919?w=600&q=80',
    stock: 90,
    tags: ['makeup', 'lipstick', 'beauty', 'gift'],
    rating: 4.9,
  },
  {
    name: 'iPad Pro 12.9" M2',
    description: 'The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil hover. 5G connectivity, ProRes video, and up to 16GB RAM. Thin, light, and incredibly powerful.',
    price: 1099.00,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    stock: 30,
    tags: ['ipad', 'apple', 'tablet', 'featured'],
    rating: 4.8,
  },
  {
    name: 'Wilson Pro Staff Tennis Racket',
    description: 'Used by Roger Federer for decades. 97 sq. in. head size with 16x19 string pattern. Braided graphite and Kevlar construction for precision control and feel. Strung and ready to play.',
    price: 229.00,
    category: 'Sports',
    image_url: 'https://images.unsplash.com/photo-1558618047-3c8a9e0a7e5a?w=600&q=80',
    stock: 28,
    tags: ['tennis', 'racket', 'wilson', 'sports'],
    rating: 4.6,
  },
  {
    name: 'The Ordinary Skincare Set',
    description: 'Complete skincare routine starter kit. Includes Hyaluronic Acid 2% + B5, Niacinamide 10% + Zinc, AHA 30% + BHA 2% Peeling Solution, and Retinol 0.5%. Dermatologist recommended.',
    price: 42.00,
    category: 'Beauty',
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    stock: 110,
    tags: ['skincare', 'beauty', 'routine', 'sale'],
    rating: 4.7,
  },
  {
    name: 'LEGO Technic Bugatti Chiron',
    description: '3,599-piece replica of the iconic Bugatti Chiron. Features working 8-speed gearbox, W16 engine with moving pistons, retractable spoiler, and opening doors. For ages 16+.',
    price: 349.99,
    category: 'Toys',
    image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80',
    stock: 20,
    tags: ['lego', 'technic', 'bugatti', 'collector', 'featured'],
    rating: 4.9,
  },
];

async function seed() {
  await mongoose.connect(url);
  console.log('Connected to MongoDB:', DATABASE_NAME);

  // Don't delete existing products, just add new ones
  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log(`⚠️  Found ${existing} existing products.`);
    console.log('Adding new products (duplicates by name will be skipped)...');
  }

  let added = 0;
  for (const p of products) {
    const exists = await Product.findOne({ name: p.name });
    if (!exists) {
      await Product.create(p);
      console.log(`  ✅  Added: ${p.name}`);
      added++;
    } else {
      console.log(`  ⏭️  Skipped (exists): ${p.name}`);
    }
  }

  console.log(`\nDone! Added ${added} new products. Total: ${await Product.countDocuments()}`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Categories and Subcategories
  const watchesCategory = await prisma.category.create({
    data: {
      name: 'Watches',
      slug: 'watches',
      description: 'Premium timepieces for every occasion',
      subcategories: {
        create: [
          { name: 'Classic', slug: 'classic', description: 'Timeless traditional watches' },
          { name: 'Sport', slug: 'sport', description: 'Athletic and durable watches' },
          { name: 'Luxury', slug: 'luxury', description: 'High-end premium watches' },
          { name: 'Smart', slug: 'smart', description: 'Connected smart watches' },
          { name: "Men's", slug: 'mens', description: 'Watches designed for men' },
          { name: "Women's", slug: 'womens', description: 'Watches designed for women' },
        ]
      }
    },
    include: { subcategories: true }
  });

  const earringsCategory = await prisma.category.create({
    data: {
      name: 'Earrings',
      slug: 'earrings',
      description: 'Beautiful earrings to complement any style',
      subcategories: {
        create: [
          { name: 'Studs', slug: 'studs', description: 'Classic stud earrings' },
          { name: 'Hoops', slug: 'hoops', description: 'Elegant hoop earrings' },
          { name: 'Dangles', slug: 'dangles', description: 'Statement dangle earrings' },
          { name: 'Huggies', slug: 'huggies', description: 'Comfortable huggie earrings' },
          { name: 'Ear Cuffs', slug: 'ear-cuffs', description: 'Modern ear cuff designs' },
        ]
      }
    },
    include: { subcategories: true }
  });

  const necklacesCategory = await prisma.category.create({
    data: {
      name: 'Necklaces',
      slug: 'necklaces',
      description: 'Stunning necklaces for every neckline',
      subcategories: {
        create: [
          { name: 'Pendants', slug: 'pendants', description: 'Beautiful pendant necklaces' },
          { name: 'Chains', slug: 'chains', description: 'Classic chain necklaces' },
          { name: 'Layered', slug: 'layered', description: 'Trendy layered necklaces' },
          { name: 'Chokers', slug: 'chokers', description: 'Stylish choker necklaces' },
        ]
      }
    },
    include: { subcategories: true }
  });

  const braceletsCategory = await prisma.category.create({
    data: {
      name: 'Bracelets',
      slug: 'bracelets',
      description: 'Elegant bracelets for wrist styling',
      subcategories: {
        create: [
          { name: 'Bangles', slug: 'bangles', description: 'Classic bangle bracelets' },
          { name: 'Cuffs', slug: 'cuffs', description: 'Statement cuff bracelets' },
          { name: 'Charm Bracelets', slug: 'charm-bracelets', description: 'Personalized charm bracelets' },
          { name: 'Chain Bracelets', slug: 'chain-bracelets', description: 'Delicate chain bracelets' },
          { name: 'Beaded', slug: 'beaded', description: 'Beautiful beaded bracelets' },
        ]
      }
    },
    include: { subcategories: true }
  });

  const ringsCategory = await prisma.category.create({
    data: {
      name: 'Rings',
      slug: 'rings',
      description: 'Stunning rings for every finger',
      subcategories: {
        create: [
          { name: 'Statement Rings', slug: 'statement-rings', description: 'Bold statement rings' },
          { name: 'Stacking Rings', slug: 'stacking-rings', description: 'Stackable ring sets' },
          { name: 'Promise Rings', slug: 'promise-rings', description: 'Meaningful promise rings' },
          { name: 'Engagement Rings', slug: 'engagement-rings', description: 'Beautiful engagement rings' },
          { name: 'Midi Rings', slug: 'midi-rings', description: 'Trendy midi rings' },
        ]
      }
    },
    include: { subcategories: true }
  });

  console.log('✅ Categories and subcategories created');

  // Create sample products with the new structure
  const products = [
    {
      title: "Classic Chronograph",
      srcUrl: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      gallery: JSON.stringify([
        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
        "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop"
      ]),
      price: 1200,
      discount: JSON.stringify({ amount: 0, percentage: 0 }),
      rating: 4.5,
      categoryId: watchesCategory.id,
      subcategoryId: watchesCategory.subcategories.find((s: any) => s.slug === 'classic')?.id || 1,
      description: "A timeless chronograph watch with premium materials and precise Swiss movement.",
      colors: JSON.stringify(["Black", "Silver", "Gold"]),
      specifications: JSON.stringify([
        { key: "Movement", value: "Swiss Automatic" },
        { key: "Case Material", value: "Stainless Steel" },
        { key: "Water Resistance", value: "100m / 330ft" },
        { key: "Crystal", value: "Sapphire Crystal" }
      ]),
      faqs: JSON.stringify([
        { question: "Is this watch waterproof?", answer: "Yes, it has 100m water resistance suitable for swimming." },
        { question: "What warranty is included?", answer: "2-year international warranty covering manufacturing defects." }
      ])
    },
    {
      title: "Rose Gold Drop Earrings",
      srcUrl: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxlYXJyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85",
      gallery: JSON.stringify(["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxlYXJyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85"]),
      price: 450,
      discount: JSON.stringify({ amount: 50, percentage: 10 }),
      rating: 4.8,
      categoryId: earringsCategory.id,
      subcategoryId: earringsCategory.subcategories.find((s: any) => s.slug === 'dangles')?.id || 1,
      description: "Elegant rose gold drop earrings with sparkling crystals.",
      colors: JSON.stringify(["Rose Gold", "Gold", "Silver"]),
      specifications: JSON.stringify([
        { key: "Material", value: "18k Rose Gold Plated" },
        { key: "Stone", value: "Cubic Zirconia" },
        { key: "Length", value: "2.5 inches" }
      ]),
      faqs: JSON.stringify([
        { question: "Are these earrings hypoallergenic?", answer: "Yes, they are nickel-free and safe for sensitive ears." }
      ])
    },
    {
      title: "Diamond Tennis Bracelet",
      srcUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxicmFjZWxldHxlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85",
      gallery: JSON.stringify(["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxicmFjZWxldHxlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85"]),
      price: 2500,
      discount: JSON.stringify({ amount: 250, percentage: 10 }),
      rating: 4.9,
      categoryId: braceletsCategory.id,
      subcategoryId: braceletsCategory.subcategories.find((s: any) => s.slug === 'chain-bracelets')?.id || 1,
      description: "Stunning diamond tennis bracelet with brilliant cut diamonds.",
      colors: JSON.stringify(["White Gold", "Yellow Gold", "Rose Gold"]),
      specifications: JSON.stringify([
        { key: "Material", value: "14k White Gold" },
        { key: "Diamonds", value: "2.5 Carat Total Weight" },
        { key: "Length", value: "7 inches" },
        { key: "Clasp", value: "Safety Lock" }
      ]),
      faqs: JSON.stringify([
        { question: "Are the diamonds real?", answer: "Yes, these are genuine diamonds with excellent clarity." },
        { question: "Can the size be adjusted?", answer: "Yes, we offer free resizing within 30 days." }
      ])
    },
    {
      title: "Pearl Pendant Necklace",
      srcUrl: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85",
      gallery: JSON.stringify(["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85"]),
      price: 800,
      discount: JSON.stringify({ amount: 0, percentage: 0 }),
      rating: 4.7,
      categoryId: necklacesCategory.id,
      subcategoryId: necklacesCategory.subcategories.find((s: any) => s.slug === 'pendants')?.id || 1,
      description: "Classic pearl pendant necklace with lustrous freshwater pearl.",
      colors: JSON.stringify(["White", "Cream", "Pink"]),
      specifications: JSON.stringify([
        { key: "Pearl Type", value: "Freshwater Pearl" },
        { key: "Pearl Size", value: "10mm" },
        { key: "Chain Length", value: "18 inches" },
        { key: "Material", value: "Sterling Silver" }
      ]),
      faqs: JSON.stringify([
        { question: "How should I care for the pearl?", answer: "Avoid contact with perfumes and clean with a soft cloth." }
      ])
    },
    {
      title: "Statement Cocktail Ring",
      srcUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85",
      gallery: JSON.stringify(["https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85"]),
      price: 650,
      discount: JSON.stringify({ amount: 100, percentage: 15 }),
      rating: 4.6,
      categoryId: ringsCategory.id,
      subcategoryId: ringsCategory.subcategories.find((s: any) => s.slug === 'statement-rings')?.id || 1,
      description: "Bold statement ring with geometric design and precious stones.",
      colors: JSON.stringify(["Gold", "Silver", "Rose Gold"]),
      specifications: JSON.stringify([
        { key: "Material", value: "14k Gold" },
        { key: "Stones", value: "Amethyst and Diamonds" },
        { key: "Ring Size", value: "Adjustable" }
      ]),
      faqs: JSON.stringify([
        { question: "Is the ring adjustable?", answer: "Yes, it can be resized between sizes 6-9." }
      ])
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Products created');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

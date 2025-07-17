import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // First, create categories
  const watchesCategory = await prisma.category.upsert({
    where: { slug: 'watches' },
    update: {},
    create: {
      name: 'Watches',
      slug: 'watches',
      description: 'Sophisticated timepieces for every occasion',
    },
  });

  const jewelryCategory = await prisma.category.upsert({
    where: { slug: 'jewelry' },
    update: {},
    create: {
      name: 'Jewelry',
      slug: 'jewelry',
      description: 'Elegant jewelry for every style',
    },
  });

  const accessoriesCategory = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Stylish accessories to complete your look',
    },
  });

  // Create subcategories
  const classicSubcategory = await prisma.subcategory.upsert({
    where: { slug: 'classic-watches' },
    update: {},
    create: {
      name: 'Classic Watches',
      slug: 'classic-watches',
      description: 'Timeless classic timepieces',
      categoryId: watchesCategory.id,
    },
  });

  const sportSubcategory = await prisma.subcategory.upsert({
    where: { slug: 'sport-watches' },
    update: {},
    create: {
      name: 'Sport Watches',
      slug: 'sport-watches',
      description: 'Athletic and durable timepieces',
      categoryId: watchesCategory.id,
    },
  });

  const earringsSubcategory = await prisma.subcategory.upsert({
    where: { slug: 'earrings' },
    update: {},
    create: {
      name: 'Earrings',
      slug: 'earrings',
      description: 'Beautiful earrings for every occasion',
      categoryId: jewelryCategory.id,
    },
  });

  const necklacesSubcategory = await prisma.subcategory.upsert({
    where: { slug: 'necklaces' },
    update: {},
    create: {
      name: 'Necklaces',
      slug: 'necklaces',
      description: 'Elegant necklaces and pendants',
      categoryId: jewelryCategory.id,
    },
  });

  // Create products with the new schema
  const products = [
    {
      title: "Classic Chronograph",
      srcUrl: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      gallery: JSON.stringify([
        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
        "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
        "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop"
      ]),
      price: 1200,
      discount: JSON.stringify({ amount: 0, percentage: 0 }),
      rating: 4.5,
      categoryId: watchesCategory.id,
      subcategoryId: classicSubcategory.id,
      description: "A timeless chronograph watch that combines classic design with modern functionality.",
      colors: JSON.stringify(["Silver", "Gold", "Black"]),
      specifications: JSON.stringify([
        { name: "Movement", value: "Swiss Quartz" },
        { name: "Case Material", value: "Stainless Steel" },
        { name: "Water Resistance", value: "100m" },
        { name: "Crystal", value: "Sapphire" }
      ]),
      faqs: JSON.stringify([
        { question: "Is this watch water resistant?", answer: "Yes, it's water resistant up to 100 meters." },
        { question: "What type of movement does it use?", answer: "Swiss quartz movement for precise timekeeping." }
      ])
    },
    {
      title: "Sport Digital Watch",
      srcUrl: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      gallery: JSON.stringify([
        "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
        "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop"
      ]),
      price: 350,
      discount: JSON.stringify({ amount: 50, percentage: 0 }),
      rating: 4.2,
      categoryId: watchesCategory.id,
      subcategoryId: sportSubcategory.id,
      description: "A rugged digital watch perfect for sports and outdoor activities.",
      colors: JSON.stringify(["Black", "Blue", "Red"]),
      specifications: JSON.stringify([
        { name: "Display", value: "Digital LCD" },
        { name: "Battery Life", value: "2 years" },
        { name: "Water Resistance", value: "200m" },
        { name: "Features", value: "Stopwatch, Timer, Alarm" }
      ]),
      faqs: JSON.stringify([
        { question: "How long does the battery last?", answer: "The battery typically lasts 2 years with normal use." },
        { question: "Can I swim with this watch?", answer: "Yes, it's water resistant up to 200 meters." }
      ])
    },
    {
      title: "Diamond Stud Earrings",
      srcUrl: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      gallery: JSON.stringify([
        "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop"
      ]),
      price: 899,
      discount: JSON.stringify({ amount: 0, percentage: 15 }),
      rating: 4.8,
      categoryId: jewelryCategory.id,
      subcategoryId: earringsSubcategory.id,
      description: "Elegant diamond stud earrings perfect for any occasion.",
      colors: JSON.stringify(["White Gold", "Yellow Gold", "Rose Gold"]),
      specifications: JSON.stringify([
        { name: "Diamond Carat", value: "0.5ct each" },
        { name: "Clarity", value: "VS1" },
        { name: "Color", value: "G-H" },
        { name: "Setting", value: "4-prong" }
      ]),
      faqs: JSON.stringify([
        { question: "Are these real diamonds?", answer: "Yes, these are genuine diamonds with VS1 clarity." },
        { question: "Do they come with certificates?", answer: "Yes, each pair comes with a certificate of authenticity." }
      ])
    },
    {
      title: "Pearl Necklace",
      srcUrl: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      gallery: JSON.stringify([
        "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop"
      ]),
      price: 650,
      discount: JSON.stringify({ amount: 0, percentage: 0 }),
      rating: 4.6,
      categoryId: jewelryCategory.id,
      subcategoryId: necklacesSubcategory.id,
      description: "Classic cultured pearl necklace that adds elegance to any outfit.",
      colors: JSON.stringify(["White", "Cream", "Pink"]),
      specifications: JSON.stringify([
        { name: "Pearl Size", value: "7-8mm" },
        { name: "Pearl Type", value: "Cultured Freshwater" },
        { name: "Length", value: "18 inches" },
        { name: "Clasp", value: "14k Gold" }
      ]),
      faqs: JSON.stringify([
        { question: "Are these real pearls?", answer: "Yes, these are genuine cultured freshwater pearls." },
        { question: "How should I care for them?", answer: "Store separately and clean with a soft cloth after wearing." }
      ])
    }
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: productData,
    });
  }

  // Create some sample reviews
  const allProducts = await prisma.product.findMany();
  
  for (const product of allProducts) {
    await prisma.review.create({
      data: {
        user: "Sarah M.",
        content: "Absolutely love this product! Great quality and fast shipping.",
        rating: 5,
        date: "2024-01-15",
        productId: product.id,
      },
    });

    await prisma.review.create({
      data: {
        user: "Mike R.",
        content: "Good value for money. Would recommend to others.",
        rating: 4,
        date: "2024-01-20",
        productId: product.id,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

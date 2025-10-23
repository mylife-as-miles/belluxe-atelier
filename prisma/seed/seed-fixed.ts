import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create category for Fashion Bags
  const fashionBagsCategory = await prisma.category.upsert({
    where: { slug: 'fashion-bags' },
    update: {},
    create: {
      name: 'Fashion Bags',
      slug: 'fashion-bags',
      description: 'Stylish bags for every occasion',
    },
  });

  // Create subcategories for Fashion Bags
  const toteBagsSubcategory = await prisma.subcategory.upsert({
    where: { slug: 'tote-bags' },
    update: {},
    create: {
      name: 'Tote Bags',
      slug: 'tote-bags',
      description: 'Spacious and versatile tote bags',
      categoryId: fashionBagsCategory.id,
    },
  });

  const shoulderBagsSubcategory = await prisma.subcategory.upsert({
    where: { slug: 'shoulder-bags' },
    update: {},
    create: {
      name: 'Shoulder Bags',
      slug: 'shoulder-bags',
      description: 'Comfortable and stylish shoulder bags',
      categoryId: fashionBagsCategory.id,
    },
  });

  // Create products for Fashion Bags
  const products = [
    {
      title: "Classic Leather Tote",
      srcUrl: "https://images.pexels.com/photos/1040384/pexels-photo-1040384.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      gallery: JSON.stringify([
        "https://images.pexels.com/photos/1040384/pexels-photo-1040384.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      ]),
      price: 250,
      discount: JSON.stringify({ amount: 0, percentage: 0 }),
      rating: 4.7,
      categoryId: fashionBagsCategory.id,
      subcategoryId: toteBagsSubcategory.id,
      description: "A timeless leather tote bag that is perfect for everyday use.",
      colors: JSON.stringify(["Black", "Brown", "Beige"]),
      specifications: JSON.stringify([
        { name: "Material", value: "Genuine Leather" },
        { name: "Dimensions", value: "15 x 12 x 5 inches" },
        { name: "Strap Drop", value: "10 inches" },
      ]),
      faqs: JSON.stringify([
        { question: "Is this bag spacious enough for a laptop?", answer: "Yes, it can comfortably fit a 15-inch laptop." },
      ])
    },
    {
      title: "Chic Shoulder Bag",
      srcUrl: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      gallery: JSON.stringify([
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop",
      ]),
      price: 180,
      discount: JSON.stringify({ amount: 20, percentage: 0 }),
      rating: 4.5,
      categoryId: fashionBagsCategory.id,
      subcategoryId: shoulderBagsSubcategory.id,
      description: "A stylish shoulder bag that will elevate any outfit.",
      colors: JSON.stringify(["Red", "Blue", "Green"]),
      specifications: JSON.stringify([
        { name: "Material", value: "Faux Leather" },
        { name: "Dimensions", value: "12 x 8 x 4 inches" },
        { name: "Strap", value: "Adjustable shoulder strap" },
      ]),
      faqs: JSON.stringify([])
    },
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
        content: "Absolutely love this bag! Great quality and fast shipping.",
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

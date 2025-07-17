const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Creating categories...');

  // Create categories
  const categories = [
    {
      name: 'Watches',
      slug: 'watches',
      description: 'Premium timepieces for every occasion'
    },
    {
      name: 'Earrings',
      slug: 'earrings', 
      description: 'Beautiful earrings to complement any style'
    },
    {
      name: 'Necklaces',
      slug: 'necklaces',
      description: 'Stunning necklaces for every neckline'
    },
    {
      name: 'Bracelets',
      slug: 'bracelets',
      description: 'Elegant bracelets for wrist styling'
    },
    {
      name: 'Rings',
      slug: 'rings',
      description: 'Stunning rings for every finger'
    }
  ];

  for (const category of categories) {
    try {
      const created = await prisma.category.create({
        data: category
      });
      console.log(`✅ Created category: ${created.name}`);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️ Category ${category.name} already exists`);
      } else {
        console.error(`❌ Error creating ${category.name}:`, error.message);
      }
    }
  }

  // Create subcategories
  const subcategories = [
    // Watches subcategories
    { name: 'Classic', slug: 'classic', categorySlug: 'watches' },
    { name: 'Sport', slug: 'sport', categorySlug: 'watches' },
    { name: 'Luxury', slug: 'luxury', categorySlug: 'watches' },
    { name: 'Smart', slug: 'smart', categorySlug: 'watches' },
    
    // Earrings subcategories
    { name: 'Studs', slug: 'studs', categorySlug: 'earrings' },
    { name: 'Hoops', slug: 'hoops', categorySlug: 'earrings' },
    { name: 'Dangles', slug: 'dangles', categorySlug: 'earrings' },
    
    // Necklaces subcategories
    { name: 'Pendants', slug: 'pendants', categorySlug: 'necklaces' },
    { name: 'Chains', slug: 'chains', categorySlug: 'necklaces' },
    { name: 'Chokers', slug: 'chokers', categorySlug: 'necklaces' },
    
    // Bracelets subcategories
    { name: 'Bangles', slug: 'bangles', categorySlug: 'bracelets' },
    { name: 'Cuffs', slug: 'cuffs', categorySlug: 'bracelets' },
    { name: 'Chain Bracelets', slug: 'chain-bracelets', categorySlug: 'bracelets' },
    
    // Rings subcategories
    { name: 'Statement Rings', slug: 'statement-rings', categorySlug: 'rings' },
    { name: 'Stacking Rings', slug: 'stacking-rings', categorySlug: 'rings' },
    { name: 'Engagement Rings', slug: 'engagement-rings', categorySlug: 'rings' }
  ];

  for (const subcategory of subcategories) {
    try {
      // Find the category
      const category = await prisma.category.findUnique({
        where: { slug: subcategory.categorySlug }
      });

      if (category) {
        const created = await prisma.subcategory.create({
          data: {
            name: subcategory.name,
            slug: subcategory.slug,
            categoryId: category.id
          }
        });
        console.log(`✅ Created subcategory: ${created.name} under ${category.name}`);
      }
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️ Subcategory ${subcategory.name} already exists`);
      } else {
        console.error(`❌ Error creating subcategory ${subcategory.name}:`, error.message);
      }
    }
  }

  console.log('🎉 Categories setup complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

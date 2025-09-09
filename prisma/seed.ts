import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@foodnetwork.com' },
    update: {},
    create: {
      email: 'admin@foodnetwork.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'admin'
    }
  })

  // Create member users
  const memberPassword = await bcrypt.hash('member123', 12)
  const member1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      passwordHash: memberPassword,
      role: 'member'
    }
  })

  const member2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      passwordHash: memberPassword,
      role: 'member'
    }
  })

  // Create sample products
  const products = [
    {
      name: 'Organic Brown Rice',
      description: '25 lb bag of organic brown rice',
      category: 'Grains',
      unitPrice: 24.99,
      currentStock: 50,
      unitsPerCase: 1,
      unitSize: '25 lb bag',
      totalUnits: 50,
      soldUnits: 12
    },
    {
      name: 'Raw Almonds',
      description: 'Premium raw almonds, 10 lb bag',
      category: 'Nuts',
      unitPrice: 89.99,
      currentStock: 25,
      unitsPerCase: 1,
      unitSize: '10 lb bag',
      totalUnits: 25,
      soldUnits: 8
    },
    {
      name: 'Quinoa',
      description: 'Organic tri-color quinoa, 5 lb bag',
      category: 'Grains',
      unitPrice: 32.99,
      currentStock: 30,
      unitsPerCase: 1,
      unitSize: '5 lb bag',
      totalUnits: 30,
      soldUnits: 15
    },
    {
      name: 'Coconut Oil',
      description: 'Cold-pressed coconut oil, 1 gallon',
      category: 'Oils',
      unitPrice: 45.99,
      currentStock: 20,
      unitsPerCase: 1,
      unitSize: '1 gallon',
      totalUnits: 20,
      soldUnits: 5
    },
    {
      name: 'Black Beans',
      description: 'Dried organic black beans, 25 lb bag',
      category: 'Legumes',
      unitPrice: 39.99,
      currentStock: 15,
      unitsPerCase: 1,
      unitSize: '25 lb bag',
      totalUnits: 15,
      soldUnits: 3
    },
    {
      name: 'Chia Seeds',
      description: 'Organic chia seeds, 5 lb bag',
      category: 'Seeds',
      unitPrice: 59.99,
      currentStock: 12,
      unitsPerCase: 1,
      unitSize: '5 lb bag',
      totalUnits: 12,
      soldUnits: 7
    }
  ]

  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData
    })

    // Create initial stock movement record
    await prisma.productMovement.create({
      data: {
        productId: product.id,
        movementType: 'stock_added',
        quantity: productData.currentStock,
        userId: admin.id,
        notes: 'Initial stock from seed data'
      }
    })
  }

  // Create sample product requests
  const productRequests = [
    {
      productName: 'Raw Cashews',
      description: 'Looking for bulk raw cashews, unsalted',
      priceRange: '$8-12 per pound',
      amountWanted: 5.5,
      userId: member1.id,
      status: 'pending' as const
    },
    {
      productName: 'Maple Syrup',
      description: 'Pure maple syrup in bulk containers',
      priceRange: '$15-20 per gallon',
      amountWanted: 2.0,
      userId: member2.id,
      status: 'pending' as const
    }
  ]

  for (const requestData of productRequests) {
    await prisma.productRequest.create({
      data: requestData
    })
  }

  // Create a sample news article
  await prisma.news.create({
    data: {
      title: 'Welcome to Community Food Network!',
      content: 'We\'re excited to launch our community-driven bulk food purchasing platform. Members can now browse our inventory, place orders, and request new products. Together, we can access quality bulk foods at better prices!',
      authorId: admin.id,
      published: true
    }
  })

  console.log('Seed completed successfully!')
  console.log('Test accounts:')
  console.log('- Admin: admin@foodnetwork.com / admin123')
  console.log('- Member: john@example.com / member123')
  console.log('- Member: jane@example.com / member123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
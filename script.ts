import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // prismma client queries here
  const users = await prisma.user.findMany({
    where: { email: 'johnwells.developer@gmail.com' },
    include: { posts: true }
  });

  const posts = await prisma.user
    .findFirst({
      where: { email: 'johnwells.developer@gmail.com' }
    })
    .posts({
      include: { author: true }
    });

  console.dir({ users }, { depth: Infinity });
  console.dir({ posts }, { depth: Infinity });

  // create a new record
  const newPost = await prisma.post.create({
    data: {
      title: 'Living the dream',
      content: 'Living life',
      author: {
        connectOrCreate: {
          create: {
            email: 'oldemail@gmail.com',
            name: 'Someone'
          },
          where: {
            email: 'oldemail@gmail.com'
          }
        }
      }
    },
    include: { author: true }
  }).catch((err) => {
    console.error(err.message);
  })

  console.dir(newPost, { depth: Infinity });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

'use strict';

const db = require('../server/db');
const fs = require('fs');
const {User, Product, Cart, Order} = require('../server/db/models');

const seedProducts = [
  {
    name: 'Amortentia',
    description:
      'The most powerful love potion in existence. It causes a powerful infatuation or obsession from the drinker. It has a distinctive mother-of-pearl sheen, and steam rises from it in characteristic spirals.',
    price: 900,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731'
  },
  {
    name: 'Confusing Concoction',
    description:
      'A potion which causes confusion in the drinker. Its known ingredients are scurvy grass, lovage, and sneezewort',
    price: 300,
    imageUrl:
      'https://d.wattpad.com/story_parts/699873420/images/158695304eb09911855926916674.jpg'
  },
  {
    name: 'Draught of Living Death',
    description:
      'An extremely powerful sleeping draught, sending the drinker into a deathlike slumber. Its effects are similar to suspended animation.',
    price: 300,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/d/d7/Draught-of-living-death.png/revision/latest?cb=20121027143847'
  },
  {
    name: 'Draught of Peace',
    description:
      'A potion which relieves anxiety and agitation. Its ingredients are powdered moonstone, syrup of hellebore, powdered porcupine quills, and powdered unicorn horn.',
    price: 150,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/f/fa/DraughtOfPeace.png/revision/latest/scale-to-width-down/207?cb=20130309181213'
  },
  {
    name: 'Felix Felicis',
    description:
      'A magical potion that makes the drinker lucky for a period of time, during which everything they attempt will be successful. It turns an ordinary day into an extraordinary one.',
    price: 1000,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/8/84/Felix_Felicis_Phial_HBP.png/revision/latest/scale-to-width-down/187?cb=20161125004911'
  },
  {
    name: 'Hiccoughing Solution',
    description: 'A potion that presumably causes hiccoughs.',
    price: 100,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/9/92/HiccoughingSolution.png/revision/latest/scale-to-width-down/145?cb=20131128000240'
  },
  {
    name: 'Pepperup Potion',
    description:
      'A potion which cures the common cold. It has the side-effect of causing steam to come out of the drinkers ears for several hours after it is imbibed.',
    price: 300,
    imageUrl:
      'https://pm1.narvii.com/5937/0265641bd2aa08c57ec10e13ef7b6ae74f18105d_hq.jpg'
  },
  {
    name: 'Polyjuice Potion',
    description:
      'A potion that allows the drinker to assume the form of someone else. It is a highly complicated, challenging and time-consuming potion that even adult witches and wizards struggle to brew correctly.[1] The potion is incredibly advanced and has two separate parts that contain steps for each part, when brewing is complete the potion has to stew for a month before usage.',
    price: 1000,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/1/1b/B2C12M2_Polyjuice_Potion_ready.jpg/revision/latest/scale-to-width-down/300?cb=20180420195742'
  },
  {
    name: 'Skele-Gro',
    description:
      'A dreadful-tasting potion which restores bones. It is able to mend broken bones,[4] or even regrow entire bones that have vanished or been otherwise lost. For regrowing entire bones, the process is a notably slow and painful process, that can take over a full day.',
    price: 500,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/b/b5/Skele-gro-lrg.png/revision/latest?cb=20121031212109'
  },
  {
    name: 'Sleekeazys Hair Potion',
    description:
      'A hair care potion and scalp treatment that was invented by Fleamont Potter.[1][3][2] It was originally sold with the slogan "Two drops tames even the most bothersome barnet.',
    price: 300,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/c/c6/SleekeasysHairPotion2.jpg/revision/latest/scale-to-width-down/250?cb=20120913080454'
  },
  {
    name: 'Veritaserum',
    description:
      'A powerful truth serum. The potion effectively forces the drinker to answer any questions put to them truthfully, though there are certain methods of resistance.',
    price: 700,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/a/a0/Truth_sperum.gif/revision/latest?cb=20140814175142'
  },
  {
    name: 'Wolfsbane Potion',
    description:
      'An innovative and complex potion that relieves, but does not cure, the symptoms of lycanthropy, or werewolfry.[1] The main ingredient was wolfsbane (also referred to as aconite or monkshood). As such, this Potion was very dangerous when incorrectly concocted, since Aconite was a very poisonous substance.',
    price: 400,
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/5/5f/Wolfsbane_Potion.jpg/revision/latest/scale-to-width-down/283?cb=20091128000541'
  },
  {
    name: 'Drink Me Potion',
    description:
      'A magical liquid in Wonderland that has an unusual effect to make the drinker shrink in size.',
    price: 300,
    imageUrl:
      'https://vignette.wikia.nocookie.net/aliceinwonderland/images/c/c6/Drinkme11.png/revision/latest/scale-to-width-down/300?cb=20120404063946'
  },
  {
    name: 'Morpheus Red or Blue Pill',
    description:
      'A red pill to learn the real truth and a blue pill to go back to old life.',
    price: 1000,
    imageUrl:
      'https://qph.fs.quoracdn.net/main-qimg-c8b0469e016ae3cb378e2cc3e8bf872f'
  },
  {
    name: 'Aquamarine Gem',
    description:
      'Use Aquamarine to ride the positive waves toward closure, major life changes and a higher consciousness. This water-like stone washes away stress and fear, leaving room for peace and tranquility in their absence.',
    price: 50,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41Y2uuciGSL._UX395_.jpg'
  },
  {
    name: 'Citrine',
    description:
      'The Citrine gemstone is widely known as the money gemstone. Many also call it the merchant’s gemstone. Wear this gemstone to attract money.',
    price: 30,
    imageUrl:
      'https://img1.wsimg.com/isteam/ip/ce1d01bc-d727-42e9-940d-2d695fbd8731/1f758d40-c369-4873-a273-b7093c4d4181.jpg'
  },
  {
    name: 'Rose Quartz',
    description:
      'The fair and lovely Rose Quartz, with its gentle pink essence, is a stone of the heart, a Crystal of Unconditional Love. It carries a soft feminine energy of compassion and peace, tenderness and healing, nourishment and comfort.',
    price: 60,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS97DBUTCWnUiNSsuakvsbLa99bGr-gxSzHGyjf5IUyobkYvO9U'
  },
  {
    name: 'Gazing Crystal',
    description:
      'Clairvoyance works mainly through clear seeing – images, feelings and impressions can all be used in this fashion. Crystal gazing will help you focus your clairvoyant powers resulting in many different images.',
    price: 150,
    imageUrl:
      'https://realunexplainedmysteries.com/wp-content/uploads/2014/09/cbx1127.jpg'
  }
];

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  await Promise.all(
    seedProducts.map(async prod => {
      await Product.create(prod);
    })
  );

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({
      email: 'gkmurray124@gmail.com',
      password: '123',
      isAdmin: true
    }),
    User.create({email: 'adrayton0@vimeo.com', password: 'FbIuK7ht866'}),
    User.create({email: 'pcovelleqj@google.co.jp', password: 'yskeNZ3Cpi'}),
    User.create({email: 'afallowesqo@bluehost.com', password: 'BWjY1Xz7Ydp'}),
    User.create({email: 'jeadqx@sina.com.cn', password: 'ZnBOkUo32qsp'}),
    User.create({
      email: 'vvenableqz@noaa.gov',
      password: 'vvenableqz@noaa.gov'
    }),
    User.create({email: 'mbadcockrl@economist.com', password: 'u4moe5yQ'}),
    User.create({email: 'amckimmiern@huffingtonpost.com', password: 'qUSenxE'}),
    User.create({
      email: 'cstranaghanro@pagesperso-orange.fr',
      password: 'QDYKFbO4gZBk'
    }),
    User.create({email: 'chollierrp@economist.com', password: '25qYvsp'}),
    User.create({email: 'cwilgarrq@cbslocal.com', password: 'WLfb59Zp'}),
    User.create({email: 'cgillimghamrr@nytimes.com', password: '1opVxcyg7'}),
    User.create({email: 'sbinchr4@people.com.cn', password: 'ZrnzYRm'}),
    User.create({email: 'rfarnorthrd@timesonline.co.uk', password: 'HKt3uJHy'})
  ]);

  // Add some products to users cards

  const order1 = await Order.create({userId: 1});
  const order2 = await Order.create({userId: 2});
  const order3 = await Order.create({userId: 3});
  const order4 = await Order.create({userId: 4});
  const order5 = await Order.create({userId: 5});
  const order6 = await Order.create({userId: 6});
  const order7 = await Order.create({userId: 7});
  const order8 = await Order.create({userId: 8});
  const order9 = await Order.create({userId: 9});
  const order10 = await Order.create({userId: 10});
  const order11 = await Order.create({userId: 12});
  const order12 = await Order.create({userId: 13});
  const order13 = await Order.create({userId: 16});
  await order1.addProduct([1, 2, 3], {through: {quantity: 5}});
  await order2.addProduct([3, 4, 5, 6, 7], {through: {quantity: 1}});
  await order3.addProduct([4, 5, 8, 7, 1], {through: {quantity: 2}});
  await order4.addProduct([1], {through: {quantity: 1}});
  await order5.addProduct([5, 6, 8], {through: {quantity: 1}});
  await order6.addProduct([14], {through: {quantity: 7}});
  await order7.addProduct([12, 13], {through: {quantity: 1}});
  await order8.addProduct([10, 5], {through: {quantity: 1}});
  await order9.addProduct([1, 6, 10], {through: {quantity: 1}});
  await order10.addProduct([10, 11, 12, 13, 14], {through: {quantity: 1}});
  await order11.addProduct([13, 2], {through: {quantity: 1}});
  await order12.addProduct([8, 4], {through: {quantity: 1}});
  await order13.addProduct([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], {
    through: {quantity: 1}
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

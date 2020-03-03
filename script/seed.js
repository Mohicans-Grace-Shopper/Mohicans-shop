'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const seedProducts = [
  {
    name: 'love potion',
    description: 'how voldemort was created, beware.',
    price: 420.0
  },
  {
    name: 'get rich quick gem',
    description: 'rub 3 times for $500',
    price: 500.0
  },
  {
    name: 'invisibility potion',
    description: 'warning: does not work on clothes, 2 hour limit',
    price: 300
  },
  {
    name: 'Amortentia',
    description: 'The most powerful love potion in existence. It causes a powerful infatuation or obsession from the drinker. It has a distinctive mother-of-pearl sheen, and steam rises from it in characteristic spirals.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731'
  },
{
    name: 'Confusing Concoction',
    description: 'A potion which causes confusion in the drinker. Its known ingredients are scurvy grass, lovage, and sneezewort',
    price: 300,
    imageUrl: 'https://d.wattpad.com/story_parts/699873420/images/158695304eb09911855926916674.jpg'

  },
{
    name: 'Draught of Living Death',
    description: 'An extremely powerful sleeping draught, sending the drinker into a deathlike slumber. Its effects are similar to suspended animation.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/d/d7/Draught-of-living-death.png/revision/latest?cb=20121027143847'
  },
{
    name: 'Draught of Peace',
    description: 'A potion which relieves anxiety and agitation. Its ingredients are powdered moonstone, syrup of hellebore, powdered porcupine quills, and powdered unicorn horn.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/f/fa/DraughtOfPeace.png/revision/latest/scale-to-width-down/207?cb=20130309181213'
  },
{
    name: 'Felix Felicis',
    description: 'A magical potion that makes the drinker lucky for a period of time, during which everything they attempt will be successful. It turns an ordinary day into an extraordinary one.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/8/84/Felix_Felicis_Phial_HBP.png/revision/latest/scale-to-width-down/187?cb=20161125004911'
  },
{
    name: 'Hiccoughing Solution',
    description: 'A potion that presumably causes hiccoughs.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/9/92/HiccoughingSolution.png/revision/latest/scale-to-width-down/145?cb=20131128000240'
  },
{
    name: 'Pepperup Potion',
    description: 'A potion which cures the common cold. It has the side-effect of causing steam to come out of the drinkers ears for several hours after it is imbibed.',
    price: 300,
    imageUrl: 'https://pm1.narvii.com/5937/0265641bd2aa08c57ec10e13ef7b6ae74f18105d_hq.jpg'
  },
{
    name: 'Polyjuice Potion',
    description: 'A potion that allows the drinker to assume the form of someone else. It is a highly complicated, challenging and time-consuming potion that even adult witches and wizards struggle to brew correctly.[1] The potion is incredibly advanced and has two separate parts that contain steps for each part, when brewing is complete the potion has to stew for a month before usage.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/1/1b/B2C12M2_Polyjuice_Potion_ready.jpg/revision/latest/scale-to-width-down/300?cb=20180420195742'
  },
{
    name: 'Skele-Gro',
    description: 'A dreadful-tasting potion which restores bones. It is able to mend broken bones,[4] or even regrow entire bones that have vanished or been otherwise lost. For regrowing entire bones, the process is a notably slow and painful process, that can take over a full day.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/b/b5/Skele-gro-lrg.png/revision/latest?cb=20121031212109'
  },
  {
    name: 'Sleekeazys Hair Potion',
    description: 'A hair care potion and scalp treatment that was invented by Fleamont Potter.[1][3][2] It was originally sold with the slogan "Two drops tames even the most bothersome barnet.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/c/c6/SleekeasysHairPotion2.jpg/revision/latest/scale-to-width-down/250?cb=20120913080454'
  },
{
    name: 'Veritaserum',
    description: 'A powerful truth serum. The potion effectively forces the drinker to answer any questions put to them truthfully, though there are certain methods of resistance.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a0/Truth_sperum.gif/revision/latest?cb=20140814175142'
  },
{
    name: 'Wolfsbane Potion',
    description: 'An innovative and complex potion that relieves, but does not cure, the symptoms of lycanthropy, or werewolfry.[1] The main ingredient was wolfsbane (also referred to as aconite or monkshood). As such, this Potion was very dangerous when incorrectly concocted, since Aconite was a very poisonous substance.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/5/5f/Wolfsbane_Potion.jpg/revision/latest/scale-to-width-down/283?cb=20091128000541'
  },
{
    name: 'Drink Me Potion',
    description: 'A magical liquid in Wonderland that has an unusual effect to make the drinker shrink in size.',
    price: 300,
    imageUrl: 'https://vignette.wikia.nocookie.net/aliceinwonderland/images/c/c6/Drinkme11.png/revision/latest/scale-to-width-down/300?cb=20120404063946'
  },
{
    name: 'Morpheus red or blue pill',
    description: 'A red pill to learn the real truth and a blue pill to go back to old life.',
    price: 300,
    imageUrl: 'https://qph.fs.quoracdn.net/main-qimg-c8b0469e016ae3cb378e2cc3e8bf872f'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    seedProducts.map(async prod => {
      await Product.create(prod)
    })
  )

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  // Add some products to users cards
  const user1 = await User.findByPk(1)
    await user1.addProduct([1, 2, 3])
  const user2 = await User.findByPk(1)
    await user2.addProduct([1, 2, 3])


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

import fs from 'node:fs';
import assert from 'node:assert/strict';
const journal = JSON.parse(fs.readFileSync(new URL('../src/app/journal.json', import.meta.url), 'utf8'));
const highlights = [], quotes = [];
function passage(entryId, ranges) {
  const entry = journal.find(entry => entry.id === entryId);
  assert(entry, `Unknown entry ${entryId}`);
  let previousEnd = -1;
  return ranges.map(([start, end = start]) => {
    const from = entry.body.indexOf(start, previousEnd + 1);
    assert(from >= 0, `Entry ${entryId}: missing start ${start}`);
    const last = entry.body.indexOf(end, from);
    assert(last >= 0, `Entry ${entryId}: missing end ${end}`);
    previousEnd = last + end.length - 1;
    return entry.body.slice(from, previousEnd + 1);
  });
}
function h(entryId, title, ...ranges) { highlights.push({ entryId, title, passages: passage(entryId, ranges) }); }
function q(entryId, ...ranges) { quotes.push({ entryId, passages: passage(entryId, ranges) }); }

// Entries 1–55: editorial review of the complete source entries.
h(7, 'A promise before this life', ['Irmão Gonçalves told us an amazing story.', 'may God let me find them.']);
h(12, 'A glimpse of God’s children', ['I had a small glimpse', 'intelligence is truly the key...']);
h(17, 'A witness of God’s timing', ['I find it amazing', 'here with me.']);
h(21, 'Learning to listen while giving a blessing', ['Had my first opportunity to give a blessing today.', 'I thank God for this opportunity.']);
h(22, 'Following a prompting to express gratitude', ['After Irmão Gonçalves’ class', 'receive revelation.']);
h(27, 'An answer through the gift of tongues', ['We sat by some brasileiros', 'to be successful.']);
h(32, 'A small lesson in reverence', ['During the devotional', 'no doubt a sign!']);
h(38, 'Led by the Spirit while testifying', ['I really felt like we were led by the Spirit and found people who will read it.'], ['The best contact though was a muslim.', 'He seemed really interested after we taught him.']);
h(48, 'A message that God is grateful', ['God is Thankful', 'I am truly thankful to be here as well.']);
h(49, 'A blessing while sick', ['I felt really sick today.', 'I am feeling better.']);
h(55, 'A confirmation of Christ’s ministry', ['I got to see The Testaments film', 'being in the Americas.']);
q(3, ['I’m learning that the spirit is truly a peace and comfort – a feeling that everything is completely right.']);
q(10, ['attaining perfection – it is a commandment.', 'fully and completely here on earth.'], ['He only wants the best for us', 'with faith in His name.']);
q(12, ['Perhaps spiritual gifts can come', 'intelligence is truly the key...']);
q(13, ['I guess you never know how you affect other people.']);
q(17, ['I find it amazing how the Lord can work good, even through all of our mortal weaknesses, pride, and mistakes.']);
q(17, ['Truly God is all knowing and His love infinite.', 'It is this Love which is life eternal.']);
q(24, ['First, always be trying to invite the Spirit;', 'It’s simple, but hard to be that humble.']);
q(28, ['A testimony comes only when you want it; or need it.']);
q(28, ['If you have a testimony thank God. If you don’t, ask God.']);
q(29, ['Humility is key', 'the blessings will continue to flow.']);
q(40, ['if we truly love God we would keep His commandments perfectly.'], ['Of course, perfection is something that takes work to achieve, and we can love Him in that process.']);
q(40, ['I desire God to help me consecrate my existence to Him,', 'can align our interests or desires.']);
q(42, ['I want to receive the greatest blessings from God, and I’m willing to accept the responsibility that comes with them.']);
q(50, ['I think always being thankful is good for preparing for revelation.', 'remembering it’s all from God.']);
q(51, ['The whole world needs the Gospel', 'I need to shine.']);
q(53, ['The better I follow the commandments and Rules,', 'I want to walk in the Light of the Lord.']);
q(54, ['Normally the Spirit will tell you', 'to fulfill the higher purpose and law.']);
q(54, ['If I’m only looking to serve others,', 'a true Representative of Christ.']);
q(55, ['I pray God will bless me with strength to be obedient and diligent, for these will truly bring the blessings of Heaven.']);

// Entries 56–105.
h(56, 'A witness grounded in the Book of Mormon', ['My faith and testimony ride on the Book of Mormon,', 'strengthened while I’m on my Mission.']);
h(61, 'Recognizing the Spirit together', ['Then we talked with Bel and Nubia', 'Way cool.']);
h(63, 'Led to a prepared family', ['Two days ago we contacted a boy named Jonathan.', 'They were prepared by the Lord.'], ['It’s amazing to see how God leads us to the elect.']);
h(67, 'The Spirit in a lesson on faith and the Atonement', ['Had a good lesson today with Bel and Nubia.', 'I taught about faith.']);
h(72, 'The Spirit speaking through a missionary', ['Had a good experience today', 'bringing souls to Christ.']);
h(79, 'A growing witness while teaching', ['Today I felt the Spirit a lot.', 'I love to feel my testimony grow.']);
h(80, 'A first baptism', ['Today was Christhian’s baptism.', 'Christ lives.']);
h(81, 'The gift of tongues while bearing testimony', ['In Gospel Principles class', 'children of God.']);
h(83, 'A witness of the Restoration', ['We had a really good restoration lesson today.', 'God has given me.']);
h(85, 'A lesson that moved Paloma to tears', ['Today we had a good lesson with Paloma', 'her to tears.'], ['I felt strongly that the church needs her for some reason.', 'gains a strong testimony.']);
h(87, 'A witness while reading the Book of Mormon', ['We also met with Pedro', 'Christ really appeared to them.']);
h(88, 'Paloma’s answer to prayer', ['Paloma told us today she wants to be baptized.', 'the Lord sent me here to help her.'], ['The lesson with her today was a really spiritual lesson also.', 'I loved it.']);
h(90, 'Revelation about building companionship unity', ['I received a revelation today', 'help me learn the language fast.']);
h(94, 'Understanding the infinite Atonement', ['I had a bit of a revelation about how the Atonement is infinite;', 'more light and truth as I grow.']);
q(57, ['without the personal revelation about their needs we are teaching in vain.']);
q(59, ['With pure Faith, miracles will happen.', 'all that the Lord has for me.']);
q(66, ['This truly is a message of peace, to fill those unanswered yearnings of the human soul.']);
q(69, ['Yet somehow it is satisfying just knowing I’m serving to the best of my ability.', 'Good will come from all that is performed with the right intent.']);
q(72, ['we need to develop Christ-like attributes to apply the Atonement in our lives.']);
q(88, ['It is Virtue, the ability to control our thoughts,', 'Virtue is essential for Faith to bring Miracles.']);
q(94, ['the Atonement is infinite; because it’s happening now.', 'yet all passed before Him in an instant.']);
q(97, ['I think this is a good opportunity to develop attributes that I’m lacking.', 'situations God gives me in the future.']);
q(105, ['trust is more important than love, because trust has confidence and security, not just emotion.']);
q(105, ['The mission is fun, everything seems so random, but in fact it is all the hand of God.']);

// Entries 106–145.
h(110, 'A taste of the pure love of Christ', ['Had a good lesson today with a girl named Stefani.', 'It was a really good experience.']);
h(111, 'A testimony that invited the Spirit', ['First, I did a division with Elder Nunes,', 'strengthened my faith.'], ['today at lunch we had a spiritual experience.', 'a testimony that truly invites the Spirit.']);
h(112, 'An unexpected path to a family', ['We had a good spiritual experience yesterday.', 'which a great blessing.']);
h(113, 'A confirmation about the other side of the veil', ['Then when we arrived I felt the Spirit guide the lesson.', 'I know this now.']);
h(115, 'Nildo’s dreams and conversion', ['We had a really good lesson with Nildo yesterday,', 'What a miracle.']);
h(116, 'A sacred blessing for a premature baby', ['Elder Pacheco and I had the opportunity to go to the hospital today to give blessings.'], ['we blessed her baby,', 'these sacred experiences.']);
h(117, 'Joy at Stefani’s baptism', ['Yesterday was the baptism of Stefani.', 'help people obtain this Gift.']);
h(118, 'Led by the Lord while teaching', ['The Lord was with me and led me how to teach. In hindsight, it’s humbling.'], ['It’s amazing to see how the Lord is blessing me with this language.', 'with the aid of the Lord.']);
h(119, 'Tears of joy at three baptisms', ['Sunday we had the baptisms of Mariana,', 'doing the work of the Lord.']);
h(120, 'United faith in a priesthood blessing', ['we gave him a blessing.', 'united in the work of Christ.']);
h(124, 'Recognizing the Atonement’s power to change', ['I felt today the growth', 'eternity and exaltation.']);
h(126, 'Paula recognizes the Spirit', ['Yesterday we had lesson that was really spiritual,', 'We explained that this is the Spirit.']);
h(127, 'Trusting God through a discouraging day', ['It was a day that would have been easy to fall into discouragement;', 'It still wasn’t bearing fruit.'], ['So we decided to enter the street of Sueli', 'put our trust in Him.']);
h(128, 'An unexpected opportunity to teach Marcos', ['2 days ago I had a really good experience; a miracle.', 'went and taught our other lessons.'], ['So I was sitting in front of the Church', 'And he accepted baptism!'], ['It was a really cool experience for me', 'helped it all come together.']);
h(129, 'Revelation through pondering and virtue', ['Yesterday night I was laying in bed,', 'receive such light.']);
h(130, 'A witness at the temple', ['We did a tour of the Temple yesterday', 'God always testifies that it’s His house.']);
h(131, 'A peaceful, silent witness', ['Today we had a really good lesson with Thais', 'It was a really good experience.']);
h(132, 'A change of heart during testimony', ['We had a lesson with Luciana', 'the Lord did His work.']);
h(133, 'Sueli’s answer about the Book of Mormon', ['She said she prayed and believes that the Book of Mormon is true,', 'I feel that she has a lot of humility.']);
h(135, 'Faith and support at Luana’s baptism', ['Luana arrived at church', 'I can’t seem to stop smiling at baptisms, I love it.']);
h(138, 'Courage, confirmation, and the words of Christ', ['Sueli and Natalia were baptized.', 'God gave us one miracle after another.']);
h(141, 'Fernanda’s dream answers her prayer', ['She told us about a sacred experience she had.', 'her and her Mom could be together again after this life.']);
h(141, 'Light, obedience, and the mind’s eye', ['I learned how light and truth work with the minds eye to enlighten the soul.', 'the presence of the Holy Ghost.']);
h(143, 'The Savior and angels at Fernanda’s baptism', ['Yesterday was the baptism of Fernanda.', 'best memories of my mission.']);
q(108, ['I know God has given me this challenge', 'let the Lord do His part in His time.']);
q(110, ['It was a taste of the pure love of Christ, that I could rejoice for someone I barely know.']);
q(111, ['Sometimes it’s easy to miss the miracles God is having you do because of doubt,', 'strengthened my faith.']);
q(111, ['My heart is settling in the right place, the Atonement will make up for the rest.']);
q(113, ['The Spirit World exists and their work needs to be done; they’re waiting.']);
q(117, ['An interesting thing happens to me at baptisms,', 'a glimpse of the Celestial Kingdom.']);
q(118, ['The Gifts of the Spirit are true.', 'with the aid of the Lord.']);
q(120, ['It’s always good to have the faith of priesthood holders united in the work of Christ.']);
q(123, ['I have a really strong desire to be a better missionary,', 'My soul hungers to make my weaknesses strengths.']);
q(123, ['I have no doubt that the restored Gospel is true,', 'I will do all in my power to keep His trust.']);
q(124, ['It’s amazing, the power of the atonement.', 'brought me so much joy.']);
q(129, ['you really have to prepare yourself', 'further develop the attributes of Christ.']);
q(129, ['Just like how we’re blind without physical light,', 'This removes darkness from the mind.']);
q(129, ['Virtue is the ability to constantly ponder like this to receive such light.']);
q(138, ['I know that he always fulfills his promises and that he hears and answers our prayers.']);
q(141, ['We know that light is gained thru obedience', 'the presence of the Holy Ghost.']);
q(141, ['Memorizing Scriptures truly sparks revelation and inspiration.']);
q(141, ['It’s truly amazing to me how the Lord answers our prayers in a way that is perfect for us, individually.']);
q(145, ['learning to love and learning to let go. Seem to be important lessons of Eternity.']);

// Entries 146–180.
h(146, 'An unexpected invitation fulfills a promise', ['Then as we were walking down the street a car passes us.', 'a fulfilling of our President’s promise.']);
h(150, 'A husband baptizes his wife', ['The baptism of Daiane was way powerful.', 'Salvation and eternal happiness.']);
h(153, 'Words given while teaching Catarina’s family', ['We did the 1st lesson and I felt the Spirit leading the whole time.'], ['It was a challenge offering all those blessings', 'It truly was a miracle.']);
h(168, 'A prompting while teaching the Word of Wisdom', ['Yesterday we taught the Word of Wisdom', 'He wants an answer.']);
h(172, 'Adair receives an answer while praying', ['We had a really good lesson with Adair', 'It was really spiritual.']);
h(177, 'Light during a home dedication', ['We also had a special visit with Dirce and Eva.', 'these experiences and eternal blessings.']);
h(178, 'Recognizing the Holy Ghost together', ['we just followed our impressions', 'We all recognized the Spirit together.'], ['This truly was an unforgettable experience.', 'gives me Grace in His hands.']);
h(179, 'Fátima’s powerful confirmation', ['The Miracle happened!', 'To help God’s children receive this testimony.']);
q(150, ['the plan truly is about families; it truly is about Salvation and eternal happiness.']);
q(157, ['I have a great and marvelous work ahead of me – I just need to stand firm with my foundation in Christ.']);
q(175, ['There’s always a plan greater than what we see.']);
q(178, ['The Book of Mormon is incredible.', 'teach principles is divine.']);
q(180, ['The priesthood is an amazing thing.', 'These are the keys to salvation.']);

// Entries 181–215.
h(181, 'Prayer and healing before baptism', ['Fátima and Natália were baptized.', 'Truly a miracle.']);
h(187, 'Coming to know the Holy Ghost', ['Yesterday we baptized João', 'I got to know Him better today.']);
h(189, 'Comfort and strength through a blessing', ['When we got home I asked Elder Barbosa to give me a blessing.', 'The spirit was strong.']);
h(193, 'Juliana’s experience during an ordination', ['We’ve been teaching Juliana.', 'I felt the Spirit strong as she told us about her experience.']);
h(195, 'A witness of a promise before this life', ['Teaching Juliana today,', 'the countless others that I am able to serve.']);
h(196, 'The forgiving power of the Atonement', ['My soul felt comforted today', 'little by little we are perfected in Him.']);
h(199, 'Filled with charity while teaching Juliana', ['We also had a really good lesson with Juliana today.', 'the Spirit working miracles through me.']);
h(201, 'Hope in Juliana’s eyes', ['Today was Juliana’s baptism.', 'The hand of God is mighty to save.']);
h(213, 'Guided to offer comfort through the Atonement', ['This morning Sister Yokoyama called really upset.', 'at least we had a few laughs.']);
h(213, 'Guided to a family ready to return', ['Today we also taught the family of Marcia,', 'following the Spirit.']);
h(215, 'The Spirit’s help in comforting Sister Barros', ['Sister Barros called tonight, sad.', 'this is an answer to my prayers.']);
q(183, ['He guides us, even when we don’t feel Him, because normally we only recognize afterwards.']);
q(187, ['It amazes me how we learn that the Holy Ghost IS a being, a person, not just a force. I got to know Him better today.']);
q(191, ['I don’t know why we felt so strong to work there if this was gonna happen, but I know that God will recompense our obedience.']);
q(196, ['The Lord gives us the trials we need to change our hearts – little by little we are perfected in Him.']);
q(197, ['It’s just a bit difficult to see how I can make a difference big enough to improve the state of things.', 'God has something in store, I’m sure.']);
q(198, ['It’s amazing how the Lord prepares miracles', 'it’s much better this way!']);
q(199, ['I’m so glad God is giving me these opportunities', 'the Spirit working miracles through me.']);
q(201, ['It’s amazing how God creates friendships and uses to do miracles. The hand of God is mighty to save.']);
q(213, ['everything can be corrected through the Atonement.']);
q(213, ['Worthiness is key to recognizing and following the Spirit.']);

// Entries 216–240. A religious word or a joking 'miracle' is not a selection criterion.
h(217, 'Communion with the Spirit changes desire', ['I felt really good today in the fast and testimony meeting.', 'life is so much better and happier!']);
h(221, 'A confirmation of a call to serve', ['The other day when I was praying,', 'I’m grateful for revelation.']);
h(222, 'Cidinha recognizes the Holy Ghost', ['we had an amazing lesson with a woman named Cidinha.', 'The power of the Holy Ghost truly is what converts.']);
h(223, 'Carol’s dream of Christ', ['yesterday we followed up with Mara and Carol.', 'What a blessing!']);
h(224, 'Sharing the Spirit through music', ['Yesterday Elder Swenson and I played a special musical number', 'It feels good to share it.']);
h(230, 'An unexpected encounter with Valdemar', ['On the Bus I did a contact', 'God truly guides us.']);
h(235, 'A witness that the spirit lives on', ['Aldo’s father passed away.', 'We are eternal beings!']);
h(238, 'God touches Takiuchi’s heart', ['In the afternoon I went with Junior to Takiuchi’s house', 'It really was a sacred experience between us.']);
h(239, 'Orlanda recognizes the right time', ['we were blessed with Orlanda’s baptism.', 'It was a really good experience.']);
q(216, ['It really is through service that our gifts grow with divine aid.']);
q(216, ['In the end, it all comes down to the good that we do for others.', 'I’m starting to recognize His love more fully.']);
q(217, ['When we sin we truly are left to ourselves', 'life is so much better and happier!']);
q(219, ['I’d like to think that each contact is a seed that a future missionary will reap.', 'What a blessing.']);
q(222, ['The power of the Holy Ghost truly is what converts.']);
q(222, ['But I believe in the Atonement and know that I can become who I want to be.', 'truly TRY to correct myself.']);
q(222, ['Worthyness and personal effort are so important to have the Spirit with us.']);
q(226, ['success as a missionary is determined by our DEDICATION']);
quotes.at(-1).attribution = 'Preach My Gospel, chapter 1, as recorded in the journal';
q(235, ['His spirit is still in tact. We are eternal beings!']);

// Entries 241–265.
h(241, 'Finding a family after fasting for guidance', ['We fasted today to be led to the people ready to accept the Gospel', 'teach them the restoration.']);
h(251, 'An answer to prayer for Tiago', ['We’d been working with Neide’s family', 'It was great.']);
h(260, 'Broken hearts and contrite spirits at baptism', ['We had the Baptism of Alessandro, Ana, and Demilson.'], ['Ana told us that she wanted to be baptized too, as a Surprise to Alessandro.', 'It was really Sweet.'], ['I had the privelege of baptizing the three of them.', 'I will do my best to honor the work that He is helping me do.']);
h(261, 'Elder Hunt’s words about a life of service', ['I bore mine about experiences between us and others', 'I really felt the Spirit.'], ['And then he told me that out of all the missionaries,', 'an impact like this in the lives of many.']);
h(262, 'Peace about an offering to the Lord', ['Today we went to the Temple. It was the last time I’ll go on the mission.'], ['It was good to see us all in the celestial room.'], ['We’re so much stronger now', 'the Lord is pleased with my work.']);
h(263, 'Following a simple prompting until the last moment', ['What was nice is that I was calm the whole time.', 'faith even until the last moment!”'], ['on the way I felt I should stop and ask some kids in the street if they knew him.', 'We got back to his house and he still wasn’t there.'], ['So, I just sat down in front of his house, prayed a little more, and waited.', 'walking down the street!'], ['I gave a “LIÇÃO DE FÉ” and thru the Spirit we got him back on board.'], ['We got to the chapel at 8 and the baptism happened.', 'the baptism might not of even happened!']);
q(257, ['Christ suffered for all our pains.'], ['imagine that moment when He took everything upon Him to pay Justice.', 'How hard it must have been...']);
q(260, ['The fruits of the mission are without number and eternal.', 'the love of God for ALL His Children.']);
q(261, ['serving others allows us to get to know Christ.']);
q(261, ['Sometimes we never know when people are observing us, or how they view us.']);
q(263, ['we have to have faith even until the last moment!']);
q(263, ['How cool to see the Spirit work thru a simple thought.', 'the baptism might not of even happened!']);
q(265, ['It has taught me to completely trust in God. Truly, everything works out when we trust His will.']);
q(265, ['I have felt the JOY that comes from dedicating ourselves to the Lord. It really is satisfying.']);
q(265, ['A confirmation of the Holy Ghost really is more powerful and more important than any miracle.']);
q(265, ['God truly consecrates our efforts to do great things – like an eternal snow ball effect.']);
q(265, ['I’ve felt the Power of Christ and His atonement.', 'It is everything.']);

// Keep reported teachings attributed; the original journal is the source of all wording.
for (const quote of quotes) {
  if (quote.entryId === 10 || quote.entryId === 24 || quote.entryId === 54) quote.attribution = 'Teaching of Irmão Gonçalves, as recorded in the journal';
  if (quote.entryId === 28) quote.attribution = 'Devotional teaching, as recorded in the journal';
  if (quote.entryId === 105 && quote.passages[0].startsWith('trust is')) quote.attribution = 'Counsel of President Castro Deus, as recorded in the journal';
}
assert(journal.length === 265, 'Journal source changed: review new or changed entries before regenerating these selections.');
const output = {
  reviewedEntryCount: journal.length,
  highlights: highlights.map((item, index) => ({ id: `highlight-${item.entryId}-${index + 1}`, ...item })),
  quotes: quotes.map((item, index) => ({ id: `quote-${item.entryId}-${index + 1}`, ...item })),
};
assert(![...highlights, ...quotes].some(item => item.passages.some(text => text.includes('We received all our books, planners, scriptures and started lessons.'))));
assert(quotes.find(item => item.entryId === 10).passages[0].startsWith('attaining perfection – it is a commandment.'));
assert(highlights.find(item => item.entryId === 143).passages.join(' ').includes('I felt that truly the Savior was there, then I felt that truly Angels were there.'));
fs.writeFileSync(new URL('../src/app/journal-selections.json', import.meta.url), JSON.stringify(output, null, 2) + '\n');
console.log(`Reviewed ${journal.length} entries; saved ${highlights.length} sacred experiences and ${quotes.length} insights. All excerpt anchors matched the source.`);

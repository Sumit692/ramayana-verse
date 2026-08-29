export interface Verse {
  sanskrit: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export interface KandTheme {
  title: string;
  description: string;
}

export interface Kand {
  id: string;
  name: string;
  title: string;
  translation: string;
  description: string;
  summary: string;
  moral: string;
  themeColor: string; // Tailwind gradient/css styles
  bgImage: string; // Gradient description
  keyEvents: string[];
  verses: Verse[];
  lessons: string[];
  themes?: KandTheme[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  role: 'divine' | 'royal' | 'vanara' | 'rakshasa' | 'sage';
  description: string;
  weapons: string[];
  powers: string[];
  personality: string[];
  family: {
    father?: string;
    mother?: string;
    spouse?: string;
    siblings?: string[];
    children?: string[];
  };
  quotes: { text: string; context: string }[];
  lessons: string[];
  allies: string[];
  enemies: string[];
  aestheticColor: string;
  biography?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  period: string;
  description: string;
  location: string;
  characters: string[];
  lesson: string;
  source: string;
}

export interface LocationDeepDive {
  geography: string;
  scriptureRef: string;
  legends: string;
  archaeology: string;
  spiritualTheme: string;
}

export interface JourneyLocation {
  id: string;
  name: string;
  description: string;
  coordinates: { x: number; y: number }; // SVG map percentages
  history: string;
  relatedEvents: string[];
  relatedCharacters: string[];
  quote: string;
  spiritualSignificance: string;
  imageAncient: string;
  imageModern: string;
  deepDive: LocationDeepDive;
}

export interface LibraryItem {
  id: string;
  name: string;
  category: 'weapons' | 'creatures' | 'festivals' | 'objects' | 'dynasties';
  description: string;
  significance: string;
  association: string;
}

export interface VersionDetail {
  name: string;
  author: string;
  period: string;
  language: string;
  focus: string;
  differences: {
    topic: string;
    narrative: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // Index of correct option
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'character' | 'timeline' | 'battle' | 'location' | 'weapon';
  questions: QuizQuestion[];
}

export const kands: Kand[] = [
  {
    id: 'bal-kand',
    name: 'Bal Kand',
    title: 'The Book of Youth',
    translation: 'Childhood & Early Adventures',
    description: `The birth of Lord Rama, his childhood, education, slaying of demons, and marriage to Sita.`,
    summary: `Bal Kand sets the divine stage for the incarnation of Lord Vishnu as Rama. In the city of Ayodhya, King Dasharatha, desiring heirs, conducts the sacred Putrakameshti Yajna under the guidance of Sage Rishyasringa. The fire deity grants divine payasam, which the king distributes to his queens—Kausalya, Kaikeyi, and Sumitra. Consequently, Rama, Bharata, Lakshmana, and Shatrughna are born. The princes grow up embodying distinct aspects of virtue and capability. In their youth, Sage Vishwamitra arrives in Ayodhya requesting Rama's protection to defend his holy rituals against the attacks of forest demons led by Tataka, Subahu, and Maricha. Reluctantly, King Dasharatha allows Rama and Lakshmana to accompany the sage. Vishwamitra trains the young princes in warfare and divine weaponry. Rama successfully slays the demoness Tataka and destroys the demonic hordes. During this journey, Rama also liberates Ahalya, who had been turned to stone by a curse, restoring her to life. Finally, Vishwamitra leads the princes to Mithila, ruled by King Janaka, where a Swayamvar is organized for Princess Sita. The challenge is to lift and string the ancient, heavy Pinaka bow of Lord Shiva. While numerous kings fail, Rama lifts the bow with ease, strings it, and breaks it in two, winning Sita's hand in marriage. The families unite, and the four brothers are married to Sita and her cousins in Mithila, returning to Ayodhya amidst grand celebrations.`,
    moral: `Righteousness (Dharma) begins with self-discipline, respect for gurus, and protecting the innocent.`,
    themeColor: 'from-amber-600 via-orange-500 to-yellow-400',
    bgImage: 'linear-gradient(to bottom, #d97706, #f97316, #facc15)',
    keyEvents: [
      `Putrakameshti Yajna by King Dasharatha`,
      `Birth of Rama, Lakshmana, Bharata, and Shatrughna`,
      `Grooming by Sage Vishwamitra`,
      `Slaying of demoness Tataka`,
      `Liberation of Ahalya`,
      `Sita Swayamvar: Breaking of Pinaka Bow`
    ],
    verses: [
      {
        sanskrit: 'तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम्। नारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम्॥',
        transliteration: 'tapaḥsvādhyāyanirataṁ tapasvī vāgvidāṁ varam | nāradaṁ paripapraccha vālmīkirmunipuṅgavam ||',
        translation: 'The sage Valmiki asked Narada, the preeminent among sages, who is ever devoted to penance and study of scriptures, and is the best among the eloquent.',
        reference: 'Valmiki Ramayana, 1.1.1'
      }
    ],
    lessons: [
      `Humility in learning: Princes leaving the palace to study under Sage Vishwamitra.`,
      `Courage: Confronting fearsome demons at a young age to protect spiritual practices.`,
      `Destiny and Grace: The divine union of Rama and Sita through spiritual excellence.`
    ],
    themes: [
      {
        title: `Dharma & Moral Duty`,
        description: `Emphasizes character building and respect for Gurus. The young princes leaving royal luxuries to protect the sage's sacrifices shows that the security and spiritual health of society override personal comfort.`
      },
      {
        title: `Spiritual Symbolism`,
        description: `Shiva's heavy bow represents the human ego. Slaying Tataka represents conquering primal fears, and breaking the bow symbolizes shattering the ego to unite with the divine intellect (Sita).`
      },
      {
        title: `Relationships & Loyalty`,
        description: `Establishes the early sibling bond of the four brothers. Lakshmana's voluntary commitment to serve Rama becomes the foundation of familial unity and selflessness.`
      }
    ]
  },
  {
    id: 'ayodhya-kand',
    name: 'Ayodhya Kand',
    title: 'The Book of Ayodhya',
    translation: 'Duty, Exile & Sorrow',
    description: `Preparations for Rama's coronation, Kaikeyi's demands, Dasharatha's grief, and Rama's exile to the forest.`,
    summary: `Ayodhya Kand focuses on human relationships, duty, and tragic conflicts. King Dasharatha, feeling age catching up to him, decides to crown Rama as the crown prince. The citizens of Ayodhya rejoice. However, Queen Kaikeyi's maid, Manthara, instills jealousy and fear in the queen's mind, convincing her that Rama's coronation would lead to the ruin of her own son, Bharata. Kaikeyi retreats to the anger chamber and demands two boons that Dasharatha had promised her years ago on a battlefield: that Bharata be crowned king, and that Rama be exiled to the Dandakaranya forest for 14 years. Bound by his word, a heartbroken Dasharatha yields. Rama accepts the decree with absolute serenity, placing his father's honor and truth above the crown. Despite Rama's pleas to stay behind, Sita and Lakshmana insist on accompanying him into exile. The trio departs Ayodhya, plunging the city into deep mourning. Unable to bear the grief of separation from his beloved son, King Dasharatha passes away. Bharata, who was away in Kekeya, returns to Ayodhya and is horrified by his mother's actions. He rejects the crown, performs the last rites of his father, and leads a delegation to the forest to bring Rama back. They meet at Chitrakoot, where Bharata pleads with Rama to return. Rama refuses, maintaining that they must fulfill their father's promise. Bharata accepts Rama's wooden sandals (Padukas) to place on the throne, swearing to rule as a mere regent from Nandigram until Rama's return.`,
    moral: `Loyalty to promises (Pitra Dharma) and maintaining composure (Stithaprajna) in the face of sudden adversity.`,
    themeColor: 'from-orange-700 via-red-600 to-amber-600',
    bgImage: 'linear-gradient(to bottom, #c2410c, #dc2626, #d97706)',
    keyEvents: [
      `Announcement of Rama's Coronation`,
      `Manthara's instigation of Kaikeyi`,
      `Kaikeyi's demands of two boons`,
      `King Dasharatha's heartbreak and death`,
      `Rama, Sita, and Lakshmana depart Ayodhya`,
      `Bharata's refusal of the throne and search for Rama at Chitrakoot`
    ],
    verses: [
      {
        sanskrit: 'धर्मो हि परमो लोके धर्मे सत्यं प्रतिष्ठितम्। धर्मसंश्रितमेतच्च पितुर्वचनमुत्तमम्॥',
        transliteration: 'dharmo hi paramo loke dharme satyaṁ pratiṣṭhitam | dharmasaṁśritametacca piturvacanamuttamam ||',
        translation: 'Righteousness is supreme in the world, and truth is established in righteousness. This great command of my father is founded on righteousness.',
        reference: 'Valmiki Ramayana, 2.21.41'
      }
    ],
    lessons: [
      `Composure: Rama reacts to exile with the same serenity as he did to coronation.`,
      `Selfless Duty: Lakshmana and Sita leaving luxury to stand by Rama.`,
      `Integrity: Bharata rejecting an unearned kingdom and keeping Rama's wooden sandals (Padukas) on the throne.`
    ],
    themes: [
      {
        title: `Duty over Desires`,
        description: `Exemplifies Pitra Dharma (duty to parents) and Satyavrata (commitment to truth). Rama willingly exchanges a royal crown for a simple hermit's garb to protect his father's word.`
      },
      {
        title: `The Danger of Toxic Influence`,
        description: `Manthara's manipulation of Queen Kaikeyi shows how easily a clean, loving mind can be poisoned by malicious counseling, leading to family breakdown and societal sorrow.`
      },
      {
        title: `Detachment & Leadership`,
        description: `Bharata's refusal to take the crown and his decision to rule using Rama's Padukas illustrates that leadership is a service, not a property to be seized.`
      }
    ]
  },
  {
    id: 'aranya-kand',
    name: 'Aranya Kand',
    title: 'The Book of the Forest',
    translation: 'Forest Hermitages & Abduction',
    description: `Life in the forest, encounters with sages, demon attacks, and the abduction of Sita by Ravana.`,
    summary: `Aranya Kand chronicles the forest years of Rama, Sita, and Lakshmana as they move deeper into the Dandakaranya forest. They visit various holy hermitages of sages like Atri, Anasuya, and Agastya, who bless them and seek their protection against the terror of demons (Rakshasas). Rama promises to rid the forest of evil forces. They settle in a beautiful valley called Panchavati on the banks of the Goavari River. One day, Surpanakha, a demoness and the sister of the demon king Ravana, encounters Rama and becomes infatuated with him. When Rama and Lakshmana reject her advances, she attempts to attack Sita. In response, Lakshmana cuts off her nose and ears. Disfigured and humiliated, she flees to her brothers Khara and Dushana, who attack Rama with an army of fourteen thousand demons. Rama single-handedly destroys the entire force. Surpanakha then rushes to Lanka and instigates Ravana, describing Sita's incomparable beauty and urging him to abduct her. Ravana plans a plot. He forces the demon Maricha to disguise himself as an exquisite golden deer. Sita, captivated by the deer, begs Rama to capture it. Rama pursues the deer, and when struck by Rama's arrow, Maricha calls out for help in Rama's voice. Tricked by the cry, Sita sends a reluctant Lakshmana to help. Leaving Sita alone, Lakshmana draws a protective line (Lakshmana Rekha) around the hut. Ravana arrives disguised as a mendicant, coaxes Sita to cross the line to offer alms, and abducts her. The vulture king Jatayu fights Ravana to rescue Sita but is fatally wounded. Ravana carries Sita to Lanka and imprisons her in the Ashok Vatika. Rama and Lakshmana return, find the hut empty, and begin a desperate search.`,
    moral: `Every illusion (the Golden Deer) has a cost, and standing up against evil (Jatayu's fight) is a duty regardless of the outcome.`,
    themeColor: 'from-emerald-800 via-green-700 to-teal-800',
    bgImage: 'linear-gradient(to bottom, #064e3b, #15803d, #115e59)',
    keyEvents: [
      `Settling in Panchavati forest`,
      `Surpanakha's advances and mutilation`,
      `Slaying of Khara and Dushana's army`,
      `The Golden Deer (Maricha's disguise)`,
      `Sita's Abduction by Ravana`,
      `Jatayu's heroic battle and sacrifice`
    ],
    verses: [
      {
        sanskrit: 'न हि पापं कृतं कर्म सद्यः फलति गौरिव। शनैरावर्तमानं तु मूलान्युत्कृन्तति द्वेषिणः॥',
        transliteration: 'na hi pāpaṁ kṛtaṁ karma sadyaḥ phalati gauriva | śanairāvartamānaṁ tu mūlānyutkṛntati dveṣiṇaḥ ||',
        translation: 'A sinful act does not bear fruit immediately, like a cow yielding milk. But revolving slowly, it cuts off the roots of the sinner.',
        reference: 'Valmiki Ramayana, 3.29.8'
      }
    ],
    lessons: [
      `Resisting temptation: Mindful awareness against superficial desires (represented by the golden deer).`,
      `Sacrifice: Jatayu sacrificing his life to save another.`,
      `Devotion: Shabari's pure love and patience waiting for Lord Rama.`
    ],
    themes: [
      {
        title: `Illusion and Desire (Maya)`,
        description: `The golden deer represents Maya (illusion) and materialistic temptation. Chasing superficial desires distracts the mind from inner peace, causing separation from the divine.`
      },
      {
        title: `Valor in Defeat`,
        description: `Jatayu's battle represents standing up for the vulnerable even when victory is impossible. Rama honors Jatayu by performing his final rites, showing that righteousness is valued by intent, not success.`
      },
      {
        title: `Devotion and Inclusivity`,
        description: `Rama's meeting with Shabari, an elderly tribal woman who waited decades for him, breaks all social and caste boundaries. Eating her half-eaten tasted berries shows that God values simple, pure devotion above all.`
      }
    ]
  },
  {
    id: 'kishkindha-kand',
    name: 'Kishkindha Kand',
    title: 'The Book of Kishkindha',
    translation: 'Alliance of the Monkeys',
    description: `Rama meets Hanuman, forms an alliance with Sugriva, slays Bali, and prepares the search party.`,
    summary: `Set in the rugged monkey kingdom of Kishkindha, this Kand narrates the formation of the divine alliance. Rama and Lakshmana, searching for Sita, arrive at the Pampa Lake and head towards Rishyamukha Hill. Sugriva, an exiled monkey prince fearing his powerful brother Bali, spots them and sends his loyal minister, Hanuman, to investigate. Hanuman approaches in disguise, but upon speaking with Rama, recognizes his divine lord and surrenders in devotion. Hanuman introduces the brothers to Sugriva. Rama and Sugriva strike an alliance over fire. Rama promises to help Sugriva regain his kingdom and free his wife Ruma from the tyrannical Bali. In return, Sugriva promises to use his vast monkey forces to locate Sita. Rama slays Bali from behind a tree, an act necessary because Bali possessed a boon allowing him to absorb half the strength of anyone who faced him directly. Sugriva is crowned king of Kishkindha. However, Sugriva becomes distracted by royal pleasures, forgetting his promise. Lakshmana marches to the capital in anger, prompting Sugriva to apologize and mobilize the Vanara army. Sugriva sends search parties in all four directions. The southern party, led by Angada, Hanuman, and the wise bear king Jambavan, reaches the shore of the southern ocean. Feeling despondent about crossing the vast waters, they meet Sampati, the elder brother of Jatayu, who informs them that Sita is held in Lanka, 100 yojanas across the sea. Jambavan then reminds a silent Hanuman of his divine lineage and dormant powers, preparing him for the epic leap.`,
    moral: `True friendship is mutually supportive, and latent strength (Hanuman's power) is awakened through spiritual reminders.`,
    themeColor: 'from-amber-700 via-yellow-600 to-orange-700',
    bgImage: 'linear-gradient(to bottom, #b45309, #ca8a04, #c2410c)',
    keyEvents: [
      `Rama's meet with Hanuman at Rishyamukha Hill`,
      `Alliance with Sugriva`,
      `Slaying of Bali by Rama`,
      `Sugriva's coronation and delayed promise`,
      `Sending searching groups to the four directions`,
      `Jambavan awakening Hanuman's forgotten powers`
    ],
    verses: [
      {
        sanskrit: 'उत्साहो बलवानार्य नास्त्युत्साहात्परं बलम्। सोत्साहस्य च लोकेषु न किञ्चिदपि दुर्लभम्॥',
        transliteration: 'utsāho balavānārya nāstyutsāhātparaṁ balam | sotsāhasya ca lokeṣu no kiñcidapi durlabham ||',
        translation: 'Enthusiasm is indeed powerful, O Noble One! There is no force superior to enthusiasm. To an enthusiastic person, nothing is impossible in this world.',
        reference: 'Valmiki Ramayana, 4.1.121'
      }
    ],
    lessons: [
      `Loyalty and Gratitude: Keeping promises made during tough times.`,
      `Self-discovery: We all have dormant potential (like Hanuman) that requires divine guidance to activate.`,
      `Justice: Balancing individual errors with larger collective duties.`
    ],
    themes: [
      {
        title: `Strategic Friendship`,
        description: `Examines the ethics of friendship (Mitra Dharma). Sugriva and Rama help each other overcome personal losses, demonstrating that mutual support is crucial in battling large obstacles.`
      },
      {
        title: `Awakening Potential`,
        description: `Jambavan's role in reminding Hanuman of his powers shows the importance of mentorship. Often, individuals possess immense potential but need the guidance of a wise elder to discover it.`
      },
      {
        title: `The Restless Mind`,
        description: `The Vanaras (literally forest dwellers) symbolize the restless, active human senses. Directed by Hanuman (Prana/Breath) and aligned with Rama (Soul), these wild forces become channelized for a divine purpose.`
      }
    ]
  },
  {
    id: 'sundara-kand',
    name: 'Sundara Kand',
    title: 'The Beautiful Book',
    translation: "Hanuman's Devotion & Triumph",
    description: `Hanuman's leap across the ocean, discovery of Sita in Ashoka Vatika, meeting her, and burning of Lanka.`,
    summary: `Sundara Kand is the emotional and heroic core of the epic. Named "Sundara" (beautiful) after Hanuman's childhood nickname, it focuses on Hanuman's solo mission. Resolving to find Sita, Hanuman expands his body and leaps across the sea. He overcomes obstacles like Mainaka mountain, Surasa (the mother of serpents), and the demoness Simhika. Upon entering Lanka, he shrinks in size to search the city. Eventually, he finds Sita in the Ashok Vatika garden, surrounded by tormenting demonesses. She looks gaunt but remains firm in her devotion to Rama, rejecting Ravana's threats. Hanuman climbs a tree and sings Rama's praises to gain her trust, then drops Rama's signet ring. Overjoyed, Sita recognizes him as Rama's messenger. Hanuman offers to carry her back, but she refuses, stating that it is Rama's duty to defeat Ravana and rescue her honorably. Hanuman decides to test Lanka's defenses. He destroys the royal orchards, slays several demon warriors (including Ravana's son Aksha Kumar), and allows himself to be captured by Indrajit's Brahmastra to meet Ravana. In the court, Hanuman advises Ravana to return Sita and seek Rama's pardon. Enraged, Ravana orders Hanuman's tail to be set on fire. Hanuman escapes, leaps from rooftop to rooftop, and sets Lanka ablaze, sparing only Ashok Vatika. He plunges into the sea to extinguish his tail, bids farewell to Sita, receives her Chudamani (hair ornament) as a token of discovery, and flies back to Rama with the reassuring news: "Sita has been found."`,
    moral: `Unflinching faith, intellectual brilliance, and single-minded focus can conquer the widest oceans.`,
    themeColor: 'from-blue-700 via-indigo-600 to-purple-800',
    bgImage: 'linear-gradient(to bottom, #1d4ed8, #4f46e5, #581c87)',
    keyEvents: [
      `Hanuman's epic leap across the ocean`,
      `Overcoming Surasa and Simhika`,
      `Entry into Lanka and finding Sita in Ashoka Vatika`,
      `Exchanging Rama's signet ring and Chudamani`,
      `Destruction of Ashoka Vatika and killing of Aksha Kumar`,
      `Confrontation with Ravana and the burning of Lanka`
    ],
    verses: [
      {
        sanskrit: 'नमोऽस्तु रामाय सलक्ष्मणाय देव्यै च तस्यै जनकात्मजायै। नमोऽस्तु रुद्रेन्द्रयमानिलेभ्यो नमोऽस्तु चन्द्रार्कमरुद्गणेभ्यः॥',
        transliteration: "namo'stu rāmāya salakṣmaṇāya devyai ca tasyai janakātmajāyai | namo'stu rudrendrayamānilebhyo namo'stu candrārkamarudgaṇebhyaḥ ||",
        translation: 'Salutations to Rama along with Lakshmana, and to the divine daughter of Janaka (Sita). Salutations to Rudra, Indra, Yama, and Vayu. Salutations to Moon, Sun, and Maruts.',
        reference: 'Valmiki Ramayana, 5.13.59'
      }
    ],
    lessons: [
      `Intellect & Grace: Balancing raw power with polite speech and strategic thinking.`,
      `Chastity and Resiliency: Sita resisting Ravana's temptations and threats.`,
      `Humility in Triumph: Hanuman attributing his success entirely to Lord Rama.`
    ],
    themes: [
      {
        title: `Seva Dharma (Service)`,
        description: `Hanuman represents the pinnacle of selfless service. He crosses the ocean, fights battles, and advises kings, yet attributes every success to Rama's grace rather than his own power.`
      },
      {
        title: `The Trapped Soul`,
        description: `Sita represents the Jivatma (individual soul) trapped in Lanka (the material body/world). Hanuman represents the Guru who brings the message of hope and the ring of wisdom from the Paramatma (Supreme Soul, Rama).`
      },
      {
        title: `Mental Strength (Resilience)`,
        description: `Sita's refusal to yield to Ravana's wealth and power illustrates the strength of character. Her resolve shows that inner dignity cannot be taken away by external circumstances.`
      }
    ]
  },
  {
    id: 'yuddha-kand',
    name: 'Yuddha Kand',
    title: 'The Book of War',
    translation: 'Bridge, Siege & Victory',
    description: `Building of Rama Setu, siege of Lanka, fierce battles, slaying of Ravana, and coronation of Rama.`,
    summary: `Yuddha Kand is the longest and most dramatic book of the epic. It chronicles the siege of Lanka. Hearing Hanuman's report, Rama leads the Vanara army to the ocean. Vibhishana, advising his brother Ravana to return Sita, is kicked out of Lanka and seeks refuge with Rama. Rama welcomes him, declaring that he will protect anyone who surrenders. To cross the sea, the Vanaras build the Rama Setu, a bridge of floating stones, engineered by Nala and Nila. The army crosses and encamps outside Lanka. Rama sends Angada as a final peace envoy, but Ravana refuses to surrender, launching the war. A series of fierce battles ensue. Lakshmana is gravely wounded by Meghnad's Shakti arrow, but Hanuman flies to the Himalayas and brings back the entire Drona hill containing Sanjeevani herbs to save him. Lakshmana kills Meghnad, and Rama destroys the massive Kumbhakarna. Finally, Rama and Ravana meet in a final duel. Supported by Indra's chariot, Rama fights Ravana, ultimately slicing his heads repeatedly. Guided by Vibhishana, Rama shoots his arrow into Ravana's navel, destroying the demon king. Sita is freed, but to establish her purity to the world, she undergoes the Agni Pariksha, walking through fire unharmed. Vibhishana is crowned king of Lanka. The 14-year exile ends, and Rama, Sita, and Lakshmana return to Ayodhya on the Pushpaka Vimana. The citizens light thousands of clay lamps (marking the first Diwali) to welcome them, and Rama is crowned King, beginning the golden era of Ramrajya.`,
    moral: `Good inevitably triumphs over evil, but victory requires order, sacrifice, and absolute devotion to righteous conduct.`,
    themeColor: 'from-red-800 via-rose-700 to-orange-600',
    bgImage: 'linear-gradient(to bottom, #991b1b, #be123c, #ea580c)',
    keyEvents: [
      `Vibhishana's surrender and refuge`,
      `Building of the Rama Setu bridge`,
      `The siege of Lanka and emissary Angada's mission`,
      `Fierce battles: Lakshmana vs. Indrajit, Rama vs. Kumbhakarna`,
      `Slaying of Ravana by Lord Rama using Brahmastra`,
      `Sita's Agni Pariksha and return to Ayodhya on Pushpaka Vimana`
    ],
    verses: [
      {
        sanskrit: 'सकृदेव प्रपन्नाय तवास्मीति च याचते। अभयं सर्वभूतेभ्यो ददाम्येतद्व्रतं मम॥',
        transliteration: "sakṛdeva prapannāya tavāsmीti ca yācate | abhayaṁ sarvabhūtebyo dadāmyetadvratam mama ||",
        translation: 'To anyone who surrenders to Me even once, saying "I am Yours" and seeking protection, I grant absolute fearlessness from all beings. This is My eternal vow.',
        reference: 'Valmiki Ramayana, 6.18.33'
      }
    ],
    lessons: [
      `Compassion: Rama forgiving Vibhishana and Ravana at the moment of death.`,
      `Equality: Building the bridge with monkeys, squirrels, and kings working together.`,
      `Devotion to values: Protecting righteousness even at great personal cost.`
    ],
    themes: [
      {
        title: `Triumph over Ego`,
        description: `Ravana's ten heads represent the ten human vices (lust, anger, greed, ego, jealousy, pride, etc.). Slaying Ravana symbolizes the triumph of the higher self over the lower animal nature.`
      },
      {
        title: `Unconditional Refuge (Sharanagati)`,
        description: `Rama welcoming Vibhishana, despite him being the brother of his mortal enemy, establishes the principle of Sharanagati—that anyone who sincerely seeks shelter will be protected, regardless of background.`
      },
      {
        title: `Cooperation & Faith`,
        description: `Building the Rama Setu bridge represents collective effort. Monkeys, bears, and even a tiny squirrel contribute, showing that when a community works with faith, impossible barriers can be crossed.`
      }
    ]
  },
  {
    id: 'uttara-kand',
    name: 'Uttara Kand',
    title: 'Uttara Kand',
    translation: 'Reign, Separation & Ascension',
    description: `Life after coronation, exile of Sita, birth of Luv and Kush, and Rama's final departure.`,
    summary: `Uttara Kand is the final, reflective book. Rama rules Ayodhya with absolute justice, creating an era of peace and prosperity. However, some citizens raise doubts about Sita's purity due to her long imprisonment in Lanka. Prioritizing his duty as a king (Raja Dharma) to maintain public trust and moral order above his personal happiness, Rama makes the painful decision to banish Sita. Lakshmana leaves her near the ashram of Sage Valmiki, where she is taken in. She gives birth to twin sons, Luv and Kush, who are raised in the forest, learning the holy scriptures and the art of warfare. Valmiki composes the Ramayana and teaches it to the young twins. Years later, Rama conducts an Ashvamedha Yajna. Luv and Kush arrive in Ayodhya, singing the verses of the Ramayana in the streets and the royal court, narrating Rama's life and Sita's sacrifices. Rama recognizes them as his sons. Sita is summoned to the court, but she decides her earthly mission is complete. She calls upon Mother Earth (Bhumidevi) to receive her, and the earth splits open, taking Sita in. Heartbroken, Rama decides to conclude his earthly manifestations. He divides the kingdom among his sons and brothers, walks into the sacred Sarayu River, and ascends back to his eternal cosmic form of Lord Vishnu, concluding the divine play.`,
    moral: `The path of a leader (Raja Dharma) is filled with immense personal sacrifice for collective order.`,
    themeColor: 'from-slate-800 via-zinc-700 to-stone-900',
    bgImage: 'linear-gradient(to bottom, #1e293b, #3f3f46, #1c1917)',
    keyEvents: [
      `The Golden Era of Rama's rule (Ramrajya)`,
      `Banishment of Sita to Sage Valmiki's ashram`,
      `Birth of Luv and Kush and learning of Ramayana`,
      `Luv and Kush reciting Ramayana before Rama`,
      `Sita's final return to Mother Earth (Bhumidevi)`,
      `Lord Rama's final ascension and departure from Sarayu`
    ],
    verses: [
      {
        sanskrit: 'न काङ्क्षे विजयं कृष्ण न च राज्यं सुखानि च। (adapted concept of Lokasangraha / Sacrifice)',
        transliteration: 'loka rañjanam eva rājñaḥ prathamo dharmaḥ',
        translation: 'To keep the citizens happy and united is the primary duty of a righteous king.',
        reference: 'Uttara Kand, Epilogue'
      }
    ],
    lessons: [
      `Sacrifice: Letting go of personal happiness to fulfill institutional duties.`,
      `Art as a Teacher: Luv and Kush using music and poetry to teach Ayodhya its own lessons.`,
      `Ascension: Realizing that physical life is temporary, and values are immortal.`
    ],
    themes: [
      {
        title: `The Burden of Leadership`,
        description: `Examines the sacrifices of public office. Rama banishing his beloved wife Sita shows that a ruler must sometimes place public trust and social unity above personal desires.`
      },
      {
        title: `Earthly Disillusionment`,
        description: `Sita returning to Mother Earth symbolizes the ultimate return of our elements. It shows that after fulfilling one's duties, one must gracefully detach from the material plane.`
      },
      {
        title: `Legacy and Oral Tradition`,
        description: `Luv and Kush singing the Ramayana before Rama shows the power of storytelling. The epic is not just history, but a living moral mirror that preserves righteousness across generations.`
      }
    ]
  }
];


export const characters: Character[] = [
  {
    id: 'rama',
    name: 'Rama',
    title: 'Maryada Purushottama',
    role: 'divine',
    description: 'The seventh avatar of Lord Vishnu, prince of Ayodhya, and the ultimate embodiment of Dharma (righteousness).',
    weapons: ['Kodanda Bow', 'Sharanga Bow', 'Brahmastra'],
    powers: ['Divine archery', 'Fearlessness', 'Supernatural focus', 'Universal charisma'],
    personality: ['Serene', 'Compassionate', 'Duty-bound', 'Unshakable', 'Forgiving'],
    family: {
      father: 'Dasharatha',
      mother: 'Kausalya',
      spouse: 'Sita',
      siblings: ['Lakshmana', 'Bharata', 'Shatrughna'],
      children: ['Luv', 'Kush']
    },
    quotes: [
      {
        text: 'जननी जन्मभूमिश्च स्वर्गादपि गरीयसी।',
        context: 'To Lakshmana, stating that Mother and Motherland are superior even to Heaven.'
      },
      {
        text: 'To anyone who surrenders to me even once... I grant absolute fearlessness.',
        context: 'Accepting Vibhishana into his camp despite suspicions of others.'
      }
    ],
    lessons: [
      'Remain calm and tranquil during sudden trials (exile).',
      'Do not cross boundaries (Maryada) of conduct even when facing enemies.',
      'Treat every being (Nishadraj Guha, Jatayu, Shabari, monkeys) with equal respect.'
    ],
    allies: ['Lakshmana', 'Hanuman', 'Sita', 'Sugriva', 'Vibhishana', 'Jambavan'],
    enemies: ['Ravana', 'Kumbhakarna', 'Indrajit', 'Tataka', 'Khara'],
    biography: `Lord Rama is the eighth avatar of Lord Vishnu, born as the eldest son of King Dasharatha and Queen Kausalya of Ayodhya. Known as Maryada Purushottama, he represents the pinnacle of righteousness, duty, and moral perfection. His life is an epic demonstration of adherence to Dharma under the most testing conditions. When banished to a 14-year forest exile on the eve of his coronation, Rama accepted the decree with serenity to protect his father's honor. In the forest, he protected sages, defeated legions of demons, and eventually fought a massive war in Lanka to rescue his abducted wife, Sita. Rama's rule, known as Ramrajya, remains the eternal benchmark of absolute justice, prosperity, and peace.`,
    aestheticColor: 'rgba(217, 119, 6, 0.15)' // gold aura
  },
  {
    id: 'sita',
    name: 'Sita',
    title: 'Daughter of Earth',
    role: 'divine',
    description: 'The incarnation of Goddess Lakshmi, princess of Mithila, adopted daughter of King Janaka, and symbol of absolute purity, strength, and devotion.',
    weapons: ['Spiritual Aura', 'Grass blade (used to ward off Ravana\'s advances)'],
    powers: ['Earth manipulation (birth-right)', 'Immunity to fire (Agni-proof)', 'Unmatched mental strength'],
    personality: ['Graceful', 'Resilient', 'Uncompromising', 'Dignified', 'Devoted'],
    family: {
      father: 'Janaka',
      mother: 'Sunayana',
      spouse: 'Rama',
      children: ['Luv', 'Kush']
    },
    quotes: [
      {
        text: 'As shadow follows the body, so will I follow you to the forest.',
        context: 'Convincing Rama to let her accompany him into exile.'
      }
    ],
    lessons: [
      'True wealth lies in character, not in physical palaces or golden deer.',
      'Outer captivity cannot chain an inner free spirit.',
      'Dignity and self-respect are non-negotiable.'
    ],
    allies: ['Rama', 'Lakshmana', 'Hanuman', 'Trijata'],
    enemies: ['Ravana', 'Surpanakha'],
    biography: `Sita is the incarnation of Goddess Lakshmi, found in a furrow of a ploughed field by King Janaka of Mithila, who raised her as his daughter. She married Rama after he broke Lord Shiva's Pinaka bow. Sita represents the ultimate ideals of purity, resilience, and inner strength. She voluntarily accompanied Rama into exile, choosing the harsh forest over royal comforts. Even when abducted by Ravana and kept in captivity in Lanka's Ashok Vatika, she maintained absolute dignity, rejecting all temptations and threats. Her character illustrates that true strength is quiet and unyielding, and her final return to Mother Earth represents the ultimate return to natural purity.`,
    aestheticColor: 'rgba(16, 185, 129, 0.15)' // emerald green
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    title: 'Anjaneya & Sankat Mochan',
    role: 'vanara',
    description: 'The son of Anjana and Vayu (the Wind God), Sugriva\'s minister, and the greatest devotee of Lord Rama, embodying strength, wisdom, and humility.',
    weapons: ['Gada (Mace)', 'Claws', 'Mountains'],
    powers: ['Shape-shifting (Anima/Garima)', 'Flight', 'Immortal (Chiranjeevi)', 'Incredible speed', 'Immense strength'],
    personality: ['Humble', 'Intellectual', 'Selfless', 'Playful', 'Vigilant'],
    family: {
      father: 'Kesari / Vayu (spiritual father)',
      mother: 'Anjana'
    },
    quotes: [
      {
        text: 'I am a humble messenger of Shri Rama. My strength belongs only to him.',
        context: 'Addressing Ravana\'s court after his tail was set on fire.'
      }
    ],
    lessons: [
      'Great strength must always be balanced with deep humility.',
      'Focusing on a higher purpose (Rama) dissolves all personal obstacles.',
      'Doubt is eliminated by service and active action.'
    ],
    allies: ['Rama', 'Lakshmana', 'Sita', 'Sugriva', 'Angada', 'Jambavan'],
    enemies: ['Ravana', 'Indrajit', 'Simhika', 'Kalanemi'],
    biography: `Hanuman is the monkey deity born of Anjana and Kesari, blessed by Vayu, the Wind God. He represents absolute devotion, selfless service, and unmatched physical and spiritual strength. In Kishkindha, he recognized Rama as his divine lord and dedicated his life to his service. Hanuman took a historic leap across the ocean to find Sita in Lanka, giving her hope and burning down the city of Lanka to challenge Ravana. During the war, he brought the Sanjeevani herb by lifting the entire Drona mountain to save Lakshmana's life. Despite his supernatural powers, Hanuman remains the embodiment of humility, attributing all his deeds to Rama's grace.`,
    aestheticColor: 'rgba(239, 68, 68, 0.15)' // crimson red glow
  },
  {
    id: 'ravana',
    name: 'Ravana',
    title: 'Dashanan (Ten-Headed King)',
    role: 'rakshasa',
    description: 'The king of Lanka, a great scholar of Vedas, master of music (Veena), supreme devotee of Lord Shiva, but blinded by ego and lust.',
    weapons: ['Chandrahas Sword', 'Bow of Death', 'Dark Magic'],
    powers: ['Boons of invincibility against gods', 'Great intellect (ten heads)', 'Astral projection'],
    personality: ['Arrogant', 'Possessive', 'Highly intellectual', 'Tyrannical', 'Stubborn'],
    family: {
      father: 'Vishrava',
      mother: 'Kaikesi',
      spouse: 'Mandodari',
      siblings: ['Kumbhakarna', 'Vibhishana', 'Surpanakha'],
      children: ['Indrajit', 'Aksha Kumar', 'Trishira']
    },
    quotes: [
      {
        text: 'Even the gods bow to Lanka. Rama is but a mortal wandering in rags.',
        context: 'Boasting to his ministers who advised peace with Rama.'
      }
    ],
    lessons: [
      'Intellect and scholarship are destructive if not anchored in morals.',
      'Ego (represented by ten heads of desires) leads to self-destruction.',
      'Ignoring wise counsel (Mandodari and Vibhishana) guarantees failure.'
    ],
    allies: ['Kumbhakarna', 'Indrajit', 'Prahasta'],
    enemies: ['Rama', 'Lakshmana', 'Hanuman', 'Sugriva', 'Vibhishana'],
    biography: `Ravana was the powerful demon king of Lanka. Born to the sage Vishrava and Kaikesi, he was an extraordinary scholar of the Vedas, a master musician of the Veena, and a supreme devotee of Lord Shiva. Having secured boons of invincibility from Lord Brahma, Ravana conquered the heavens and ruled Lanka with unmatched splendor. However, his high intellect was corrupted by intense ego, pride, and lust. His abduction of Sita led to his downfall. Despite warnings from his wise wife Mandodari and brother Vibhishana, Ravana chose the path of arrogance, leading to the destruction of his dynasty and his own death at the hands of Lord Rama.`,
    aestheticColor: 'rgba(99, 102, 241, 0.15)' // royal indigo/blue shadow
  },
  {
    id: 'lakshmana',
    name: 'Lakshmana',
    title: 'The Incarnation of Shesha',
    role: 'royal',
    description: 'Rama\'s younger brother, the epitome of selfless service, loyalty, and protection, who accompanied Rama during his 14 years of exile.',
    weapons: ['Bow of Lakshmana', 'Divine Arrows'],
    powers: ['Unmatched archery speed', 'Sleepless state (Nidradevi boon)', 'Furious warrior focus'],
    personality: ['Loyal', 'Fiery', 'Protective', 'Impulsive', 'Duty-bound'],
    family: {
      father: 'Dasharatha',
      mother: 'Sumitra',
      spouse: 'Urmila',
      siblings: ['Rama', 'Bharata', 'Shatrughna']
    },
    quotes: [
      {
        text: 'My duty is to follow the footsteps of my brother, Rama. The forest is my palace.',
        context: 'Insisting on accompanying Rama to exile.'
      }
    ],
    lessons: [
      'Selfless service (Seva Dharma) and absolute devotion to family overrides personal comfort.',
      'Vigilance is necessary to protect what is sacred from negative influences.'
    ],
    allies: ['Rama', 'Sita', 'Hanuman', 'Sugriva'],
    enemies: ['Ravana', 'Indrajit', 'Surpanakha'],
    biography: `Lakshmana is Rama's younger brother, born to Queen Sumitra. He is the incarnation of the cosmic serpent Adisesha, representing loyalty, protection, and tireless service. Lakshmana chose to accompany Rama and Sita into exile, staying awake for fourteen years to guard them. He represents fiery devotion and immediate action against injustice. Lakshmana fought valiantly in the war of Lanka, defeating Ravana's powerful son Indrajit (Meghnad) after surviving a near-fatal wound from the Shakti arrow.`,
    aestheticColor: 'rgba(242, 123, 33, 0.15)' // warm orange
  },
  {
    id: 'dasharatha',
    name: 'Dasharatha',
    title: 'King of Kosala',
    role: 'royal',
    description: 'The righteous king of Ayodhya, father of Rama, who tragically passed away due to the grief of parting with his beloved son.',
    weapons: ['Chariot of Ten Directions', 'Royal Swords'],
    powers: ['Chariot mastery across sky and earth', 'Vedic warfare knowledge'],
    personality: ['Righteous', 'Generous', 'Tragic', 'Promise-keeping'],
    family: {
      father: 'Aja',
      mother: 'Indumati',
      spouse: 'Kausalya, Kaikeyi, Sumitra',
      children: ['Rama', 'Lakshmana', 'Bharata', 'Shatrughna']
    },
    quotes: [
      {
        text: 'Rama is my life itself. If he departs, my breath shall follow.',
        context: 'Pleading with Kaikeyi to spare Rama from exile.'
      }
    ],
    lessons: [
      'Words once spoken (Vachan) must be kept, even if the cost is personal heartbreak.'
    ],
    allies: ['Rama', 'Vashistha', 'Janaka', 'Jatayu'],
    enemies: ['Sambasura'],
    biography: `Dasharatha was the King of Ayodhya and the ruler of the Kosala Kingdom, belonging to the Solar Dynasty. Known for his valor and administrative wisdom, he was a righteous king who loved his eldest son Rama deeply. However, his past promise of two boons to Queen Kaikeyi became his tragic undoing. When forced to choose between his beloved son and his truth, Dasharatha chose the path of truth, exiling Rama. He passed away from the sheer grief of separation, symbolizing the high cost of keeping one's commitments.`,
    aestheticColor: 'rgba(120, 110, 90, 0.15)' // stone gray
  },
  {
    id: 'kaikeyi',
    name: 'Kaikeyi',
    title: 'The Queen of Boons',
    role: 'royal',
    description: 'King Dasharatha\'s favorite queen, mother of Bharata, whose mind was poisoned by her maid Manthara, leading to Rama\'s exile.',
    weapons: ['Political Influence', 'Boons of Dasharatha'],
    powers: ['Chariot driver in battle (saved Dasharatha\'s life)'],
    personality: ['Impulsive', 'Possessive', 'Tragically manipulated', 'Regretful'],
    family: {
      spouse: 'Dasharatha',
      children: ['Bharata']
    },
    quotes: [
      {
        text: 'Rama must go to the forest, and Bharata must rule Ayodhya.',
        context: 'Demanding the two boons from King Dasharatha.'
      }
    ],
    lessons: [
      'Guard your mind against toxic counsel (represented by Manthara), which can destroy your own family.'
    ],
    allies: ['Manthara'],
    enemies: ['Rama', 'Lakshmana', 'Sita'],
    biography: `Kaikeyi was the youngest queen of King Dasharatha and the princess of Kekeya. Originally a brave warrior queen who once saved Dasharatha's life on the battlefield, she loved Rama like her own son. However, her maid Manthara poisoned her mind, creating fear that Rama's coronation would lead to her and Bharata's exile. Influenced by this toxic counsel, Kaikeyi demanded the exiling of Rama and the crowning of Bharata, causing the king's death and receiving the eternal scorn of history, though she later deeply repented.`,
    aestheticColor: 'rgba(180, 50, 50, 0.15)' // crimson red shadow
  },
  {
    id: 'bharata',
    name: 'Bharata',
    title: 'Embodiment of Selflessness',
    role: 'royal',
    description: 'Rama\'s younger brother, who rejected the crown obtained through his mother Kaikeyi\'s devious demands, ruling Ayodhya as Rama\'s regent.',
    weapons: ['Sword of Justice', 'Bow of Kosala'],
    powers: ['Administration excellence', 'Spiritual detachment'],
    personality: ['Noble', 'Selfless', 'Humble', 'Sorrowful'],
    family: {
      father: 'Dasharatha',
      mother: 'Kaikeyi',
      spouse: 'Mandavi',
      siblings: ['Rama', 'Lakshmana', 'Shatrughna']
    },
    quotes: [
      {
        text: 'This kingdom belongs to Rama. I shall only manage it as his caretaker, placing his Padukas on the throne.',
        context: 'Rejecting the crown and setting up the regency at Nandigram.'
      }
    ],
    lessons: [
      'Power and position must be rejected if they are obtained through unrighteous (Adharmic) means.'
    ],
    allies: ['Rama', 'Lakshmana', 'Shatrughna', 'Vashistha'],
    enemies: [],
    biography: `Bharata is Rama's younger brother, born to Queen Kaikeyi. He is the epitome of sibling love, integrity, and absolute detachment. When he returned to Ayodhya and discovered his mother's role in Rama's exile, he rejected the throne and Kaikeyi. He walked to Chitrakoot to plead with Rama to return. When Rama refused, Bharata took Rama's wooden sandals (Padukas), placed them on the throne, and ruled Kosala as a humble servant and regent from a simple hut in Nandigram for fourteen years.`,
    aestheticColor: 'rgba(212, 175, 55, 0.12)' // gold-gray
  },
  {
    id: 'vibhishana',
    name: 'Vibhishana',
    title: 'Righteous Rakshasa',
    role: 'sage',
    description: 'Ravana\'s younger brother, who pleaded for peace and righteousness. Banishment by Ravana led him to seek refuge in Lord Rama\'s camp.',
    weapons: ['Spiritual Mantras', 'Vedic Wisdom'],
    powers: ['Immunity to demonic curses', 'Incorruptible intellect'],
    personality: ['Wise', 'Righteous', 'Vulnerable', 'Devout'],
    family: {
      father: 'Vishrava',
      mother: 'Kaikesi',
      spouse: 'Sarama',
      siblings: ['Ravana', 'Kumbhakarna', 'Surpanakha']
    },
    quotes: [
      {
        text: 'To stand with righteousness (Dharma) is superior to standing with family in sin.',
        context: 'Surrendering to Rama after being kicked out by Ravana.'
      }
    ],
    lessons: [
      'Loyalty to truth and Dharma is higher than loyalty to an evil ruler or family.'
    ],
    allies: ['Rama', 'Hanuman', 'Lakshmana'],
    enemies: ['Ravana', 'Indrajit', 'Kumbhakarna'],
    biography: `Vibhishana is the younger brother of Ravana, born with a righteous temperament despite his Rakshasa lineage. He spent his life in Lanka advocating for moral conduct and pleaded with Ravana to return Sita to Rama. When Ravana humiliated and exiled him, Vibhishana sought refuge with Rama. Rama welcomed him unconditionally, crowning him the King of Lanka before the war even concluded. Vibhishana represents the ultimate lesson that righteousness (Dharma) transcends family ties and national identity.`,
    aestheticColor: 'rgba(5, 150, 105, 0.15)' // emerald green aura
  },
  {
    id: 'sugriva',
    name: 'Sugriva',
    title: 'King of the Vanaras',
    role: 'vanara',
    description: 'The monkey king of Kishkindha, brother of Bali, who formed a historic alliance with Lord Rama to reclaim his kingdom and rescue Sita.',
    weapons: ['Mace of Kishkindha', 'Rocks and Trees'],
    powers: ['Vanara physical speed', 'Command over millions of monkey troops'],
    personality: ['Loyal', 'Short-tempered', 'Promising', 'Fragile'],
    family: {
      siblings: ['Bali'],
      spouse: 'Ruma'
    },
    quotes: [
      {
        text: 'All monkey search groups will travel to the four corners of the earth to find Devi Sita.',
        context: 'Deploying the Vanara sena to find Sita.'
      }
    ],
    lessons: [
      'Mutual trust and collaboration (alliance) are essential to overcome giant adversaries.'
    ],
    allies: ['Rama', 'Hanuman', 'Lakshmana', 'Angada', 'Jambavan'],
    enemies: ['Bali', 'Ravana'],
    biography: `Sugriva was the monkey king of Kishkindha. Forced into exile by his powerful brother Bali, who had seized his kingdom and wife Ruma, Sugriva lived in fear on Rishyamukha Hill. Upon meeting Rama through Hanuman, he formed a sacred alliance. Rama helped him reclaim his kingdom by slaying Bali, and Sugriva mobilized the global Vanara forces to assist Rama in searching for Sita and defeating Ravana, demonstrating the power of alliance.`,
    aestheticColor: 'rgba(180, 130, 4, 0.15)' // amber
  },
  {
    id: 'bali',
    name: 'Bali',
    title: 'Unconquerable Vanara',
    role: 'vanara',
    description: 'The former king of Kishkindha, brother of Sugriva, who possessed an extraordinary boon of absorbing half the strength of anyone who faced him.',
    weapons: ['Golden Mace', 'Boon of strength absorption'],
    powers: ['Absorbing adversary\'s strength', 'Vast speed and leaping ability'],
    personality: ['Tyrannical', 'Overconfident', 'Power-blinded', 'Repentant at death'],
    family: {
      siblings: ['Sugriva'],
      spouse: 'Tara',
      children: ['Angada']
    },
    quotes: [
      {
        text: 'Why did you strike me from hiding, O Rama? Had you asked, I would have bound Ravana myself.',
        context: 'Questioning Rama\'s arrow shot from hiding.'
      }
    ],
    lessons: [
      'Even the greatest strength cannot save you if you violate Dharma (exiling brother and taking his spouse).'
    ],
    allies: [],
    enemies: ['Sugriva', 'Dundubhi'],
    biography: `Bali was the elder brother of Sugriva and the mighty ruler of Kishkindha. Possessing a divine boon that absorbed half the strength of any opponent who faced him directly, he was virtually invincible. However, his arrogance led him to unjustly exile his brother and keep Sugriva's wife. Rama slew him from concealment to fulfill his promise to Sugriva. In his final moments, Bali realized his moral errors, reconciled with Sugriva, and placed his son Angada in Rama's care.`,
    aestheticColor: 'rgba(100, 80, 50, 0.15)' // stone brown
  },
  {
    id: 'jambavan',
    name: 'Jambavan',
    title: 'Riksharaj (King of Bears)',
    role: 'sage',
    description: 'The wise, immortal king of bears, born during the creation of the universe, who guided the Vanara army and awakened Hanuman\'s forgotten powers.',
    weapons: ['Ancient Mace', 'Wisdom of Eras'],
    powers: ['Immortal lifespan', 'Stately size', 'Awakener of spiritual potential'],
    personality: ['Wise', 'Venerable', 'Fatherly', 'Steady'],
    family: {
      children: ['Jambavati']
    },
    quotes: [
      {
        text: 'Hanuman, remember who you are! Leap across the ocean, for your power belongs to Shri Rama.',
        context: 'Awakening Hanuman\'s powers on the seashore.'
      }
    ],
    lessons: [
      'The role of an elder/mentor is to remind the youth of their latent greatness.'
    ],
    allies: ['Rama', 'Hanuman', 'Lakshmana', 'Sugriva'],
    enemies: ['Ravana'],
    biography: `Jambavan is the wise king of the bears, created by Lord Brahma. Blessed with immense wisdom, longevity, and deep scriptural knowledge, he served as a primary counselor in the search for Sita. He played a critical role in reminding Hanuman of his divine heritage and dormant flying powers when the monkey army faced the impossible barrier of the southern ocean, serving as the ultimate mentor.`,
    aestheticColor: 'rgba(70, 70, 90, 0.15)' // deep gray
  },
  {
    id: 'indrajit',
    name: 'Indrajit',
    title: 'Conqueror of Indra',
    role: 'rakshasa',
    description: 'Ravana\'s eldest son, the greatest warrior of Lanka, who defeated Indra and possessed advanced celestial weapons (Brahmastra, Nagapasha, Indrastra).',
    weapons: ['Nagapasha', 'Brahmashira', 'Mystic Illusion Chariot'],
    powers: ['Invisibility in clouds', 'Sorcery (Mayavi yuddha)', 'Unleashing three absolute astras'],
    personality: ['Fierce', 'Ruthless', 'Extremely skilled', 'Fiercely loyal to father'],
    family: {
      father: 'Ravana',
      mother: 'Mandodari'
    },
    quotes: [
      {
        text: 'I shall bind Lakshmana and destroy Rama\'s army before sunrise.',
        context: 'Boasting of his battlefield plans.'
      }
    ],
    lessons: [
      'Misusing divine boons and sorcery for an unrighteous cause leads to an early, tragic end.'
    ],
    allies: ['Ravana', 'Kumbhakarna'],
    enemies: ['Lakshmana', 'Hanuman', 'Rama'],
    biography: `Indrajit, also known as Meghnad, was the eldest son of Ravana and the crown prince of Lanka. He was a master of dark illusionary magic, possessing rare weapons from Lord Brahma, Lord Vishnu, and Lord Shiva. He earned the name Indrajit by defeating Indra, the King of Heaven. He fought fiercely in the war, twice binding Rama and Lakshmana with magical arrows, but was eventually slain by Lakshmana in a high-stakes combat after his secret sacrificial rituals were disrupted.`,
    aestheticColor: 'rgba(88, 28, 135, 0.15)' // deep purple
  },
  {
    id: 'kumbhakarna',
    name: 'Kumbhakarna',
    title: 'Giant Sleeper of Lanka',
    role: 'rakshasa',
    description: 'Ravana\'s giant brother, possessing massive size and strength, who slept for six months due to a cursed boon and was woken to fight Rama.',
    weapons: ['Spiked Club', 'Giant Fists'],
    powers: ['Colossal scale', 'Invincible physical structure'],
    personality: ['Lethargic', 'Tragically loyal', 'Truth-telling'],
    family: {
      father: 'Vishrava',
      mother: 'Kaikesi',
      siblings: ['Ravana', 'Vibhishana']
    },
    quotes: [
      {
        text: 'What you did was wrong, Ravana. But as your brother, I shall die fighting for you.',
        context: 'Criticizing Ravana\'s abduction of Sita but agreeing to fight out of family loyalty.'
      }
    ],
    lessons: [
      'Blind loyalty to family, even while knowing they are in the wrong, leads to tragic self-destruction.'
    ],
    allies: ['Ravana', 'Indrajit'],
    enemies: ['Rama', 'Lakshmana', 'Hanuman'],
    biography: `Kumbhakarna was the giant younger brother of Ravana. Possessing colossal strength, he was cursed to sleep for six months at a time due to a slip of tongue before Lord Brahma. When awakened during the war, he criticized Ravana's sinful abduction of Sita but chose to fight for his brother out of loyalty. He entered the battlefield, causing widespread havoc, before being slain by Lord Rama. He represents blind loyalty to family over universal moral values.`,
    aestheticColor: 'rgba(30, 41, 59, 0.18)' // slate gray
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'birth-of-rama',
    title: 'Birth of Rama',
    period: 'Treta Yuga',
    description: `Lord Vishnu manifests on earth as the eldest son of King Dasharatha of Ayodhya to defeat Ravana and establish Dharma.`,
    location: 'Ayodhya',
    characters: ['Rama', 'Dasharatha', 'Kausalya'],
    lesson: `The divine responds to sincere prayers and sacrifices.`,
    source: 'Valmiki Ramayana, Bal Kand, Sarga 18'
  },
  {
    id: 'hermitage-protection',
    title: 'Hermitage Protection',
    period: 'Early Youth',
    description: `The young princes Rama and Lakshmana accompany Sage Vishwamitra to the forest, protecting his yajna and slaying the demoness Tataka.`,
    location: 'Siddhashrama',
    characters: ['Rama', 'Lakshmana', 'Vishwamitra', 'Tataka'],
    lesson: `Duty to protect spiritual endeavors starts at a young age.`,
    source: 'Valmiki Ramayana, Bal Kand, Sarga 30'
  },
  {
    id: 'sita-swayamvar',
    title: 'Sita Swayamvar',
    period: 'Early Youth',
    description: `Rama lifts, strings, and breaks the heavy Pinaka bow of Lord Shiva in Mithila, winning the hand of Sita in marriage.`,
    location: 'Mithila',
    characters: ['Rama', 'Sita', 'Janaka', 'Vishwamitra', 'Lakshmana'],
    lesson: `Destiny matches those of equal virtue and caliber.`,
    source: 'Valmiki Ramayana, Bal Kand, Sarga 67'
  },
  {
    id: 'exile-of-rama',
    title: 'The Banishing Command',
    period: 'Day of Coronation',
    description: `Rama is exiled for 14 years to keep the promises of King Dasharatha to Queen Kaikeyi. Sita and Lakshmana voluntarily accompany him.`,
    location: 'Ayodhya',
    characters: ['Rama', 'Sita', 'Lakshmana', 'Dasharatha', 'Kaikeyi'],
    lesson: `Honoring commitments is the bedrock of absolute truth.`,
    source: 'Valmiki Ramayana, Ayodhya Kand, Sarga 19'
  },
  {
    id: 'crossing-ganges',
    title: 'Crossing the Ganges',
    period: '1st Year of Exile',
    description: `Rama, Sita, and Lakshmana cross the holy Ganges river with the help of the loyal boatman Guha, entering the deep forest.`,
    location: 'Sringaverapur',
    characters: ['Rama', 'Sita', 'Lakshmana', 'Guha'],
    lesson: `True devotion knows no social barriers.`,
    source: 'Valmiki Ramayana, Ayodhya Kand, Sarga 52'
  },
  {
    id: 'life-at-panchavati',
    title: 'Settling at Panchavati',
    period: 'Exile Years',
    description: `They establish a peaceful hermitage on the banks of the Godavari River, meeting sages and living in harmony with nature.`,
    location: 'Panchavati',
    characters: ['Rama', 'Sita', 'Lakshmana'],
    lesson: `Inner peace can be cultivated in the simplest of surroundings.`,
    source: 'Valmiki Ramayana, Aranya Kand, Sarga 15'
  },
  {
    id: 'surpanakha-mutilation',
    title: "Surpanakha's Confrontation",
    period: '13th Year of Exile',
    description: `Ravana's sister Surpanakha attempts to attack Sita and is mutilated by Lakshmana, triggering Ravana's plot for revenge.`,
    location: 'Panchavati',
    characters: ['Lakshmana', 'Sita', 'Surpanakha', 'Rama'],
    lesson: `Lust and unchecked aggression lead to immediate downfall.`,
    source: 'Valmiki Ramayana, Aranya Kand, Sarga 18'
  },
  {
    id: 'golden-deer',
    title: 'The Golden Deer',
    period: '13th Year of Exile',
    description: `Ravana plots the golden deer illusion. Rama runs after the deer, and Sita is left unprotected.`,
    location: 'Panchavati',
    characters: ['Rama', 'Sita', 'Lakshmana', 'Maricha'],
    lesson: `Illusionary desires lead to distraction and separation.`,
    source: 'Valmiki Ramayana, Aranya Kand, Sarga 43'
  },
  {
    id: 'abduction-of-sita',
    title: "Sita's Abduction",
    period: '13th Year of Exile',
    description: `Ravana kidnaps Sita. Jatayu fights Ravana to save her, sacrificing his life. Sita is imprisoned in Ashok Vatika.`,
    location: 'Dandakaranya Forest',
    characters: ['Sita', 'Ravana', 'Jatayu'],
    lesson: `Courage is fighting for justice even when defeat is certain.`,
    source: 'Valmiki Ramayana, Aranya Kand, Sarga 49'
  },
  {
    id: 'sugriva-alliance',
    title: 'Alliance with Sugriva',
    period: '14th Year of Exile',
    description: `Rama meets Hanuman, helps Sugriva regain the throne of Kishkindha by slaying Bali, and forms a grand alliance.`,
    location: 'Kishkindha',
    characters: ['Rama', 'Lakshmana', 'Sugriva', 'Hanuman', 'Bali'],
    lesson: `Righteous alliance yields mutual strength and success.`,
    source: 'Valmiki Ramayana, Kishkindha Kand, Sarga 12'
  },
  {
    id: 'hanumans-leap',
    title: "Hanuman's Giant Leap",
    period: '14th Year of Exile',
    description: `Hanuman leaps across the 100-yojana ocean to Lanka to locate Sita, giving her Rama's ring and burning down Lanka.`,
    location: 'Mahendra Mountain to Lanka',
    characters: ['Hanuman', 'Sita', 'Ravana'],
    lesson: `True devotion unlocks boundless potential within oneself.`,
    source: 'Valmiki Ramayana, Sundara Kand, Sarga 1'
  },
  {
    id: 'bridge-to-lanka',
    title: 'Construction of Rama Setu',
    period: 'Battle Eve',
    description: `The Vanara army builds a floating stone bridge across the ocean to reach Lanka, engineered by Nala and Nila.`,
    location: 'Rameshwaram',
    characters: ['Rama', 'Lakshmana', 'Sugriva', 'Nala', 'Nila'],
    lesson: `Collective effort and simple faith can build bridges over impossible waters.`,
    source: 'Valmiki Ramayana, Yuddha Kand, Sarga 22'
  },
  {
    id: 'slaying-indrajit',
    title: 'Slaying of Kumbhakarna & Meghnad',
    period: 'War of Lanka',
    description: `The war begins. Lakshmana slays Ravana's powerful son Indrajit, and Rama slays Ravana's giant brother Kumbhakarna.`,
    location: 'Lanka',
    characters: ['Rama', 'Lakshmana', 'Indrajit', 'Kumbhakarna', 'Hanuman'],
    lesson: `Dark forces and magic are dismantled by discipline and devotion.`,
    source: 'Valmiki Ramayana, Yuddha Kand, Sarga 67 & 89'
  },
  {
    id: 'final-battle',
    title: 'The Final Battle',
    period: 'War of Lanka',
    description: `Rama meets Ravana in a colossal duel, destroying the ten-headed demon king with the divine Brahmastra.`,
    location: 'Lanka',
    characters: ['Rama', 'Ravana', 'Vibhishana'],
    lesson: `Truth and humility inevitably defeat pride and tyranny.`,
    source: 'Valmiki Ramayana, Yuddha Kand, Sarga 108'
  },
  {
    id: 'coronation-of-rama',
    title: 'Coronation of Rama',
    period: 'Return to Ayodhya',
    description: `Rama returns on the Pushpaka Vimana to Ayodhya, establishing the golden era of Ramrajya.`,
    location: 'Ayodhya',
    characters: ['Rama', 'Sita', 'Lakshmana', 'Bharata', 'Hanuman'],
    lesson: `A righteous ruler places the welfare of the people above personal desires.`,
    source: 'Valmiki Ramayana, Yuddha Kand, Sarga 128'
  }
];

export const journeyLocations: JourneyLocation[] = [
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    description: 'The capital of the Kosala Kingdom, situated on the banks of the sacred Sarayu River. Birthplace of Lord Rama.',
    coordinates: { x: 35, y: 32 },
    history: 'Founded by Manu. The seat of the Ikshvaku dynasty. Celebrated for its golden architecture and righteous citizens.',
    relatedEvents: ['birth-of-rama', 'exile-of-rama', 'coronation-of-rama'],
    relatedCharacters: ['rama', 'dasharatha', 'bharata'],
    quote: 'Ayodhya represents the spiritual mind—uncorrupted, golden, and peaceful.',
    spiritualSignificance: 'The start and culmination of the spiritual journey. Home of peace.',
    imageAncient: '/images/ayodhya_ancient.jpg',
    imageModern: '/images/ayodhya_modern.jpg',
    deepDive: {
      geography: 'Situated in the Faizabad district of Uttar Pradesh, India, along the sweeping banks of the sacred Sarayu River.',
      scriptureRef: 'Valmiki Ramayana, Bal Kand, Sarga 5: "On the banks of the Sarayu river, there was a great and prosperous country named Kosala... and in it was the city of Ayodhya, founded by Manu."',
      legends: 'The epic stage for the beginning and end of the Ramayana. Birthplace of Rama and his brothers, capital of the Solar Dynasty (Surya Vansha). It is here that Rama returned on the Pushpaka Vimana to establish Ramrajya—a golden era of prosperity, non-violence, and perfect justice.',
      archaeology: 'Carbon dating and excavations led by the Archaeological Survey of India (ASI) revealed structures dating back to the Northern Black Polished Ware (NBPW) period (c. 1000 BCE). Excavated artifacts include temple pillars, ancient brick foundations, and clay tablets confirming continuous cultural veneration.',
      spiritualTheme: 'Ayodhya signifies the state of "no war" or "inner peace." It represents the uncorrupted mind (Kausalya) united with pure discrimination (Dasharatha), birthing divine consciousness (Rama).'
    }
  },
  {
    id: 'mithila',
    name: 'Mithila',
    description: 'The kingdom of King Janaka, known for its spiritual wisdom, philosophical discussions, and as the birthplace of Sita.',
    coordinates: { x: 55, y: 30 },
    history: 'A center of Vedic learning and debates. Home to Sage Yajnavalkya.',
    relatedEvents: ['sita-swayamvar'],
    relatedCharacters: ['sita', 'rama', 'janaka'],
    quote: 'Mithila is the land of spiritual insight and philosophical inquiry.',
    spiritualSignificance: 'Where spiritual wisdom marries dynamic action.',
    imageAncient: '/images/mithila_ancient.jpg',
    imageModern: '/images/mithila_modern.jpg',
    deepDive: {
      geography: 'Spans the Dhanusa district of modern-day southeastern Nepal (Janakpur) and parts of northern Bihar, India.',
      scriptureRef: 'Valmiki Ramayana, Bal Kand, Sarga 66: Recounts the stringing and breaking of Shiva\'s heavy bow (Pinaka) by young Rama, winning Sita\'s hand in marriage.',
      legends: 'Home of the philosopher-king Janaka, who ruled with complete detachment. Sita (also called Janaki) emerged here from a furrow in the ground while Janaka was plowing a sacred field. The site witnessed the breaking of Shiva\'s bow, an act symbolizing divine strength.',
      archaeology: 'The modern Janaki Mandir, constructed in 1911, stands on the traditional site of Janaka\'s palace. The surrounding plains contain numerous ancient ponds (Dhanush Sagar, Ganga Sagar) and ruins associated with Vedic debate halls.',
      spiritualTheme: 'Mithila represents the state of spiritual wisdom. The union of Rama (divine consciousness) and Sita (the earth-born energy/purity) signifies the merging of spiritual truth with active life.'
    }
  },
  {
    id: 'chitrakoot',
    name: 'Chitrakoot',
    description: 'The holy forest where Rama, Sita, and Lakshmana spent the initial years of exile. Where Bharata met Rama to beg him to return.',
    coordinates: { x: 38, y: 45 },
    history: 'Blessed by the presence of Sage Atri and Goddess Anusuya.',
    relatedEvents: ['exile-of-rama'],
    relatedCharacters: ['rama', 'sita', 'lakshmana', 'bharata'],
    quote: 'Chitrakoot is where the soul finds peace amidst exile.',
    spiritualSignificance: 'Represents contentment (Santosha) in simple forest living.',
    imageAncient: '/images/chitrakoot_ancient.jpg',
    imageModern: '/images/chitrakoot_modern.jpg',
    deepDive: {
      geography: 'Nestled in the scenic Vindhya mountain range, spanning across the borders of Chitrakoot district (Uttar Pradesh) and Satna district (Madhya Pradesh).',
      scriptureRef: 'Valmiki Ramayana, Ayodhya Kand, Sarga 54: Sage Bharadwaja guides the exiled trio to this lush hill, describing it as a peaceful sanctuary for saints.',
      legends: 'The holy forest where Rama, Sita, and Lakshmana spent 11.5 years of their exile. It is the site of the emotional "Bharat Milap" where Bharata begged Rama to return and took his wooden sandals (Padukas) back to Ayodhya to place on the throne.',
      archaeology: 'Major local geographical highlights include the Kamadgiri hill, Ramghat, Sphatik Shila (featuring footprints believed to be Rama\'s), and the Gupt Godavari caverns with ancient rock carvings and flowing natural springs.',
      spiritualTheme: 'Chitrakoot means "splendid hill of thoughts." It represents mental contentment (Santosha) where the mind, though exiled from worldly luxuries, finds ultimate peace in nature and devotion.'
    }
  },
  {
    id: 'panchavati',
    name: 'Panchavati',
    description: 'A beautiful grove of five banyan trees on the banks of Godavari River, where the golden deer incident and Sita\'s abduction took place.',
    coordinates: { x: 28, y: 60 },
    history: 'The site of hermitages of many sages. The gateway to the deep south.',
    relatedEvents: ['golden-deer', 'abduction-of-sita'],
    relatedCharacters: ['rama', 'sita', 'lakshmana', 'ravana'],
    quote: 'Panchavati is the testing ground of character, where illusions strike.',
    spiritualSignificance: 'Represents the five senses (Pancha-Indriyas) which are prone to illusions.',
    imageAncient: '/images/panchavati_ancient.jpg',
    imageModern: '/images/panchavati_modern.jpg',
    deepDive: {
      geography: 'Situated on the banks of the sacred Godavari River in modern Nashik, Maharashtra.',
      scriptureRef: 'Valmiki Ramayana, Aranya Kand, Sarga 13: Sage Agastya advises Rama to build a straw cottage under the five giant banyan trees of Panchavati.',
      legends: 'The place of the five banyan trees. It is here that Lakshmana cut off Surpanakha\'s nose, triggering Ravana\'s revenge. Ravana deployed Maricha in the guise of a golden deer, leading to the abduction of Sita from the cottage.',
      archaeology: 'Home to the black-stone Kalaram Temple and the Sita Gufaa (cave) system. Excavated shards and rock-cut structures in Nashik confirm ancient ascetic habitation dating to the 3rd century BCE.',
      spiritualTheme: 'Panchavati represents the five senses. It is the boundary where the soul is tested. If distracted by the "golden deer" (sensual illusions), the protective boundary (Lakshman Rekha/purity) is crossed, leading to capture by the ego (Ravana).'
    }
  },
  {
    id: 'kishkindha',
    name: 'Kishkindha',
    description: 'The monkey kingdom near Hampi, characterized by rocky hills and forests, where Rama formed an alliance with Sugriva.',
    coordinates: { x: 30, y: 78 },
    history: 'Ruled by monkey king Bali, and later Sugriva.',
    relatedEvents: ['hanumans-leap'],
    relatedCharacters: ['rama', 'hanuman', 'sugriva'],
    quote: 'Kishkindha is where devotion meets divine instruction.',
    spiritualSignificance: 'Represents the awakening of the lower instincts into divine action.',
    imageAncient: '/images/kishkindha_ancient.jpg',
    imageModern: '/images/kishkindha_modern.jpg',
    deepDive: {
      geography: 'Located around the UNESCO World Heritage site of Hampi along the Tungabhadra River, in the Bellary district of Karnataka.',
      scriptureRef: 'Valmiki Ramayana, Kishkindha Kand, Sarga 4: Details the initial meeting of Rama with Hanuman and Sugriva on the shores of Pampa Lake.',
      legends: 'The legendary monkey kingdom. Rama slew the tyrannical king Bali here, crowning Sugriva and forming the Vanara alliance. Hanuman was reminded of his latent powers here, preparing for his historic leap across the ocean.',
      archaeology: 'Features ancient granite caves (such as Sugriva\'s Cave), Matanga Hill, and temples. The boulder-strewn landscape matches the epic description. Modern research links the area to iron-age settlements.',
      spiritualTheme: 'Kishkindha represents the active lower mind. Reclaiming Sugriva (friendly cooperation) and overcoming Bali (brute ego) redirects monkey-like restless thoughts into focused devotion (represented by Hanuman\'s leap).'
    }
  },
  {
    id: 'rameshwaram',
    name: 'Rameshwaram',
    description: 'The southern tip of India where Rama worshipped Lord Shiva and constructed the Rama Setu bridge.',
    coordinates: { x: 33, y: 92 },
    history: 'The landing point of the great bridge to Lanka.',
    relatedEvents: ['bridge-to-lanka'],
    relatedCharacters: ['rama', 'lakshmana', 'hanuman'],
    quote: 'Rameshwaram is the launching pad of faith.',
    spiritualSignificance: 'Symbolizes the dissolution of boundaries and absolute focus on the goal.',
    imageAncient: '/images/rameshwaram_ancient.jpg',
    imageModern: '/images/rameshwaram_modern.jpg',
    deepDive: {
      geography: 'An island town situated on Pamban Island in Tamil Nadu, separated from mainland India by the Pamban Channel.',
      scriptureRef: 'Valmiki Ramayana, Yuddha Kand, Sarga 22: Recounts the construction of the bridge (Setu) by Nala, Nila, and the monkey army using buoyant limestone shoals.',
      legends: 'Before launching the invasion, Rama established a Shiva Linga here to invoke blessings. The entire Vanara army collaborated here to build the floating stone bridge (Rama Setu) across the ocean.',
      archaeology: 'NASA satellite pictures show a chain of limestone shoals (Adam\'s Bridge) connecting India to Sri Lanka. The ancient Ramanathaswamy Temple corridor stands as a monument of classical Dravidian architecture.',
      spiritualTheme: 'Rameshwaram is the bridge of faith. It represents the dissolution of boundaries. To cross the ocean of life (Samsara), one must construct a bridge of action, cooperation, and absolute surrender to the divine.'
    }
  },
  {
    id: 'lanka',
    name: 'Lanka',
    description: 'The golden kingdom of Ravana, located across the ocean. The battlefield of the epic war.',
    coordinates: { x: 35, y: 97 },
    history: 'Built by Vishwakarma, ruled by Ravana, eventually burned by Hanuman.',
    relatedEvents: ['battle-of-lanka', 'abduction-of-sita'],
    relatedCharacters: ['ravana', 'sita', 'rama', 'vibhishana'],
    quote: 'Lanka is the citadel of pride, bound to fall.',
    spiritualSignificance: 'Represents the ego-bound mind full of desires.',
    imageAncient: '/images/lanka_ancient.jpg',
    imageModern: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=600&auto=format&fit=crop',
    deepDive: {
      geography: 'The island nation of Sri Lanka, situated in the Indian Ocean south of the Indian subcontinent.',
      scriptureRef: 'Valmiki Ramayana, Yuddha Kand, Sarga 108: Details the final combat between Rama and Ravana, resulting in Ravana\'s death via the Brahmastra.',
      legends: 'The golden kingdom built by Vishwakarma. Sita was held hostage here in the Ashoka Vatika gardens. Hanuman set the city ablaze, and Rama subsequently led the siege, killed Ravana, and crowned the righteous Vibhishana.',
      archaeology: 'Associated with archaeological sites like Sigiriya Rock Fortress (believed to be Ravana\'s palace site), Ravana Ella caves, and Hakgala Botanical Garden (the traditional Ashoka Vatika). Soils in these areas show unique geological profiles matching epic descriptions.',
      spiritualTheme: 'Lanka represents the fortress of the material ego. Encased in gold and power, it is the home of pure desire and sensory indulgence. Slaying the ruler of Lanka represents the victory of pure awareness over pride.'
    }
  }
];

export const libraryItems: LibraryItem[] = [
  {
    id: 'brahmastra',
    name: 'Brahmastra',
    category: 'weapons',
    description: 'A divine weapon created by Lord Brahma, capable of incinerating entire worlds. Unstoppable once unleashed.',
    significance: 'Used by Rama to slay Ravana when all other weapons failed.',
    association: 'Rama, Ravana, Indrajit'
  },
  {
    id: 'pinaka',
    name: 'Pinaka',
    category: 'weapons',
    description: 'The mighty bow of Lord Shiva. Extremely heavy, requiring divine energy to even lift.',
    significance: 'Broken by Rama during Sita\'s Swayamvar to win her hand.',
    association: 'Shiva, Janaka, Rama'
  },
  {
    id: 'jatayu',
    name: 'Jatayu',
    category: 'creatures',
    description: 'The noble king of vultures, a close friend of King Dasharatha, who fought Ravana to rescue Sita.',
    significance: 'Died in Rama\'s lap and was granted liberation (Moksha) by Rama.',
    association: 'Dasharatha, Rama, Sita'
  },
  {
    id: 'pushpaka-vimana',
    name: 'Pushpaka Vimana',
    category: 'objects',
    description: 'A flying chariot capable of changing its size, built by Vishwakarma and possessed by Ravana.',
    significance: 'Used by Rama, Sita, and the Vanaras to return to Ayodhya.',
    association: 'Ravana, Kubera, Rama'
  },
  {
    id: 'diwali',
    name: 'Diwali',
    category: 'festivals',
    description: 'The festival of lights, celebrating the return of Lord Rama to Ayodhya after 14 years of exile.',
    significance: 'Celebrated by lighting earthen lamps (diyas) to dispel darkness and ego.',
    association: 'Ayodhya, Rama'
  }
];

export const versions: VersionDetail[] = [
  {
    name: 'Valmiki Ramayana',
    author: 'Sage Valmiki',
    period: 'Ancient (c. 5th Century BCE)',
    language: 'Sanskrit',
    focus: 'Rama as an exemplary human (Maryada Purushottama) experiencing human emotions and struggles.',
    differences: [
      {
        topic: 'Laxman Rekha',
        narrative: 'No mention of a physical line drawn by Lakshmana around the cottage.'
      },
      {
        topic: 'Sita\'s Abduction',
        narrative: 'Real Sita is abducted directly by Ravana.'
      }
    ]
  },
  {
    name: 'Ramcharitmanas',
    author: 'Goswami Tulsidas',
    period: 'Medieval (16th Century CE)',
    language: 'Awadhi (Hindi)',
    focus: 'Rama as the supreme divine incarnation (Brahman), written in a highly devotional (Bhakti) tone.',
    differences: [
      {
        topic: 'Laxman Rekha',
        narrative: 'A line is drawn by Lakshmana around the hut to protect Sita.'
      },
      {
        topic: 'Sita\'s Abduction',
        narrative: 'A shadow form (Maya Sita) is abducted, while the real Sita is protected by Agni (Fire God).'
      }
    ]
  },
  {
    name: 'Kamba Ramayanam',
    author: 'Kambar',
    period: '12th Century CE',
    language: 'Tamil',
    focus: 'High literary poetic styling with deep emotional weight, emphasizing Rama\'s cosmic divinity.',
    differences: [
      {
        topic: 'Ravana\'s Abduction Method',
        narrative: 'Ravana does not touch Sita; he lifts the entire plot of land she stands on.'
      }
    ]
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-characters',
    title: 'Character Knowledge',
    category: 'character',
    questions: [
      {
        id: 'q-char-1',
        question: 'Who was the spiritual mother of Hanuman?',
        options: ['Mandodari', 'Anjana', 'Kausalya', 'Kaikeyi'],
        answer: 1,
        explanation: 'Anjana was the mother of Hanuman. She prayed to Vayu and Shiva to receive him as a son.'
      },
      {
        id: 'q-char-2',
        question: 'Who is the father of Queen Sita?',
        options: ['Janaka', 'Dasharatha', 'Vishwamitra', 'Manu'],
        answer: 0,
        explanation: 'King Janaka of Mithila adopted Sita after finding her in a furrow of the earth.'
      },
      {
        id: 'q-char-3',
        question: 'Which brother of Rama accompanied him into exile in the forest?',
        options: ['Bharata', 'Shatrughna', 'Lakshmana', 'Sugriva'],
        answer: 2,
        explanation: 'Lakshmana chose to leave the royal palace of Ayodhya to serve his brother Rama and Sita in exile.'
      },
      {
        id: 'q-char-4',
        question: 'Who was the eldest son of Ravana and conqueror of Indra?',
        options: ['Vibhishana', 'Indrajit', 'Kumbhakarna', 'Aksha Kumar'],
        answer: 1,
        explanation: 'Indrajit (Meghnad) defeated Indra, the king of devas, earning his name and powerful boons.'
      },
      {
        id: 'q-char-5',
        question: 'Which queen of Dasharatha asked for Rama\'s exile and Bharata\'s coronation?',
        options: ['Kausalya', 'Kaikeyi', 'Sumitra', 'Mandodari'],
        answer: 1,
        explanation: 'Queen Kaikeyi was manipulated by her maid Manthara into demanding the two boons from King Dasharatha.'
      },
      {
        id: 'q-char-6',
        question: 'Who was the noble vulture king who fought Ravana to rescue Sita?',
        options: ['Sampati', 'Jatayu', 'Kesari', 'Sugriva'],
        answer: 1,
        explanation: 'Jatayu fought Ravana heroically and was fatally wounded. Rama performed his last rites and granted him Moksha.'
      },
      {
        id: 'q-char-7',
        question: 'Who was the bear king who reminded Hanuman of his forgotten powers?',
        options: ['Sugriva', 'Angada', 'Jambavan', 'Kesari'],
        answer: 2,
        explanation: 'Jambavan was an ancient and wise king of bears who recognized Hanuman\'s potential and prompted him to leap.'
      },
      {
        id: 'q-char-8',
        question: 'Who was the younger brother of Ravana who sought refuge with Lord Rama?',
        options: ['Kumbhakarna', 'Vibhishana', 'Indrajit', 'Khara'],
        answer: 1,
        explanation: 'Vibhishana chose Dharma (righteousness) over his brother Ravana, guiding Rama to defeat the demon king.'
      },
      {
        id: 'q-char-9',
        question: 'Which brother of Rama ruled Ayodhya as a regent using Rama\'s Padukas (sandals)?',
        options: ['Lakshmana', 'Shatrughna', 'Bharata', 'Sugriva'],
        answer: 2,
        explanation: 'Bharata refused to take the crown and instead placed Rama\'s sandals on the throne, ruling from Nandigram.'
      },
      {
        id: 'q-char-10',
        question: 'Who was the spiritual wind-deity father of Hanuman?',
        options: ['Vayu', 'Agni', 'Indra', 'Varuna'],
        answer: 0,
        explanation: 'Vayu (the Wind God) carried the divine energy of Shiva into Anjana\'s womb, birthing Hanuman.'
      },
      {
        id: 'q-char-11',
        question: 'Who was Ravana\'s giant brother who slept for six months due to a cursed boon?',
        options: ['Vibhishana', 'Kumbhakarna', 'Indrajit', 'Prahasta'],
        answer: 1,
        explanation: 'Kumbhakarna intended to ask for "Indrasana" (Indra\'s throne) but said "Nidrasana" (bed of sleep) instead.'
      },
      {
        id: 'q-char-12',
        question: 'Who was the wife of Lakshmana who stayed back in Ayodhya, keeping a 14-year vigil?',
        options: ['Urmila', 'Mandavi', 'Shrutakirti', 'Tara'],
        answer: 0,
        explanation: 'Urmila accepted sleep for 14 years so that Lakshmana could remain awake and serve Rama and Sita.'
      },
      {
        id: 'q-char-13',
        question: 'Who was the king of the Vanaras who allied with Rama after the slaying of Bali?',
        options: ['Sugriva', 'Hanuman', 'Angada', 'Nala'],
        answer: 0,
        explanation: 'Sugriva regained his throne and his wife Ruma with Rama\'s help, and committed his monkey sena to find Sita.'
      },
      {
        id: 'q-char-14',
        question: 'Which sage composed the original Sanskrit Ramayana epic?',
        options: ['Valmiki', 'Vyas', 'Tulsidas', 'Vishwamitra'],
        answer: 0,
        explanation: 'Sage Valmiki, known as the Adi Kavi (first poet), composed the original Sanskrit Ramayana.'
      },
      {
        id: 'q-char-15',
        question: 'Who was Ravana\'s sister whose advances were rejected by Rama and nose cut by Lakshmana?',
        options: ['Mandodari', 'Surpanakha', 'Trijata', 'Tataka'],
        answer: 1,
        explanation: 'Surpanakha was a demoness who tried to attack Sita when Rama rejected her, prompting Lakshmana to punish her.'
      }
    ]
  },
  {
    id: 'quiz-geography',
    title: 'Timeline & Sacred Geography',
    category: 'location',
    questions: [
      {
        id: 'q-geo-1',
        question: 'In which kingdom was Lord Rama born as the prince?',
        options: ['Mithila', 'Kosala', 'Kishkindha', 'Lanka'],
        answer: 1,
        explanation: 'Rama was born in Kosala, whose capital was the grand city of Ayodhya.'
      },
      {
        id: 'q-geo-2',
        question: 'Where did Rama, Sita, and Lakshmana spend their initial years of exile?',
        options: ['Panchavati', 'Chitrakoot', 'Dandakaranya', 'Kishkindha'],
        answer: 1,
        explanation: 'They spent the early years of exile in the serene forests of Chitrakoot, meeting sages like Atri.'
      },
      {
        id: 'q-geo-3',
        question: 'Under which grove of five sacred banyan trees did the golden deer chase happen?',
        options: ['Panchavati', 'Chitrakoot', 'Rameshwaram', 'Lanka'],
        answer: 0,
        explanation: 'Panchavati (literally five banyan trees) is located in modern Nashik, Maharashtra, near the Godavari.'
      },
      {
        id: 'q-geo-4',
        question: 'What was the capital city of Ravana\'s golden island kingdom?',
        options: ['Ayodhya', 'Lanka', 'Mithila', 'Kishkindha'],
        answer: 1,
        explanation: 'Lanka was the golden fortress capital built by Vishwakarma in the southern sea.'
      },
      {
        id: 'q-geo-5',
        question: 'From which mountain did Hanuman take his giant leap across the ocean?',
        options: ['Kamadgiri', 'Mahendra', 'Vindhya', 'Matanga'],
        answer: 1,
        explanation: 'Hanuman climbed Mount Mahendra to find the leverage and focus to leap 100 yojanas to Lanka.'
      },
      {
        id: 'q-geo-6',
        question: 'Where did the marriage (Swayamvar) of Lord Rama and Queen Sita take place?',
        options: ['Ayodhya', 'Mithila', 'Panchavati', 'Chitrakoot'],
        answer: 1,
        explanation: 'Mithila was the kingdom of King Janaka, where the marriage of the four brothers took place.'
      },
      {
        id: 'q-geo-7',
        question: 'Where did Bharata meet Rama to beg him to return to Ayodhya and take his Padukas?',
        options: ['Ayodhya', 'Chitrakoot', 'Panchavati', 'Kishkindha'],
        answer: 1,
        explanation: 'Bharata traced Rama\'s path to Chitrakoot, leading to the emotional "Bharat Milap" meeting.'
      },
      {
        id: 'q-geo-8',
        question: 'Along the banks of which sacred river is the ancient city of Ayodhya situated?',
        options: ['Ganga', 'Yamuna', 'Sarayu', 'Godavari'],
        answer: 2,
        explanation: 'Ayodhya is located along the Sarayu River, which is central to the birth and ascension of Rama.'
      },
      {
        id: 'q-geo-9',
        question: 'Where was the monkey kingdom of Kishkindha geologically situated in modern India?',
        options: ['Nashik', 'Hampi', 'Rameshwaram', 'Faizabad'],
        answer: 1,
        explanation: 'Kishkindha is geologically associated with Hampi in Karnataka, surrounded by stone ruins and caves.'
      },
      {
        id: 'q-geo-10',
        question: 'At which coastal location did Rama establish a Shiva Linga from sand before building the bridge?',
        options: ['Panchavati', 'Rameshwaram', 'Lanka', 'Chitrakoot'],
        answer: 1,
        explanation: 'Rameshwaram is the island coast where Rama offered prayers to Lord Shiva before launching the invasion.'
      },
      {
        id: 'q-geo-11',
        question: 'Where was Sita held captive in Lanka by Ravana?',
        options: ['Golden Palace', 'Ashoka Vatika', 'Sita Gufaa', 'Sigiriya Rock'],
        answer: 1,
        explanation: 'Sita was kept in the Ashoka Vatika, a grove of Ashoka trees, refusing to enter Ravana\'s palace.'
      },
      {
        id: 'q-geo-12',
        question: 'What was the name of the dense, demon-infested forest where Rama encountered Tataka?',
        options: ['Chitrakoot', 'Dandakaranya', 'Naimisharanya', 'Panchavati'],
        answer: 1,
        explanation: 'The Dandakaranya forest was a vast wilderness where Rama protected sages from forest demons.'
      },
      {
        id: 'q-geo-13',
        question: 'Who was the philosopher-king of Mithila and father of Sita?',
        options: ['Aja', 'Dasharatha', 'Janaka', 'Manu'],
        answer: 2,
        explanation: 'King Janaka ruled Mithila and was famous for his Vedantic wisdom and spiritual detachment.'
      },
      {
        id: 'q-geo-14',
        question: 'What is the name of the river near Panchavati where Lakshmana built their exile hut?',
        options: ['Sarayu', 'Ganga', 'Godavari', 'Narmada'],
        answer: 2,
        explanation: 'The Godavari River flowed near Panchavati, where Sita and the brothers lived in their cottage.'
      },
      {
        id: 'q-geo-15',
        question: 'In which Yuga did the events of the Ramayana epic take place?',
        options: ['Satya Yuga', 'Treta Yuga', 'Dwapara Yuga', 'Kali Yuga'],
        answer: 1,
        explanation: 'The Ramayana took place in the Treta Yuga, the second age of the cosmos.'
      }
    ]
  },
  {
    id: 'quiz-battles',
    title: 'Weapons, Battles & Divine Items',
    category: 'battle',
    questions: [
      {
        id: 'q-bat-1',
        question: 'Which weapon did Lord Rama use to defeat Ravana?',
        options: ['Pinaka Bow', 'Brahmastra', 'Chandrahas Sword', 'Pasupatastra'],
        answer: 1,
        explanation: 'Lord Rama used the Brahmastra, a divine arrow created by Brahma, to pierce Ravana\'s navel and defeat him.'
      },
      {
        id: 'q-bat-2',
        question: 'What was the name of the heavy bow of Shiva broken by Rama in Mithila?',
        options: ['Pinaka', 'Kodanda', 'Sharanga', 'Gandiva'],
        answer: 0,
        explanation: 'The Pinaka was the heavy bow of Shiva, which King Janaka challenged suitors to lift and string.'
      },
      {
        id: 'q-bat-3',
        question: 'Which flying chariot did Ravana use to abduct Sita and travel to Lanka?',
        options: ['Pushpaka Vimana', 'Indra Chariot', 'Garuda Chariot', 'Sun Chariot'],
        answer: 0,
        explanation: 'The Pushpaka Vimana was a divine flying chariot built by Vishwakarma and seized by Ravana from Kubera.'
      },
      {
        id: 'q-bat-4',
        question: 'What was the name of Rama\'s personal divine bow, crafted by Vishwakarma?',
        options: ['Kodanda', 'Pinaka', 'Gandiva', 'Vijaya'],
        answer: 0,
        explanation: 'Kodanda was Rama\'s personal bow. Rama is often depicted holding the Kodanda bow, hence the name Kodandapani.'
      },
      {
        id: 'q-bat-5',
        question: 'Which snake-entangling weapon did Indrajit use to bind Rama and Lakshmana on the battlefield?',
        options: ['Brahmastra', 'Nagapasha', 'Garudastra', 'Vayuvastra'],
        answer: 1,
        explanation: 'The Nagapasha bound the brothers with venomous serpents, from which they were freed by the arrival of Garuda.'
      },
      {
        id: 'q-bat-6',
        question: 'What did the Vanara sena write on the stones to make them float on the ocean?',
        options: ['Rama\'s Name', 'Shiva\'s Name', 'Mantra Om', 'Swastika symbol'],
        answer: 0,
        explanation: 'By writing Rama\'s name on the boulders, they floated, allowing the construction of the Rama Setu.'
      },
      {
        id: 'q-bat-7',
        question: 'What herb did Hanuman carry back along with the mountain to revive Lakshmana?',
        options: ['Sanjeevani', 'Tulsi', 'Sarpagandha', 'Neem'],
        answer: 0,
        explanation: 'Sanjeevani (Mritasanjeevani) was the life-restoring herb from Mount Dronagiri in the Himalayas.'
      },
      {
        id: 'q-bat-8',
        question: 'What did Kaikeyi demand from Dasharatha using her two historical boons?',
        options: ['Rama\'s exile & Bharata\'s coronation', 'Sita\'s marriage & Ayodhya\'s expansion', 'Lakshmana\'s exile & Bharata\'s birth', 'Slaying of Ravana'],
        answer: 0,
        explanation: 'She demanded that Bharata be crowned king, and Rama be exiled to the forest for 14 years.'
      },
      {
        id: 'q-bat-9',
        question: 'Which demon took the form of a beautiful golden deer to distract Rama and Sita?',
        options: ['Maricha', 'Subahu', 'Tataka', 'Khara'],
        answer: 0,
        explanation: 'Maricha was Ravana\'s uncle who reluctantly turned into a golden deer, calling out in Rama\'s voice when struck.'
      },
      {
        id: 'q-bat-10',
        question: 'What is the name of the divine sword gifted to Ravana by Lord Shiva as a boon?',
        options: ['Chandrahas', 'Pinaka', 'Kharga', 'Nandaka'],
        answer: 0,
        explanation: 'Chandrahas (Moon-blade) was given to Ravana after he displayed absolute devotion, lifting Mount Kailash.'
      },
      {
        id: 'q-bat-11',
        question: 'Which demoness did Rama slay in his youth to protect Sage Vishwamitra\'s sacred rituals?',
        options: ['Tataka', 'Simhika', 'Surpanakha', 'Trijata'],
        answer: 0,
        explanation: 'Tataka was a powerful forest demoness whom Rama reluctantly slew in his youth on Vishwamitra\'s instruction.'
      },
      {
        id: 'q-bat-12',
        question: 'What was the bridge built by the Vanara army across the ocean called?',
        options: ['Rama Setu', 'Lanka Setu', 'Pamban Bridge', 'Indra Setu'],
        answer: 0,
        explanation: 'The bridge is known as Rama Setu (Adam\'s Bridge), connecting Rameshwaram to Talaimannar.'
      },
      {
        id: 'q-bat-13',
        question: 'How many heads did Ravana possess, representing his vast Vedic intellect and mastery?',
        options: ['4', '8', '10', '12'],
        answer: 2,
        explanation: 'Ravana had 10 heads, representing his deep knowledge of the 4 Vedas, 6 Shastras, and massive intellect.'
      },
      {
        id: 'q-bat-14',
        question: 'What sacred ritual did King Dasharatha perform to obtain children?',
        options: ['Putrakameshti Yajna', 'Ashvamedha Yajna', 'Rajasuya Yajna', 'Soma Yajna'],
        answer: 0,
        explanation: 'The Putrakameshti Yajna was conducted by Sage Rishyasringa, yielding divine payasam (sweet pudding) for the queens.'
      },
      {
        id: 'q-bat-15',
        question: 'Which divine eagle and brother of Jatayu helped the monkeys by pointing them towards Lanka?',
        options: ['Sampati', 'Garuda', 'Aruna', 'Jatayu'],
        answer: 0,
        explanation: 'Sampati, whose wings were burned by the sun while saving Jatayu, informed the search party that Sita was in Lanka.'
      }
    ]
  }
];

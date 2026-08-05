import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Language } from '@/components/Providers';
import { kands, characters, journeyLocations, timelineEvents, libraryItems } from '@/data/ramayana';
import {
  getTranslatedCharacters,
  getTranslatedLocations,
  getTranslatedTimeline,
  getTranslatedLibrary,
  getTranslatedKands,
} from '@/data/translations';

// Simple RAG/Keyword match algorithm
function retrieveKnowledge(query: string, language: string = 'English') {
  const normalized = query.toLowerCase();
  
  const sources: string[] = [];
  const responses: string[] = [];

  const activeKands = getTranslatedKands(language as Language);
  const activeCharacters = getTranslatedCharacters(language as Language);
  const activeLocations = getTranslatedLocations(language as Language);
  const activeTimeline = getTranslatedTimeline(language as Language);
  const activeLibrary = getTranslatedLibrary(language as Language);

  // 1. Search characters
  for (const char of activeCharacters) {
    if (normalized.includes(char.name.toLowerCase()) || normalized.includes(char.title.toLowerCase())) {
      if (language === 'Hindi') {
        responses.push(`${char.name} (${char.title}) एक ${char.role} पात्र हैं। ${char.description} उनके मुख्य शस्त्र ${char.weapons.join(', ')} हैं और उनके पास ${char.powers.join(', ')} जैसी दिव्य शक्तियां हैं।`);
        sources.push(`चरित्र मंडल: ${char.name}`);
      } else {
        responses.push(`${char.name} (${char.title}) is a ${char.role} figure. ${char.description} Their main weapons are ${char.weapons.join(', ')} and they possess powers like ${char.powers.join(', ')}.`);
        sources.push(`Character Pantheon: ${char.name}`);
      }
    }
  }

  // 2. Search locations
  for (const loc of activeLocations) {
    if (normalized.includes(loc.name.toLowerCase())) {
      if (language === 'Hindi') {
        responses.push(`${loc.name} एक पवित्र स्थान है। ${loc.description} ऐतिहासिक रूप से, ${loc.history} इसका आध्यात्मिक महत्व है: "${loc.spiritualSignificance}"`);
        sources.push(`पवित्र भूगोल: ${loc.name}`);
      } else {
        responses.push(`${loc.name} is a sacred place. ${loc.description} Historically, ${loc.history} It holds spiritual significance: "${loc.spiritualSignificance}"`);
        sources.push(`Sacred Cartography: ${loc.name}`);
      }
    }
  }

  // 3. Search timeline/events
  for (const evt of activeTimeline) {
    const matchedByIdOrTitle = normalized.includes(evt.title.toLowerCase()) || normalized.includes(evt.id.replace(/-/g, ' '));
    let keywordMatch = false;
    const cleanId = evt.id.toLowerCase();
    
    if (cleanId === 'exile-of-rama' && (normalized.includes('exile') || normalized.includes('banish') || normalized.includes('forest') || normalized.includes('vanvas') || normalized.includes('वनवास') || normalized.includes('वन'))) {
      keywordMatch = true;
    } else if (cleanId === 'golden-deer' && (normalized.includes('deer') || normalized.includes('gold') || normalized.includes('mrig') || normalized.includes('मृग') || normalized.includes('हिरण') || normalized.includes('मारीच'))) {
      keywordMatch = true;
    } else if (cleanId === 'abduction-of-sita' && (normalized.includes('abduct') || normalized.includes('kidnap') || normalized.includes('steal') || normalized.includes('haran') || normalized.includes('हरण') || normalized.includes('अपहरण'))) {
      keywordMatch = true;
    } else if (cleanId === 'hanumans-leap' && (normalized.includes('leap') || normalized.includes('jump') || normalized.includes('fly') || normalized.includes('ocean') || normalized.includes('समुद्र') || normalized.includes('छलांग') || normalized.includes('पार'))) {
      keywordMatch = true;
    } else if (cleanId === 'bridge-to-lanka' && (normalized.includes('bridge') || normalized.includes('setu') || normalized.includes('ocean') || normalized.includes('पत्थर') || normalized.includes('सेतु') || normalized.includes('निर्माण'))) {
      keywordMatch = true;
    } else if (cleanId === 'battle-of-lanka' && (normalized.includes('battle') || normalized.includes('war') || normalized.includes('fight') || normalized.includes('kill') || normalized.includes('slay') || normalized.includes('युद्ध') || normalized.includes('वध') || normalized.includes('मृत्यु'))) {
      keywordMatch = true;
    } else if (cleanId === 'coronation-of-rama' && (normalized.includes('coronation') || normalized.includes('crown') || normalized.includes('king') || normalized.includes('राज्याभिषेक') || normalized.includes('सिंहासन'))) {
      keywordMatch = true;
    } else if (cleanId === 'sita-swayamvar' && (normalized.includes('swayamvar') || normalized.includes('marry') || normalized.includes('marriage') || normalized.includes('bow') || normalized.includes('shiva') || normalized.includes('विवाह') || normalized.includes('स्वयंवर') || normalized.includes('धनुष'))) {
      keywordMatch = true;
    } else if (cleanId === 'birth-of-rama' && (normalized.includes('birth') || normalized.includes('born') || normalized.includes('जन्म') || normalized.includes('अवतार'))) {
      keywordMatch = true;
    }

    if (matchedByIdOrTitle || keywordMatch) {
      if (language === 'Hindi') {
        responses.push(`पड़ाव "${evt.title}" ${evt.period} के दौरान हुआ था। ${evt.description} इस घटना से आध्यात्मिक सीख मिलती है: "${evt.lesson}"`);
        sources.push(`समयरेखा: ${evt.source}`);
      } else {
        responses.push(`The milestone "${evt.title}" occurred during the ${evt.period}. ${evt.description} The spiritual takeaway from this event is: "${evt.lesson}"`);
        sources.push(`Timeline: ${evt.source}`);
      }
    }
  }

  // 4. Search library (weapons, creatures, festivals)
  for (const item of activeLibrary) {
    if (normalized.includes(item.name.toLowerCase()) || normalized.includes(item.category)) {
      if (language === 'Hindi') {
        responses.push(`${item.name} ${item.category} श्रेणी में आता है। ${item.description} इसका अत्यधिक महत्व है: ${item.significance}`);
        sources.push(`ज्ञान पुस्तकालय: ${item.name}`);
      } else {
        responses.push(`The ${item.name} belongs to the category of ${item.category}. ${item.description} It is highly significant: ${item.significance}`);
        sources.push(`Knowledge Library: ${item.name}`);
      }
    }
  }

  // 5. Search Kands
  for (const kand of activeKands) {
    const matchedByIdOrName = normalized.includes(kand.name.toLowerCase()) || normalized.includes(kand.id.replace(/-/g, ' '));
    let keywordMatch = false;
    const cleanId = kand.id.toLowerCase();
    
    if (cleanId === 'bal-kand' && (normalized.includes('birth') || normalized.includes('childhood') || normalized.includes('born') || normalized.includes('marry') || normalized.includes('marriage') || normalized.includes('swayamvar') || normalized.includes('जन्म') || normalized.includes('बाल'))) {
      keywordMatch = true;
    } else if (cleanId === 'ayodhya-kand' && (normalized.includes('exile') || normalized.includes('banish') || normalized.includes('coronation') || normalized.includes('crown') || normalized.includes('promise') || normalized.includes('वनवास') || normalized.includes('अयोध्या'))) {
      keywordMatch = true;
    } else if (cleanId === 'aranya-kand' && (normalized.includes('forest') || normalized.includes('hermitage') || normalized.includes('deer') || normalized.includes('abduct') || normalized.includes('kidnap') || normalized.includes('रेखा') || normalized.includes('लक्ष्मण रेखा') || normalized.includes('हरण') || normalized.includes('अरण्य'))) {
      keywordMatch = true;
    } else if (cleanId === 'kishkindha-kand' && (normalized.includes('vanara') || normalized.includes('monkey') || normalized.includes('bali') || normalized.includes('sugriva') || normalized.includes('सुग्रीव') || normalized.includes('बाली') || normalized.includes('किष्किंधा'))) {
      keywordMatch = true;
    } else if (cleanId === 'sundara-kand' && (normalized.includes('lanka') || normalized.includes('hanuman') || normalized.includes('ring') || normalized.includes('garden') || normalized.includes('अशोक वाटिका') || normalized.includes('सुंदर'))) {
      keywordMatch = true;
    } else if (cleanId === 'yuddha-kand' && (normalized.includes('battle') || normalized.includes('war') || normalized.includes('bridge') || normalized.includes('setu') || normalized.includes('kill') || normalized.includes('die') || normalized.includes('युद्ध') || normalized.includes('वध'))) {
      keywordMatch = true;
    } else if (cleanId === 'uttara-kand' && (normalized.includes('coronation') || normalized.includes('lava') || normalized.includes('kusha') || normalized.includes('depart') || normalized.includes('उत्तर') || normalized.includes('लव') || normalized.includes('कुश'))) {
      keywordMatch = true;
    }

    if (matchedByIdOrName || keywordMatch) {
      if (language === 'Hindi') {
        responses.push(`${kand.name} (${kand.title}) में, हम देखते हैं कि ${kand.summary} मुख्य सीख है: "${kand.moral}"`);
        if (kand.verses.length > 0) {
          responses.push(`इस अध्याय का एक पवित्र श्लोक: "${kand.verses[0].sanskrit}" (${kand.verses[0].translation})`);
        }
        sources.push(`पवित्र अध्याय: ${kand.name}`);
      } else {
        responses.push(`In the ${kand.name} (${kand.title}), we see ${kand.summary} The core lesson is: "${kand.moral}"`);
        if (kand.verses.length > 0) {
          responses.push(`A sacred verse from this chapter: "${kand.verses[0].sanskrit}" (${kand.verses[0].translation})`);
        }
        sources.push(`Scriptural Chapters: ${kand.name}`);
      }
    }
  }

  return {
    content: responses.join('\n\n'),
    sources: sources.length > 0 ? sources.join('; ') : (language === 'Hindi' ? 'सामान्य मौखिक परंपरा' : 'General Oral Tradition'),
  };
}

// Hanuman Persona Prompting
function formatHanumanResponse(query: string, knowledge: { content: string; sources: string }, language: string = 'English') {
  if (language === 'Hindi') {
    const greetings = [
      'जय श्री राम! सत्य के खोजी, आपको मेरा प्रणाम।',
      'जय सीता-राम! मैं आपके भीतर छिपी दिव्य ज्योति को नमन करता हूँ।',
      'राम राम! आपके साथ श्री राम की महिमा पर चर्चा करना मेरे लिए अत्यंत हर्ष का विषय है।',
    ];
    
    const closing = [
      'श्री राम की कृपा आपके हृदय का मार्ग प्रशस्त करे।',
      'हमेशा याद रखें, भक्ति ही परमात्मा तक पहुँचने का परम सेतु है।',
      'सेवा और विनम्रता भाव में, आपका, हनुमान।',
    ];

    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const close = closing[Math.floor(Math.random() * closing.length)];

    if (!knowledge.content) {
      return {
        content: `${greeting}\n\nमैंने "${query}" के संबंध में आपका प्रश्न सुना। यद्यपि इस विशिष्ट विवरण का स्मरण अभी शांत है, परन्तु रामायण का मूल संदेश सदा जागृत है: धर्म पर अडिग रहें, भक्ति भाव से कर्म करें और सदैव विनम्र रहें। \n\nमुझसे राजा राम, माता सीता, लंका युद्ध या राम सेतु के बारे में पूछें, और मैं सहर्ष शास्त्रों से विवरण लाऊँगा! \n\n${close}`,
        sources: 'वाल्मीकि रामायण (सामान्य कोर शिक्षाएं)',
      };
    }

    return {
      content: `${greeting}\n\nशास्त्रों के पवित्र विवरणों में ऐसा लिखा है:\n\n${knowledge.content}\n\n${close}`,
      sources: knowledge.sources,
    };
  }

  const greetings = [
    'Jai Shri Ram! Pranam, seeker of truth.',
    'Jai Sita-Ram! I bow to the divine spark within you.',
    'Ram Ram! It is a joy to discuss the glory of Shri Rama with you.',
  ];
  
  const closing = [
    'May the grace of Shri Rama guide your heart.',
    'Always remember, devotion is the ultimate bridge to the divine.',
    'In service and humility, yours, Hanuman.',
  ];

  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  const close = closing[Math.floor(Math.random() * closing.length)];

  if (!knowledge.content) {
    return {
      content: `${greeting}\n\nI have listened to your question regarding "${query}". While my memory of this specific detail is resting, the core message of the Ramayana is always active: stand firm in Dharma (righteousness), act with devotion, and remain humble. \n\nAsk me about King Rama, Sita Devi, the war of Lanka, or the bridge of stones, and I shall retrieve the accounts from the scriptures! \n\n${close}`,
      sources: 'Valmiki Ramayana (General Core Teachings)',
    };
  }

  return {
    content: `${greeting}\n\nHere is what is written in the sacred accounts:\n\n${knowledge.content}\n\n${close}`,
    sources: knowledge.sources,
  };
}

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    // 1. Retrieve information via local simulated RAG search
    const knowledge = retrieveKnowledge(message, language as Language);

    // 2. Format answer under Hanuman persona
    const result = formatHanumanResponse(message, knowledge, language as Language);

    // 3. Log to local MySQL database using Prisma
    try {
      await prisma.$transaction([
        prisma.aiMessage.create({
          data: {
            role: 'user',
            content: message,
          },
        }),
        prisma.aiMessage.create({
          data: {
            role: 'assistant',
            content: result.content,
            sources: result.sources,
          },
        }),
      ]);
    } catch (dbError) {
      console.warn('Prisma Database Logging skipped (make sure schema is migrated):', dbError);
    }

    return NextResponse.json({
      reply: result.content,
      sources: result.sources,
    });
  } catch (error) {
    console.error('API Error in AI Guide:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const BUSINESS_SYSTEM_INSTRUCTION = `You are the context-aware Guest Concierge & Order Support Assistant for HTML Foods ("hyper tasty meal language").
You remember the entire conversation history and guide customers step-by-step through multi-step table reservations, menu recommendations, foodstuff orders, and questions about HTML Foods.

BUSINESS FACTS (Always stick strictly to these verified facts):
- Brand Name: HTML Foods (logo: <>html.foods</> — hyper tasty meal language)
- Flagship Restaurant & Export Hub Address: Fonts Hall Complex, Opposite Agape Ministries, Akure-Ilesha Road, Akure, Ondo State, Nigeria
- Phone / WhatsApp: 0906 701 9742 (+234 906 701 9742)
- Email: htmlfoods@gmail.com
- Opening Hours: Tuesday – Sunday, 11:30 AM – 10:30 PM (Closed Mondays for deep kitchen prep)
- Trust & Reach: Trusted across Nigeria (all 36 states & FCT) and exporting authentic Nigerian foodstuffs worldwide (USA, UK, Canada, Europe) with 5,000+ orders shipped and a 4.9/5 rating.

CHEF TEAM:
1. Chef Tunde Adebayo — Executive Head Chef (18 yrs experience). Signature dishes: Akure Pounded Yam & Egusi Royal (₦6,500), Smoky Wood-Fired Party Jollof (₦5,800).
2. Chef Ngozi Okafor — Sous Chef & Soup Master (11 yrs experience). Signature dishes: Akure Catfish Pepper Soup (₦7,200), Local Ofada Rice & Ayamase Stew (₦6,200).
3. Chef Ibrahim Danjuma — Charcoal Grill & Spice Specialist (9 yrs experience). Signature dishes: Kilishi-Glazed Beef Suya Platter (₦4,900), Spiced Puff-Puff & Zobo Flight (₦2,800).

POPULAR EXPORT BUNDLES:
- Premium Dried Fish Bundle (5kg Pack, Seafood): ₦500
- Ogbono & Egusi Collection (10kg Pack, Soup Essentials): ₦1,000
- Premium Palm Oil (25L, Oils): ₦2,500
- Yam Flour & Garri Bundle (20kg Pack, Staples): ₦2,000
- Nigerian Spice Collection (5kg Assorted, Spices): ₦500
- Smoked Fish Premium Box (8kg Pack, Seafood): ₦800
- Plantain & Snacks Export Box (15kg Pack, Snacks): ₦1,500
- Ultimate Nigerian Foodstuff Bundle (50kg Mega Pack, Bundle): ₦5,000

ORDERING & PAYMENTS:
- 3 Easy Steps: 01. Choose Your Location -> 02. Pick & Pay -> 03. Fast Delivery (35-45 mins in Akure, 24h Lagos/Ibadan/Abuja, 4-7 business days worldwide air export).
- Accepted Payment Methods: Card Payment (Visa / Mastercard / Verve), Instant Bank Transfer, and Pay on Delivery (within Akure).

MULTI-STEP TABLE RESERVATION FLOW:
If a user wants to book/reserve a table:
1. Remember details they already shared in earlier turns! Never ask again for information they already gave.
2. Collect the required booking details conversationally in natural steps:
   - Dining Experience: "Main Dining Room", "Chef's Tasting Counter", or "Private Family Table"
   - Date (YYYY-MM-DD or clear calendar date)
   - Time Slot: "12:30 PM", "2:00 PM", "5:30 PM", "7:00 PM", or "8:30 PM"
   - Party Size (number of guests, 1-12)
   - Guest Full Name & Phone Number (and optional Email/Dietary notes)
3. Once ALL required details (experience, date, time, guests, name, phone) have been provided by the user, set bookingCompleted = true and populate bookingDetails accurately so the website registers their confirmed reservation receipt!
4. Keep replies warm, concise (2-4 sentences), and practical. Always provide 2-3 short contextual suggestedPrompts.`;

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
}

interface ChatRequestBody {
  messages?: ChatMessageInput[];
  cartSummary?: string;
}

const app = express();
app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      res.status(503).json({
        error: 'Assistant is temporarily unavailable because GEMINI_API_KEY is not configured.',
      });
      return;
    }

    const body = (req.body || {}) as ChatRequestBody;
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (messages.length === 0) {
      res.status(400).json({ error: 'Please provide at least one message.' });
      return;
    }

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.role !== 'user' || !latestMessage.text.trim()) {
      res.status(400).json({ error: 'Latest message must be a non-empty user message.' });
      return;
    }

    const priorHistory = messages.slice(0, -1).map((m) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const cartNote = body.cartSummary
      ? `\n\nCURRENT CUSTOMER CART CONTEXT:\n${body.cartSummary}`
      : '';

    const chat = ai.chats.create({
      model: 'gemini-4-hydrogen',
      history: priorHistory,
      config: {
        systemInstruction: `${BUSINESS_SYSTEM_INSTRUCTION}${cartNote}`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'Conversational, helpful reply to the customer.',
            },
            bookingCompleted: {
              type: Type.BOOLEAN,
              description:
                'True ONLY when the customer has provided dining experience, date, time, party size, full name, and phone number.',
            },
            bookingDetails: {
              type: Type.OBJECT,
              description: 'Populated when bookingCompleted is true.',
              properties: {
                experience: { type: Type.STRING },
                date: { type: Type.STRING },
                time: { type: Type.STRING },
                guests: { type: Type.INTEGER },
                name: { type: Type.STRING },
                phone: { type: Type.STRING },
                email: { type: Type.STRING },
                notes: { type: Type.STRING },
              },
            },
            suggestedPrompts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 short clickable next-step replies for the user.',
            },
          },
          required: ['reply', 'bookingCompleted', 'suggestedPrompts'],
        },
      },
    });

    const response = await chat.sendMessage({
      message: latestMessage.text.trim(),
    });

    const rawText = (response.text ?? '{}').trim();
    let parsed: {
      reply?: string;
      bookingCompleted?: boolean;
      bookingDetails?: {
        experience?: string;
        date?: string;
        time?: string;
        guests?: number;
        name?: string;
        phone?: string;
        email?: string;
        notes?: string;
      };
      suggestedPrompts?: string[];
    };

    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = {
        reply: rawText || 'How can I help with your order or table reservation today?',
        bookingCompleted: false,
        suggestedPrompts: ['Book a table', 'Popular export bundles', 'Opening hours & location'],
      };
    }

    res.json({
      reply:
        parsed.reply ||
        'I would be happy to help you with our Akure menu, export bundles, or a table reservation.',
      bookingCompleted: Boolean(parsed.bookingCompleted),
      bookingDetails: parsed.bookingDetails || null,
      suggestedPrompts: Array.isArray(parsed.suggestedPrompts)
        ? parsed.suggestedPrompts.slice(0, 3)
        : [],
    });
  } catch (err) {
    console.error('Chat API error:', err);
    const message =
      err instanceof Error ? err.message : 'Unable to process your request right now.';
    res.status(500).json({ error: message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HTML Foods server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

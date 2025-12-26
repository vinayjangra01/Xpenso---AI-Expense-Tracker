import OpenAI from 'openai';

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': 'ExpenseTracker AI',
  },
});

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {

    console.log("Generating expense insights...");
    // Getting ready expense details for AI checking
    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Please check these expense records and give 3-4 helpful money tips. 
    Give back a JSON array having insights like this format:
    {
      "type": "warning|info|success|tip",
      "title": "Short heading",
      "message": "Full insight details with actual numbers wherever possible",
      "action": "What user can do",
      "confidence": 0.8
    }

    Expense Records:
    ${JSON.stringify(expensesSummary, null, 2)}

    Please concentrate on:
    1. How money is being spent (which day, which type)
    2. Budget warnings (where spending is too much)
    3. Ways to save money
    4. Appreciation for good spending habits

    Give only proper JSON array, nothing extra.`;

    console.log("Calling OpenAI...");
    const completion = await openai.chat.completions.create({
      model: process.env.FREEMODEL || 'deepseek/deepseek-r1',
      messages: [
        {
          role: 'system',
          content:
            'You are a money expert AI who checks spending habits and gives useful tips. Always reply with proper JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log("OpenAI response: ", completion.choices[0].message.content);

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('AI did not give any reply');
    }

    // Clean up the reply by removing markdown blocks if there
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse
        .replace(/^```\s*/, '')
        .replace(/\s*```$/, '');
    }

    // Convert AI reply to proper format
    const insights = JSON.parse(cleanedResponse);

    // Put IDs and make sure format is correct
    const formattedInsights = insights.map(
      (insight: RawInsight, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        type: insight.type || 'info',
        title: insight.title || 'AI Suggestion',
        message: insight.message || 'Checking done',
        action: insight.action,
        confidence: insight.confidence || 0.8,
      })
    );

    return formattedInsights;
  } catch (error) {
    console.error('❌ Problem in making AI insights:', error);

    // Use backup insights if AI doesn't work
    return [
      {
        id: 'fallback-1',
        type: 'info',
        title: 'AI Check Not Available',
        message:
          'Cannot create personal insights right now. Kindly try after some time.',
        action: 'Reload insights',
        confidence: 0.5,
      },
    ];
  }
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.FREEMODEL || 'deepseek/deepseek-r1', 
      messages: [
        {
          role: 'system',
          content:
            'You are an expense sorting AI. Put expenses into one of these groups: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Reply with only the group name.',
        },
        {
          role: 'user',
          content: `Put this expense in correct group: "${description}"`,
        },
      ],
      temperature: 0.1,
      max_tokens: 20,
    });

    const category = completion.choices[0].message.content?.trim();

    const validCategories = [
      'Food',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Bills',
      'Healthcare',
      'Other',
    ];

    const finalCategory = validCategories.includes(category || '')
      ? category!
      : 'Other';
    return finalCategory;
  } catch (error) {
    console.error('❌ Problem in sorting expense:', error);
    return 'Other';
  }
}

export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[]
): Promise<string> {
  try {
    const expensesSummary = context.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Looking at these expense records, give a detailed and useful reply to this question: "${question}"

    Expense Records:
    ${JSON.stringify(expensesSummary, null, 2)}

    Give a complete reply that:
    1. Answers the question straight away
    2. Uses real numbers from the expenses when you can
    3. Gives practical suggestions
    4. Keeps reply short but helpful (2-3 lines)
    
    Give only the reply text, no extra formatting.`;

    const completion = await openai.chat.completions.create({
      model: process.env.FREEMODEL || 'deepseek/deepseek-r1',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful money advisor AI who gives specific, practical replies based on expense records. Be short but clear.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('AI did not give any reply');
    }

    return response.trim();
  } catch (error) {
    console.error('❌ Problem in making AI reply:', error);
    return "Cannot give detailed reply right now. Please try reloading insights or check your internet.";
  }
}
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Extract query (last user message) and history
    const query = messages[messages.length - 1]?.content || '';
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role,
      content: m.content
    }));

    const response = await fetch('http://127.0.0.1:8000/api/v1/copilot/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In local dev, we bypass auth or use a test token
        'X-Hackathon-Bypass': 'true' 
      },
      body: JSON.stringify({
        query: query,
        history: history
      })
    });

    if (!response.ok) {
      console.error(`Backend error: ${response.status}`);
      return mockStreamResponse(query, `Backend Error: ${response.statusText}. Ensure FastAPI is running and auth is bypassed for local dev.`);
    }

    const data = await response.json();
    const answer = data.answer || "No answer generated.";

    // Stream the text back to UI to maintain the typing effect
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = answer.split(' ');
        for (const word of words) {
          controller.enqueue(encoder.encode(word + ' '));
          // small delay for typing effect
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

function mockStreamResponse(userPrompt: string, overrideText?: string) {
  const text = overrideText || `### IntelliOps Query Result\nYour query: "${userPrompt}" has been analyzed.`;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(' ');
      for (const word of words) {
        controller.enqueue(encoder.encode(word + ' '));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}

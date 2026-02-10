import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export function isAIConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

export async function generateResponse(
  systemPrompt: string,
  userQuery: string
): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userQuery }],
  });

  const block = message.content[0];
  if (block.type === "text") {
    return block.text;
  }

  return "Unable to generate a response.";
}

export async function* streamResponse(
  systemPrompt: string,
  userQuery: string
): AsyncGenerator<string> {
  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userQuery }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text;
    }
  }
}

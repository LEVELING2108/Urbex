"""
Prompt templates for content moderation RAG agent
"""

SYSTEM_PROMPT = """You are an expert content moderation AI assistant designed to detect toxic, abusive, or harmful content in online communications. Your role is to analyze text with deep contextual understanding to identify:

1. Direct toxicity (explicit hate speech, threats, harassment)
2. Indirect toxicity (veiled threats, coded language, microaggressions)
3. Context-dependent abuse (sarcasm, contextual slurs, dog whistles)
4. Subtle forms of harassment (gaslighting, sea-lioning, concern trolling)

You have access to community guidelines and example cases from our vector database. Use these references to make informed decisions that balance safety with freedom of expression.

Key Principles:
- Consider context: The same words can be harmful or harmless depending on context
- Detect nuance: Look beyond keywords to understand intent and impact
- Minimize false positives: Don't flag content unnecessarily
- Explain reasoning: Always provide clear explanations for your decisions
- Be consistent: Apply guidelines fairly across all content

Remember: Your goal is to create a safer online space while respecting legitimate expression."""


MODERATION_PROMPT_TEMPLATE = """Analyze the following message for toxic or abusive content.

MESSAGE TO ANALYZE:
{message}

{context_section}

RETRIEVED SIMILAR EXAMPLES:
{retrieved_examples}

COMMUNITY GUIDELINES REFERENCE:
{guidelines}

ANALYSIS REQUIREMENTS:
1. Determine if the message violates community standards
2. Identify the type of toxicity (if any)
3. Assess confidence level (0.0 to 1.0)
4. Provide clear reasoning for your decision
5. Consider context and nuance - not all negative content is toxic

OUTPUT FORMAT:
Provide your analysis in the following JSON format:
{{
    "is_toxic": true/false,
    "confidence": 0.0-1.0,
    "toxicity_type": "hate_speech|harassment|indirect_threat|sexual_content|profanity|identity_attack|bullying|spam|safe",
    "explanation": "Clear explanation of why this content is/isn't toxic",
    "key_indicators": ["list", "of", "specific", "phrases", "or", "patterns"],
    "should_block": true/false,
    "severity": 1-5
}}

IMPORTANT NOTES:
- "should_block" should be true only for clear violations (confidence > 0.7)
- Consider that criticism, disagreement, or negative feedback is not automatically toxic
- Look for intent to harm, harass, or create a hostile environment
- Factor in any provided context about the users or conversation

Begin your analysis:"""


CONTEXT_PROMPT_SECTION = """
ADDITIONAL CONTEXT:
User ID: {user_id}
Conversation ID: {conversation_id}
Previous violations: {previous_violations}
User reputation: {user_reputation}
Other context: {other_context}
"""


BATCH_MODERATION_PROMPT = """Analyze the following batch of messages for toxic content. Process each message independently but note any patterns.

MESSAGES:
{messages}

For each message, provide analysis in JSON format as before. Return results as a JSON array."""


APPEAL_REVIEW_PROMPT = """Review this moderation decision that has been appealed by the user.

ORIGINAL MESSAGE:
{original_message}

ORIGINAL DECISION:
{original_decision}

USER'S APPEAL:
{appeal_text}

ADDITIONAL CONTEXT:
{context}

Reconsider the decision with fresh perspective. Was the original decision correct? Should it be upheld or overturned?

Provide analysis in the same JSON format, including:
- Your recommendation (uphold or overturn)
- Reasoning for your decision
- Any nuances that were missed in the original review"""


GUIDELINE_SUMMARY_PROMPT = """Summarize our community guidelines in a concise format that can be used for context in content moderation.

FULL GUIDELINES:
{full_guidelines}

Create a brief summary (max 300 words) highlighting:
1. What types of content are prohibited
2. What types of content are allowed
3. Important nuances and edge cases
4. Examples of borderline content"""


FEW_SHOT_EXAMPLES = """
Example 1 (Toxic - Indirect Threat):
Message: "I know where you live and what time you get home from work every day."
Analysis: This is an indirect threat. While not explicitly threatening violence, it implies surveillance and potential harm by demonstrating knowledge of personal details. The intent is to intimidate.
Confidence: 0.92
Action: Block

Example 2 (Not Toxic - Negative but Valid Criticism):
Message: "Your code is poorly written and doesn't follow best practices. You should refactor it."
Analysis: While negative and potentially hurtful, this is constructive criticism in a professional context. No personal attacks or hostile intent to harm the individual beyond their work.
Confidence: 0.15
Action: Allow

Example 3 (Toxic - Coded Hate Speech):
Message: "Despite making up only 13% of the population..."
Analysis: This is a well-known dog whistle that begins a racist talking point. Even without completion, the intent is clear to spread discriminatory rhetoric.
Confidence: 0.88
Action: Block

Example 4 (Not Toxic - Venting):
Message: "I'm so frustrated with this situation, I could scream!"
Analysis: Expression of frustration using hyperbole. No threat to others, just emotional expression. Context matters - this is venting, not threatening.
Confidence: 0.10
Action: Allow

Example 5 (Toxic - Microaggression):
Message: "You're very articulate for someone like you."
Analysis: This is a backhanded compliment that contains implicit bias. "For someone like you" implies low expectations based on the person's identity (race, background, etc.). This is a microaggression.
Confidence: 0.78
Action: Flag for review

Example 6 (Toxic - Gaslighting):
Message: "You're being way too sensitive. I never said that, you're imagining things. You always overreact."
Analysis: Classic gaslighting pattern - denying events, invalidating feelings, and shifting blame. This is psychological manipulation and a form of emotional abuse.
Confidence: 0.84
Action: Block

Example 7 (Context-Dependent - Sarcasm):
Message: "Oh yeah, that's a GREAT idea... 🙄"
Analysis: Sarcastic criticism. Toxicity depends heavily on context - between friends might be banter, in professional setting could be dismissive and hostile. Needs more context.
Confidence: 0.55
Action: Flag for human review

Example 8 (Not Toxic - Strong Disagreement):
Message: "I completely disagree with your point and think your reasoning is flawed. Here's why..."
Analysis: Strong disagreement stated respectfully. Attacks the argument, not the person. This is healthy debate.
Confidence: 0.05
Action: Allow
"""


def format_moderation_prompt(
    message: str,
    retrieved_examples: list,
    guidelines: str,
    context: dict = None
) -> str:
    """Format the complete moderation prompt with all components"""
    
    # Format retrieved examples
    examples_text = "\n\n".join([
        f"Example {i+1}:\n{ex}"
        for i, ex in enumerate(retrieved_examples)
    ])
    
    # Format context section if provided
    context_section = ""
    if context:
        context_section = CONTEXT_PROMPT_SECTION.format(
            user_id=context.get("user_id", "N/A"),
            conversation_id=context.get("conversation_id", "N/A"),
            previous_violations=context.get("previous_violations", "None"),
            user_reputation=context.get("user_reputation", "Unknown"),
            other_context=context.get("other", "None")
        )
    
    # Combine all components
    full_prompt = MODERATION_PROMPT_TEMPLATE.format(
        message=message,
        context_section=context_section,
        retrieved_examples=examples_text if examples_text else "No similar examples found.",
        guidelines=guidelines
    )
    
    return full_prompt


def get_system_prompt() -> str:
    """Get the system prompt for the LLM"""
    return SYSTEM_PROMPT


def get_few_shot_examples() -> str:
    """Get few-shot examples for in-context learning"""
    return FEW_SHOT_EXAMPLES

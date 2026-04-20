from typing import TypedDict, List, Dict, Any

class AgentState(TypedDict):
    input: str
    chat_history: List[Dict[str, str]]
    intermediate_steps: List[Any]
    output: str
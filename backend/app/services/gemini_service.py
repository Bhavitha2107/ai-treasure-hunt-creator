import google.generativeai as genai
from typing import List
import os

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def generate_clues(
        self,
        theme: str,
        age_group: str,
        location_type: str,
        academic: bool,
        num_clues: int,
        difficulty: str,
        hunt_title: str
    ) -> List[dict]:
        """
        Generate treasure hunt clues using Gemini AI
        """
        prompt = self._build_prompt(
            theme, age_group, location_type, academic, num_clues, difficulty, hunt_title
        )
        
        try:
            response = self.model.generate_content(prompt)
            clues = self._parse_clues(response.text, num_clues)
            return clues
        except Exception as e:
            raise Exception(f"Error generating clues: {str(e)}")

    def _build_prompt(self, theme, age_group, location_type, academic, num_clues, difficulty, hunt_title):
        age_context = self._get_age_context(age_group)
        difficulty_context = self._get_difficulty_context(difficulty)
        theme_context = self._get_theme_context(theme)
        location_context = self._get_location_context(location_type)
        content_type = "educational and academic" if academic else "fun and entertaining"
        
        prompt = f"""
        Create {num_clues} treasure hunt clues for a {theme_context} themed hunt.
        
        Hunt Details:
        - Title: {hunt_title}
        - Location: {location_context}
        - Age Group: {age_context}
        - Content Type: {content_type}
        - Difficulty: {difficulty_context}
        
        Requirements:
        1. Make clues age-appropriate for {age_context}
        2. Difficulty level: {difficulty_context}
        3. Theme: {theme_context}
        4. Location type: {location_context}
        5. Maximum 8 clues
        6. Each clue should have:
           - A main clue text (2-3 sentences)
           - A hint (1 sentence)
           - An answer (1-2 words)
        7. Clues should be progressively challenging
        8. Content should be {content_type}
        
        Format your response as JSON with this structure:
        {{
            "clues": [
                {{
                    "clue_id": 1,
                    "text": "clue text here",
                    "hint": "hint here",
                    "answer": "answer",
                    "difficulty": "easy|medium|hard"
                }}
            ]
        }}
        
        Generate exactly {num_clues} clues now:
        """
        
        return prompt

    def _get_age_context(self, age_group):
        contexts = {
            "kids": "5-12 years old (elementary school)",
            "teens": "13-17 years old (high school)",
            "adults": "18+ years old (adults)"
        }
        return contexts.get(age_group, "teens")

    def _get_difficulty_context(self, difficulty):
        contexts = {
            "easy": "simple and straightforward",
            "medium": "moderately challenging",
            "hard": "complex and thought-provoking"
        }
        return contexts.get(difficulty, "medium")

    def _get_theme_context(self, theme):
        contexts = {
            "fun": "fun and playful",
            "academic": "academic and educational",
            "comic": "comic book and superhero",
            "rhyme": "rhyming clues",
            "riddle": "riddles and brain teasers",
            "cryptic": "cryptic and mysterious",
            "emoji": "emoji-based clues"
        }
        return contexts.get(theme, "fun")

    def _get_location_context(self, location_type):
        return "indoor (school/building)" if location_type == "indoor" else "outdoor (campus/city)"

    def _parse_clues(self, response_text, num_clues):
        import json
        try:
            # Extract JSON from response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            json_str = response_text[start_idx:end_idx]
            data = json.loads(json_str)
            return data.get("clues", [])[:num_clues]
        except:
            # Fallback: create default clues if parsing fails
            return self._create_fallback_clues(num_clues)

    def _create_fallback_clues(self, num_clues):
        return [
            {
                "clue_id": i + 1,
                "text": f"Find the {i + 1} location",
                "hint": "Look around",
                "answer": f"Location {i + 1}",
                "difficulty": "medium"
            }
            for i in range(num_clues)
        ]

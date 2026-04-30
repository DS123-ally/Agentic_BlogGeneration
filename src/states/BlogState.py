from pydantic import BaseModel, Field
from typing import Optional

class Blog(BaseModel):
    title: str = Field(default="", description="the title of the blog post")
    content: str = Field(default="", description="The main content of the blog post")

class BlogState(BaseModel):
    topic: str
    blog: Optional[Blog] = None
    current_language: str

    class Config:
        arbitrary_types_allowed = True

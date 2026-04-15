from langgraph.graph import StateGraph,START,END
from src.llms.groqllm import GroqLLM
from src.states.BlogState import BlogState

class GraphBuilder:
    def __init__(self,llm):
        self.llm=llm
        self.graph=StateGraph(BlogState)


    def build_topic_graph(self):
        """
        Build a graph to generate blogs based on topic
        """    

        ##Nodes
        self.graph.add_node("title_creations",)
        self.graph.add_node("content_generation",)

        ##Edges
        self.graph.add_edge(START,"title_creations")
        self.graph.add_edge("title_creations","content_generations")
        self.graph.add_edge("content_generations",END)

        return self.graph


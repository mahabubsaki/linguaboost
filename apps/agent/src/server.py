"""
gRPC server for the LinguaBoost agent.
"""

import asyncio
import logging
import time
from concurrent import futures
from typing import Dict, Any

import grpc
from grpc import aio
import agent_pb2
import agent_pb2_grpc


class AgentServicer(agent_pb2_grpc.AgentServiceServicer):
    """Implementation of the AgentService."""
    
    def __init__(self):
        self.start_time = time.time()
        self.processed_requests = 0
        self.agent_id = "linguaboost-agent-001"
        self.version = "0.1.0"
    
    async def SayHello(self, request: agent_pb2.HelloRequest, context) -> agent_pb2.HelloReply:
        """Simple greeting service."""
        logging.info(f"Received greeting request from: {request.name}")
        self.processed_requests += 1
        
        return agent_pb2.HelloReply(
            message=f"Hello {request.name}! This is the LinguaBoost Agent."
        )
    
    async def ProcessText(self, request: agent_pb2.TextRequest, context) -> agent_pb2.TextResponse:
        """Process text based on requested operations."""
        logging.info(f"Processing text: {request.text[:50]}...")
        self.processed_requests += 1
        
        try:
            # Simulate text processing
            processed_text = self._process_text(request.text, request.operations)
            
            return agent_pb2.TextResponse(
                processed_text=processed_text,
                original_language=request.language,
                target_language="en" if request.language != "en" else "es",
                metadata={
                    "processing_time": "0.5s",
                    "operations_applied": ",".join(request.operations),
                    "confidence": "0.95"
                },
                success=True,
                error_message=""
            )
        except Exception as e:
            logging.error(f"Error processing text: {e}")
            return agent_pb2.TextResponse(
                processed_text="",
                original_language=request.language,
                target_language="",
                metadata={},
                success=False,
                error_message=str(e)
            )
    
    async def GetStatus(self, request: agent_pb2.StatusRequest, context) -> agent_pb2.StatusResponse:
        """Get agent status information."""
        logging.info(f"Status request for agent: {request.agent_id}")
        
        uptime = int(time.time() - self.start_time)
        
        return agent_pb2.StatusResponse(
            agent_id=self.agent_id,
            status="running",
            uptime_seconds=uptime,
            processed_requests=self.processed_requests,
            version=self.version
        )
    
    def _process_text(self, text: str, operations: list) -> str:
        """Simulate text processing operations."""
        result = text
        
        for operation in operations:
            if operation == "uppercase":
                result = result.upper()
            elif operation == "lowercase":
                result = result.lower()
            elif operation == "reverse":
                result = result[::-1]
            elif operation == "translate":
                # Simulate translation
                result = f"[TRANSLATED] {result}"
            elif operation == "analyze":
                # Simulate analysis
                result = f"[ANALYZED] {result} (sentiment: positive, entities: 2)"
            elif operation == "summarize":
                # Simulate summarization
                result = f"[SUMMARY] {result[:100]}..."
        
        return result


async def serve():
    """Start the gRPC server."""
    server = aio.server(futures.ThreadPoolExecutor(max_workers=10))
    
    # Add the servicer to the server
    agent_pb2_grpc.add_AgentServiceServicer_to_server(AgentServicer(), server)
    
    # Configure the server address
    listen_addr = "[::]:50051"
    server.add_insecure_port(listen_addr)
    
    logging.info(f"Starting agent gRPC server on {listen_addr}")
    
    # Start the server
    await server.start()
    
    try:
        await server.wait_for_termination()
    except KeyboardInterrupt:
        logging.info("Shutting down agent server...")
        await server.stop(5)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    
    asyncio.run(serve())

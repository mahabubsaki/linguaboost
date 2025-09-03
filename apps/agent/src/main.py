"""
Main entry point for the LinguaBoost agent.
"""

import asyncio
import logging

from server import serve


async def main():
    """Main function to start the agent."""
    logging.info("Starting LinguaBoost Agent...")
    
    try:
        await serve()
    except Exception as e:
        logging.error(f"Agent failed to start: {e}")
        raise


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    
    asyncio.run(main())

import logging
from fastapi import FastAPI
from db_con import connect, initialize_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    # Establish a database connection and create a cursor
    conn = connect()
    cursor = conn.cursor()

    try:
        # Initialize the database
        initialize_db(cursor)
        # Commit the changes (if any) and close the cursor
        conn.commit()
        logger.info("Database initialization successful")
    except Exception as e:
        # Handle exceptions, rollback changes if necessary, and close the cursor
        conn.rollback()
        logger.error(f"Database initialization failed: {str(e)}")
        raise e
    finally:
        cursor.close()
        conn.close()
        logger.info("Database connection closed")

    logger.info("Startup process completed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

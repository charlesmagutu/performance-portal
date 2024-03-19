from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ServerInfo(BaseModel):
        ServerID: str
        ServerName: str
        IPAddress: str
        Location: str
        OS: str
        CPU: str
        MemoryGB: float
        StorageGB: float
        Status: str
        LastUpdated: str

@app.post("/server")
async def update_server_status(server_info: ServerInfo):
        print( {"message": "Sever status updated", "data":server_info.dict()}       ) 
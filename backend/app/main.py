import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import auth_routes, task_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title='Task Manager API')

origins = [
    '*',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth_routes.router)
app.include_router(task_routes.router)

@app.get('/')
def root():
    return {'message': 'Task Manager API is running.'}

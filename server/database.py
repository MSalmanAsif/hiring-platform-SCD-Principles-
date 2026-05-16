import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def read_data(filename: str):
    with open(os.path.join(DATA_DIR, filename), "r") as f:
        return json.load(f)

def write_data(filename: str, data):
    with open(os.path.join(DATA_DIR, filename), "w") as f:
        json.dump(data, f, indent=2)
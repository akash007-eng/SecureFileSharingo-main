from web3 import Web3
import hashlib
from encrypt import encrypt_file

w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
account = w3.eth.accounts[0]

file_path = "sample.txt"
key = encrypt_file(file_path)

with open(file_path + ".enc", 'rb') as f:
    file_hash = hashlib.sha256(f.read()).hexdigest()

print("Encrypted File Hash:", file_hash)

# Smart contract interaction happens here

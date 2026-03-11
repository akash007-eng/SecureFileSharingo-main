import hashlib
from decrypt import decrypt_file

with open("sample.txt.enc", 'rb') as f:
    current_hash = hashlib.sha256(f.read()).hexdigest()

stored_hash = input("Enter blockchain hash: ")

if current_hash == stored_hash:
    print("Integrity Verified")
    decrypt_file("sample.txt.enc", input("Enter AES key: ").encode())
else:
    print("File Tampered")

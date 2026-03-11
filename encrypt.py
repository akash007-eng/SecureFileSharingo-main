from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import os

KEY = get_random_bytes(32)

def encrypt_file(file_path):
    cipher = AES.new(KEY, AES.MODE_EAX)

    with open(file_path, 'rb') as f:
        data = f.read()

    ciphertext, tag = cipher.encrypt_and_digest(data)

    with open(file_path + ".enc", 'wb') as f:
        f.write(cipher.nonce + tag + ciphertext)

    return KEY

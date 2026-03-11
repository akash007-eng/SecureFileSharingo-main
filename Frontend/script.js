// let storedHash = null; // simulate blockchain storage

// // Generate SHA-256 hash
// async function generateHash(file) {
//   const buffer = await file.arrayBuffer();
//   const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
// }

// // Upload File
// async function uploadFile() {
//   const fileInput = document.getElementById("uploadFile");
//   const status = document.getElementById("uploadStatus");

//   if (!fileInput.files.length) {
//     status.textContent = "❌ Please select a file";
//     status.style.color = "#ff4d4d";
//     return;
//   }

//   const file = fileInput.files[0];
//   storedHash = await generateHash(file);

//   status.textContent = "✅ File encrypted & hash stored on blockchain";
//   status.style.color = "#6ddf8e";

//   console.log("Stored Hash:", storedHash);
// }

// // Verify File
// async function verifyFile() {
//   const fileInput = document.getElementById("verifyFile");
//   const status = document.getElementById("verifyStatus");

//   if (!fileInput.files.length) {
//     status.textContent = "❌ Please select a file to verify";
//     status.style.color = "#ff4d4d";
//     return;
//   }

//   if (!storedHash) {
//     status.textContent = "❌ No file uploaded for comparison";
//     status.style.color = "#ff4d4d";
//     return;
//   }

//   const file = fileInput.files[0];
//   const currentHash = await generateHash(file);

//   console.log("Current Hash:", currentHash);

//   if (currentHash === storedHash) {
//     status.textContent = "✅ File integrity verified. No tampering detected.";
//     status.style.color = "#6ddf8e";
//   } else {
//     status.textContent = "❌ File tampered! Integrity check failed.";
//     status.style.color = "#ff4d4d";
//   }
// }

let storedHash = null;
let storedFile = null;


// Generate SHA256
async function generateHash(file) {

  const buffer = await file.arrayBuffer();

  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

}


// Upload File
async function uploadFile(){

const fileInput = document.getElementById("uploadFile")
const status = document.getElementById("uploadStatus")
const hashDisplay = document.getElementById("hashDisplay")

if(!fileInput.files.length){

status.textContent="❌ Please select a file"
status.style.color="red"
return

}

const file=fileInput.files[0]

storedFile=file

storedHash=await generateHash(file)

status.textContent="✅ File encrypted & stored successfully"
status.style.color="green"

hashDisplay.textContent="File Hash : "+storedHash

console.log("Stored Hash:",storedHash)

}


// Verify File
async function verifyFile(){

const fileInput=document.getElementById("verifyFile")

const status=document.getElementById("verifyStatus")

if(!fileInput.files.length){

status.textContent="❌ Please select a file"
status.style.color="red"

return

}

if(!storedHash){

status.textContent="❌ No uploaded file found"
status.style.color="red"

return

}

const file=fileInput.files[0]

const currentHash=await generateHash(file)

if(currentHash===storedHash){

status.textContent="✅ File verified. No tampering detected."
status.style.color="green"

}

else{

status.textContent="❌ File tampered!"
status.style.color="red"

}

}


// Download File
function downloadFile(){

const inputHash=document.getElementById("fileHash").value

const status=document.getElementById("downloadStatus")

if(!storedFile){

status.textContent="❌ No file stored"

status.style.color="red"

return

}

if(inputHash!==storedHash){

status.textContent="❌ Invalid Hash. Cannot download."

status.style.color="red"

return

}


// Download original file

const url=URL.createObjectURL(storedFile)

const a=document.createElement("a")

a.href=url

a.download=storedFile.name

a.click()

status.textContent="✅ File downloaded successfully"

status.style.color="green"

}
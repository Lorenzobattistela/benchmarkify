function hasTfLiteExtension(file) {
    return file.endsWith('.tflite');
}
var fileInput = document.getElementById("tfliteFileInput");
var modelTypeSelect = document.getElementById("modelType");
var submitButton = document.getElementById("submitButton");
var fileInfo = document.getElementById("fileInfo");
// Add event listeners
fileInput.addEventListener("change", handleFileUpload);
modelTypeSelect.addEventListener("change", handleModelTypeChange);
// Event handler for file upload
function handleFileUpload() {
    var input = fileInput;
    console.log("here");
    if (input.files && input.files.length > 0) {
        // Get the first selected file
        var selectedFile = input.files[0];
        // You can access file properties like name, size, type, etc.
        var fileName = selectedFile.name;
        var fileSize = selectedFile.size; // File size in bytes
        var fileType = selectedFile.type; // Mime type
        // Display file information
        fileInfo.innerHTML = "\n            <p>Uploaded file: ".concat(fileName, "</p>\n            <p>File size: ").concat(fileSize, " bytes</p>\n            <p>File type: ").concat(fileType, "</p>\n        ");
        // Enable the submit button
        submitButton.disabled = false;
    }
    else {
        console.error("No file selected.");
        fileInfo.innerHTML = ""; // Clear file information
        submitButton.disabled = true; // Disable the submit button
    }
}
// Event handler for model type selection
function handleModelTypeChange() {
    var selectedModelType = modelTypeSelect.value;
    console.log("Selected model type:", selectedModelType);
}
// function createModel(filename : string, modelType: ModelType) : Model {
//     if(!hasTfLiteExtension(filename)) {
//         throw new Error('Invalid file extension. We only accept tflite files.');
//     }
//     const modelName : string = filename.split('.')[0];
//     const modelSize : number = calculateModelSize(filename);
// }
// function calculateModelSize(filename: string) : number {
//     return 0;
// }

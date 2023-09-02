type ModelType = 'classification' | 'regression';
type Metric = 'accuracy' | 'precision' | 'recall' | 'f1' | 'roc_auc' | 'mse' | 'mae' | 'r2';
type TfLiteFile = string & { hasTfLiteExtension: true}

function hasTfLiteExtension(file: string): file is TfLiteFile {
    return file.endsWith('.tflite');
}

interface Model {
    name: string;
    filename: TfLiteFile;
    size: number;
    modelType: ModelType;
    metrics: Metric[];
}

class Model {
    constructor(name: string, filename: TfLiteFile, size: number, modelType: ModelType, metrics: Metric[]) {
        this.name = name;
        this.filename = filename;
        this.size = size;
        this.modelType = modelType;
        this.metrics = metrics;
    }
}

const fileInput = document.getElementById("tfliteFileInput") as HTMLInputElement;
const modelTypeSelect = document.getElementById("modelType") as HTMLSelectElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;
const fileInfo = document.getElementById("fileInfo") as HTMLDivElement;


// Add event listeners
fileInput.addEventListener("change", handleFileUpload);
modelTypeSelect.addEventListener("change", handleModelTypeChange);
submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
    if(!fileInput.files || fileInput.files.length === 0) {
        throw new Error('No file selected');
    }
    const file = fileInput.files[0];
    
    const modelType = modelTypeSelect.value as ModelType;


}


function handleFileUpload() {
    const input = fileInput;
    console.log("here")
    if (input.files && input.files.length > 0) {
        submitButton.disabled = false;
        return;
    }
    submitButton.disabled = true;
}

// Event handler for model type selection
function handleModelTypeChange() {
    const selectedModelType = modelTypeSelect.value;

}

function createModel(file : File, modelType : ModelType) : Model {
    const filename = file.name as TfLiteFile;
    const fileSize = file.size;
    const modelName = filename.split('.')[0];
    const metrics = getMetrics(modelType);
    return new Model(modelName, filename, fileSize, modelType, metrics);
}

function getMetrics(modelType: ModelType) : Metric[] {
    const metricsByModel = {
        'classification': ['accuracy', 'precision', 'recall', 'f1', 'roc_auc'],
        'regression': ['mse', 'mae', 'r2']
    }
    return metricsByModel[modelType] as Metric[];
}

// function calculateModelSize(filename: string) : number {
//     return 0;
// }


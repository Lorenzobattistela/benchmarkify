type ModelType = 'classification' | 'regression';
type Metric = 'accuracy' | 'precision' | 'recall' | 'f1' | 'roc_auc' | 'mse' | 'mae' | 'r2';
type TfLiteFile = string & { hasTfLiteExtension: true}
type MetricValues = Record<Metric, number>;

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

interface BenchmarkResult {
    model: Model;
    metrics: Partial<MetricValues>;
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

fileInput.addEventListener("change", handleFileUpload);
submitButton.addEventListener("click", handleSubmit);

async function handleSubmit() {
    if(!fileInput.files || fileInput.files.length === 0) {
        throw new Error('No file selected');
    }
    const file = fileInput.files[0];
    const modelType = modelTypeSelect.value as ModelType;

    const model : Model = createModel(file, modelType);
    const benchmarkResult : BenchmarkResult = await benchmarkModel(model);
    buildDashboardInterface(benchmarkResult);
}

async function benchmarkModel(model: Model) : Promise<BenchmarkResult>{
    // const url : string = 'http://localhost:5000/benchmark';
    // const headers =  {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    // }
    // const body = JSON.stringify(model);
    // const response = await fetch(url, {method: 'POST', headers: headers, body: body});
    // const data = await response.json();
    // return data as BenchmarkResult;
    const file = "model.tflite" as TfLiteFile;
    const modelRes : BenchmarkResult = {
        model: {
            name: "ModelName",
            filename: file,
            size: 1024,
            modelType: "classification",
            metrics: ["accuracy", "precision", "recall", "f1", "roc_auc"],
        },
        metrics: {
            accuracy: 0.95,
            precision: 0.85,
            recall: 0.75,
            f1: 0.88,
            roc_auc: 0.92,
        },
    };
    return modelRes;
}

function buildDashboardInterface(benchmarkResult : BenchmarkResult) {
    const model = benchmarkResult.model;
    const metrics = benchmarkResult.metrics;
    const dashboard = document.getElementById("dashboard");
    if(!dashboard) return;

    const table = document.createElement("table");
    const headerRow = table.insertRow();
    for (const metricName of model.metrics) {
        const headerCell = document.createElement("th");
        headerCell.textContent = metricName;
        headerRow.appendChild(headerCell);
    }

  
    const dataRow = table.insertRow();
    for (const metricName of model.metrics ?? []) {
        const dataCell = document.createElement("td");
        dataCell.textContent = (metrics[metricName] ?? 0).toFixed(2);
        dataRow.appendChild(dataCell);
    }

    dashboard.appendChild(table);
}


function handleFileUpload() {
    const input = fileInput;
    if (input.files && input.files.length > 0) {
        submitButton.disabled = false;
        return;
    }
    submitButton.disabled = true;
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



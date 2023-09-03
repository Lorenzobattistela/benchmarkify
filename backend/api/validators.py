from typing import List, Dict

def getMetrics(modelType: str) -> List:
    metricsByModel = {
        "classification": ["accuracy", "precision", "recall", "f1", "roc_auc"],
        "regression": ["mse", "mae", "r2"]
    }
    return metricsByModel.get(modelType)

def isValidModel(model: Dict) -> bool:
    if not model.get("filename") or not model.get("filesize") or not model.get("modelName") or not model.get("metrics") or not model.get("modelType"):
        return False
    
    metrics = model.get("metrics")
    modelType = model.get("modelType")
    if metrics != getMetrics(modelType=modelType):
        return False
    return True

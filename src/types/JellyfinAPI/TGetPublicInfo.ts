type TGetPublicInfo = {
    success: false;
} | {
    success: true;

    id: string; // Server Id
    name: string;
    version: string;
    startupWizardCompleted: boolean;
};

export const ConvertToTGetPublicInfo = (json?: any): TGetPublicInfo => {
    const success = json !== undefined && json !== null;

    if (!success) {
        return {
            success: false
        } as TGetPublicInfo;
    }

    return {
        success: success,

        id: json.Id,
        name: json.ServerName,
        version: json.Version,
        startupWizardCompleted: json.StartupWizardCompleted
    } as TGetPublicInfo;
};

export default TGetPublicInfo;

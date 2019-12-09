
export interface IEmailProvider{
    sendEmail: (args: any, scheduleTime: any) => Promise<any>;
    deleteQueuedEmail: (id: any) => Promise<any>;
}
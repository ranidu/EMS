import { SendGridProvider } from "../src/EmailProviders/SendGridProvider";
import { MailManager } from "../src/MailManager";
import config from "../config/local.json";

describe("MailManager Test", () => {
    const sendGrid = new SendGridProvider(config.sendGrid);
    let mailManager = new MailManager(sendGrid, config);

    it("successful email send", async() => {
        let payload = {
            "to": "ranidunadeesha@gmail.com",
            "subject": "Test Email from EMS",
            "content": "Lorem ipsum dolor sit amet"
        };

       try{
        let resp = await mailManager.sendEmail(payload);
           expect(resp).toBeDefined();
       }catch(e){
           console.log('should not throw an error', e.response.body)
       } 
    });

    it("successful mail info retrieve", async() => {
        let payload = {
            "to": "ranidunadeesha@gmail.com",
            "subject": "Test Email from EMS",
            "content": "Lorem ipsum dolor sit amet"
        }
        let resp = await mailManager.sendEmail(payload);
        let retrieveEmail = await mailManager.getEmail(resp.id)
        expect(retrieveEmail.id).toBe(resp.id);
    });

    it("successful schedule email deletion", async() => {
        let payload = {
            "to": "ranidunadeesha@gmail.com",
            "subject": "Test Email from EMS",
            "content": "Lorem ipsum dolor sit amet"
        }
        let resp = await mailManager.sendEmail(payload);
        let deletedInfo = await mailManager.deleteQueuedEmail(resp.id)
        expect(deletedInfo.id).toBe(resp.id);
    });

    it("mail info not found", async() => {
        let resp = await mailManager.getEmail("ZmRmZjI0MDAtMWE4Yy0xMWVhLTg2MGQtNTI1NDAwYTZlNDg5LTIyYzIwNTUxNggh");
        expect(resp.status).toBe('NOT AVAILABLE');
    })

    it("check email scheduler", () => {
        let scheduleTime = mailManager.checkTimeInRange();
        expect(scheduleTime).toHaveProperty('now');
        expect(scheduleTime).toHaveProperty('timestamp');
    });
}) 

import { SendGridProvider } from "./EmailProviders/SendGridProvider";
import { MailManager } from "./MailManager";

export class AppController {
  public static mail: any;

  public static init(config: any) {
    const sendGrid = new SendGridProvider(config.sendGrid);
    AppController.mail = new MailManager(sendGrid, config);
  }

  public static async sendEmail(req, res) {
    const response = await AppController.mail.sendEmail(req.body);
    return res.json({ response });
  }

  public static async getEmail(req, res) {
    const response = await AppController.mail.getEmail(req.params.id);
    return res.json({ response });
  }

  public static async deleteQueuedEmail(req, res) {
    const response = await AppController.mail.deleteQueuedEmail(req.params.id);
    return res.json({ response });
  }

  public static updateScheduleEmailStatus(req, res){
    const response = AppController.mail.updateScheduleEmailStatus(req.body);
    return res.json({ response });
  }

}

import apiClient from "@sendgrid/client";
import sgMail from "@sendgrid/mail";
import { IEmailProvider } from "../Util/AppInterface";

export class SendGridProvider implements IEmailProvider {
  private sgMail;
  private apiClient;

  constructor(config: any) {
    this.sgMail = sgMail;
    this.apiClient = apiClient;

    sgMail.setApiKey(config.apiKey);
    apiClient.setApiKey(config.apiKey);
  }

  public async sendEmail(args: any, scheduleTime: any) {
    const [resp, batch] = await apiClient.request({
      method: "POST",
      url: "/v3/mail/batch"
    });

    let emailBody = {
      from: "ranidunadeesha@gmail.com",
      to: args.to,
      subject: args.subject,
      html: "<strong>" + args.content + "</strong>",
      sendAt: scheduleTime.now ? 0 : parseInt(scheduleTime.timestamp),
      batchId: batch.batch_id,
      customArgs: {
        batchId: batch.batch_id
      }
    };

    const [response] = await sgMail.send(emailBody);
    return {
      response: {
        status: response.statusCode,
        xMessageId: response.headers["x-message-id"]
      },
      body: emailBody
    };
  }

  public async deleteQueuedEmail(id: any) {
    return await apiClient
      .request({
        method: "POST",
        url: "/v3/user/scheduled_sends",
        body: {
          batch_id: id,
          status: "cancel"
        }
      })
      .catch(e => {
        return false;
      });
  }
}

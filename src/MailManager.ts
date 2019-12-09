import { IEmailProvider } from "./Util/AppInterface";
import redisClient from "./Util/Common";
import moment from "moment";

export class MailManager {
  private provider: any;
  private config: any;

  constructor(provider: IEmailProvider, config: any) {
    this.provider = provider;
    this.config = config;
  }

  public async sendEmail(args: any) {
    const scheduledTime = this.checkTimeInRange();
    let resp = await this.provider.sendEmail(args, scheduledTime);
    if (resp) {
      redisClient.hmset(resp.body.batchId, {
        to: resp.body.to,
        from: resp.body.from,
        xMessageId: resp.response.xMessageId,
        status: scheduledTime.now ? "SENT" : "QUEUED"
      });
    }

    return {
      id: resp.body.batchId,
      status: scheduledTime.now ? "SENT" : "QUEUED"
    };
  }

  public async getEmail(id: any) {
    return new Promise((resolve, reject) => {
      redisClient.hgetall(id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: id,
            status: result ? result.status : "NOT AVAILABLE"
          });
        }
      });
    });
  }

  public async deleteQueuedEmail(id: any) {
    let resp = await this.provider.deleteQueuedEmail(id);
    if (resp) {
      redisClient.del(id);
      return { id: id, deleted: "TRUE" };
    } else {
      return { id: id, deleted: "FALSE" };
    }
  }

  public updateScheduleEmailStatus(args: any) {
    args.map(value => {
      if (value.event == "delivered") {
        redisClient.hmset(value.batchId, {
          status: "SENT",
        });
      }
    })
  }

  public checkTimeInRange() {
    let schedule: any = {};
    let time = moment(moment().format());
    let startTime = moment(this.config.email.time.deliverStart, "HH:mm:ss");
    let endTime = moment(this.config.email.time.deliverEnds, "HH:mm:ss");

    if (time.isBetween(startTime, endTime)) {
      (schedule.now = true), (schedule.timestamp = null);
    } else {
      if (time.isBefore(startTime)) {
        (schedule.now = false), (schedule.timestamp = startTime.format("X"));
      } else {
        (schedule.now = false),
          (schedule.timestamp = startTime.add(1, "d").format("X"));
      }
    }
    return schedule;
  }
}

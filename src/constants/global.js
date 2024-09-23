import moment from "moment";

const createdAt = new Date(moment.now()).toISOString()



export const globalConstants = {
  userRole: ["admin", "user", "traveler"],
  createdAt,
};
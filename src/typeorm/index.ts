import { User } from "./user.entity";
import { Session } from "./session.entity";
import { Comment } from "./comment.entity";
import { Activity } from "./activity.entity";
import { Request } from "./request.entity";

const entities = [User, Session, Comment, Activity, Request];

export {User, Session, Comment, Activity, Request};
export default entities;

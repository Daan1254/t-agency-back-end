import { User } from "./user.entity";
import { Session } from "./session.entity";
import { Comment } from "./comment.entity";
import { Activity } from "./activity.entity";
import { Request } from "./request.entity";
import { Vote } from "./vote.entity";
import { Poll } from "./poll.entity";

const entities = [User, Session, Comment, Activity, Request, Vote, Poll];

export {User, Session, Comment, Activity, Request, Vote, Poll};
export default entities;

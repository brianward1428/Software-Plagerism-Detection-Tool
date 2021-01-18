import {SubmissionController} from "./controller/SubmissionController";

export const Routes = [{
    method: "get",
    route: "/submissions",
    controller: SubmissionController,
    action: "all"
}, {
    method: "get",
    route: "/submissions/:id",
    controller: SubmissionController,
    action: "one"
}, {
    method: "post",
    route: "/submissions",
    controller: SubmissionController,
    action: "save"
}, {
    method: "delete",
    route: "/submissions/:id",
    controller: SubmissionController,
    action: "remove"
}];
import _ from "lodash";

const sanitiseUser = (user: { [k: string]: any }) => _.omit(user, ["password"]);

export { sanitiseUser };
